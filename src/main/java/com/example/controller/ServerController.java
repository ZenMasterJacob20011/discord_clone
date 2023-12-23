package com.example.controller;

import com.example.dto.MessageDTO;
import com.example.dto.ServerDTO;
import com.example.entity.Message;
import com.example.entity.Server;
import com.example.entity.User;
import com.example.service.MapService;
import com.example.service.DatabaseService;
import com.example.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RequestMapping("/server")
@Controller
public class ServerController {

    @Autowired
    private DatabaseService databaseService;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private MapService mapService;
    @PostMapping("/createserver")
    public ResponseEntity<?> createServer(@RequestBody Server server) throws Exception {
        if (server.getServerName().length() <= 2) {
            return ResponseEntity.badRequest().body("Server name length must be greater than 2");
        } else if (server.getServerName() == null) {
            return ResponseEntity.badRequest().body("The server must have a name");
        }
        databaseService.createServer(server);
        ServerDTO serverDTO = mapService.getServerByID(server.getServerID());
        return ResponseEntity.ok(serverDTO);
    }
    @PostMapping("/addServerToUser")
    public ResponseEntity<?> addServerToUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @RequestBody Integer serverID){
        if(!databaseService.containsJWT(authorization)){
            return new ResponseEntity<>("Invalid credentials",HttpStatus.FORBIDDEN);
        }
        Map<String,Object> JWT = jwtService.decodeJWT(authorization);
        User user = databaseService.getUser((String)JWT.get("sub"));
        try {
            databaseService.addServerToUser(serverID, user.getUsername());
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.FOUND).body(e.getMessage());
        }
        return ResponseEntity.ok(user);
    }
    @PostMapping("/deleteserver")
    public ResponseEntity<String> deleteServer(@RequestBody Integer serverID){
        databaseService.deleteServer(serverID);
        return ResponseEntity.ok("server " + serverID + " deleted successfully");
    }

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/{channelID}/messages")
    @ResponseBody
    public List<MessageDTO> getMessages(@PathVariable(value = "channelID") Integer channelID) throws Exception {
        return mapService.findMessageByChannelID(channelID);
    }

    @GetMapping("/{serverID}/getServerInfo")
    @ResponseBody
    public ServerDTO getServerInfoByID(@PathVariable(value = "serverID") Integer serverID) throws Exception {
        return mapService.getServerByID(serverID);
    }

    @PostMapping(value = "/{channelID}/postmessages",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addMessageToDatabase(@RequestBody Message input, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @PathVariable(value = "channelID") Integer channelID) throws Exception {
        JWTService jwtService = new JWTService();
        if(databaseService.containsJWT(authorization)) {
            String username = (String) jwtService.decodeJWT(authorization).get("sub");
            input.setUsername(username);
            input.setPostTime(LocalDateTime.now());
            input.setChannel(databaseService.getChannelByChannelID(channelID));
            databaseService.addMessage(input);
            System.out.println(input.getMessageID());
            MessageDTO messageDTO = mapService.getMessageByMessageID(input.getMessageID());
            simpMessagingTemplate.convertAndSend("/topic/chat",messageDTO);
            return ResponseEntity.ok(messageDTO);
        }
        return new ResponseEntity<>("Invalid auth token", HttpStatus.FORBIDDEN);
    }

    @GetMapping("/{thepath:\\d+|@me}")
    public String app(){
        return "applicationpage";
    }

}

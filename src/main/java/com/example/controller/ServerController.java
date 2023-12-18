package com.example.controller;

import com.example.dto.MessageDTO;
import com.example.entity.Message;
import com.example.entity.User;
import com.example.entity.Server;
import com.example.service.MapService;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
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
    private DatabaseUtil databaseUtil;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private MapService mapService;
    @PostMapping("/createserver")
    public ResponseEntity<?> createServer(@RequestBody Server server){
        if (server.getServerName().length() <= 2) {
            return ResponseEntity.badRequest().body("Server name length must be greater than 2");
        }

        databaseUtil.saveServer(server);
        return ResponseEntity.ok(server);
    }
    @PostMapping("/addServerToUser")
    public ResponseEntity<?> addServerToUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @RequestBody Integer serverID){
        if(!databaseUtil.containsJWT(authorization)){
            return new ResponseEntity<>("Invalid credentials",HttpStatus.FORBIDDEN);
        }
        Map<String,Object> JWT = jwtService.decodeJWT(authorization);
        User user = databaseUtil.getUser((String)JWT.get("sub"));
        databaseUtil.addServerToUser(serverID, user.getUsername());
        return ResponseEntity.ok(user);
    }
    @PostMapping("/deleteserver")
    public ResponseEntity<String> deleteServer(@RequestBody Integer serverID){
        databaseUtil.deleteServer(serverID);
        return ResponseEntity.ok("server " + serverID + " deleted successfully");
    }

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/{serverID}/messages")
    @ResponseBody
    public List<MessageDTO> getMessages(@PathVariable(value = "serverID") Integer serverID){
        return mapService.getMessageByServerID(serverID);
    }


    @PostMapping(value = "/{serverID}/postmessages",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addMessageToDatabase(@RequestBody Message input, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @PathVariable(value = "serverID") Integer serverID) throws InterruptedException {
        JWTService jwtService = new JWTService();
        if(databaseUtil.containsJWT(authorization)) {
            String username = (String) jwtService.decodeJWT(authorization).get("sub");
            input.setUsername(username);
            input.setPostTime(LocalDateTime.now());
            input.setServer(databaseUtil.getServer(serverID).get());
            databaseUtil.addMessage(input);
            System.out.println(input.getId());
            MessageDTO messageDTO = mapService.getMessageByMessageID(input.getId());
            simpMessagingTemplate.convertAndSend("/topic/chat",messageDTO);
            return ResponseEntity.ok(messageDTO);
        }
        return new ResponseEntity<>("Invalid auth token", HttpStatus.FORBIDDEN);
    }


    @SendTo("/topic/chat")
    public Message messageHandler(Message message) throws InterruptedException {
        Thread.sleep(1000);
        return message;
    }

    @GetMapping("/{thepath:\\d+|@me}")
    public String app(){
        return "applicationpage";
    }
}

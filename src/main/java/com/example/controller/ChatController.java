package com.example.controller;



import com.example.entity.Message;

import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private DatabaseUtil databaseUtil;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/getmessages")
    @ResponseBody
    public List<Message> sendMessages(){
        return databaseUtil.getMessages();
    }


    @PostMapping(value = "/postmessages/{serverID}",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addMessageToDatabase(@RequestBody Message input, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @PathVariable(value = "serverID") Integer serverID) throws InterruptedException {
        JWTService jwtService = new JWTService();
        if(databaseUtil.containsJWT(authorization)) {
            String username = (String) jwtService.decodeJWT(authorization).get("sub");
            input.setUsername(username);
            input.setServer(databaseUtil.getServer(serverID).get());
            databaseUtil.addMessageToServer(input,serverID);
            simpMessagingTemplate.convertAndSend("/topic/chat",input);
            return ResponseEntity.ok(input);
        }
        return new ResponseEntity<>("Invalid auth token", HttpStatus.FORBIDDEN);
    }


    @SendTo("/topic/chat")
    public Message messageHandler(Message message) throws InterruptedException {
        Thread.sleep(1000);
        return message;
    }


}

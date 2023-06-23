package com.example.controller;



import com.example.json.MessageJSON;

import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class ChatController {

    @Autowired
    private DatabaseUtil databaseUtil;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/getmessages")
    @ResponseBody
    public List<MessageJSON> sendMessages(){
        return databaseUtil.getMessages();
    }


    @PostMapping(value = "/postmessages",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addMessageToDatabase(@RequestBody MessageJSON input, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) throws InterruptedException {
        JWTService jwtService = new JWTService();
        if(databaseUtil.containsJWT(authorization)) {
            String username = (String) jwtService.decodeJWT(authorization).get("sub");
            input.setUsername(username);
            databaseUtil.saveMessage(input);
            simpMessagingTemplate.convertAndSend("/topic/chat",input);
            return ResponseEntity.ok(input);
        }
        return new ResponseEntity<>("Invalid auth token", HttpStatus.FORBIDDEN);
    }


    @SendTo("/topic/chat")
    public MessageJSON messageHandler(MessageJSON messageJSON) throws InterruptedException {
        System.out.println(messageJSON);
        Thread.sleep(1000);
        return messageJSON;
    }


}

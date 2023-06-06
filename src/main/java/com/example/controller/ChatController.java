package com.example.controller;



import com.example.json.MessageJSON;

import com.example.util.DatabaseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ChatController {

    @Autowired
    private DatabaseUtil databaseUtil;

    @GetMapping("/chat")
    public String goToChat(Model model){
        MessageJSON mj = new MessageJSON();
        model.addAttribute("mymessage",mj);
        return "chat";
    }


    @GetMapping("/getmessages")
    @ResponseBody
    public List<String> sendMessages(){
        return databaseUtil.getMessages();
    }


    @PostMapping(value = "/postmessages",consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addMessageToDatabase(@RequestBody MessageJSON input){
        databaseUtil.saveMessage(input);
        return ResponseEntity.ok(input);
    }

}

package com.example.util;

import com.example.json.MessageJSON;
import com.example.json.PersonIdentifier;
import com.example.repositories.MessageRepository;
import com.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseUtil {


    @Autowired
    public MessageRepository messageRepository;
    @Autowired
    public UserRepository userRepository;

    public boolean isValidUser(String userName, String password){
        for (PersonIdentifier userRepPI : userRepository.findAll()) {
            if (userRepPI.getUsername().equals(userName) && userRepPI.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }
    public boolean isValidUser(PersonIdentifier personIdentifier){
        return isValidUser(personIdentifier.getUsername(), personIdentifier.getPassword());
    }

    public void saveUserToRepository(PersonIdentifier personIdentifier){
        userRepository.save(personIdentifier);
    }

    public List<MessageJSON> getMessages(){
        List<MessageJSON> messages = new ArrayList<>();
        for(MessageJSON message:messageRepository.findAll()){
            messages.add(message);
        }
        return messages;
    }

    public void saveMessage(MessageJSON messageJSON){
        messageRepository.save(messageJSON);
    }
}

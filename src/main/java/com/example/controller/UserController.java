package com.example.controller;

import com.example.json.JWTJSON;
import com.example.json.PersonIdentifier;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Controller
public class UserController {

    @Autowired
    private DatabaseUtil databaseUtil;

    @ResponseBody
    @PostMapping("/verify")
    public ResponseEntity<?> logInUsrPass(@RequestBody PersonIdentifier personIdentifier) {
        HashMap<String,String> map = new HashMap<>();
        if(databaseUtil.isValidUser(personIdentifier)) {
            JWTService jwtService = new JWTService();
            String JWT = jwtService.createJWT(personIdentifier);
            databaseUtil.saveJWT(new JWTJSON(JWT));
            map.put("token",JWT);
            return new ResponseEntity<>(map,HttpStatus.OK);
        }
        map.put("Error","Username or Password is incorrect");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/save")
    public String saveUsrPass(@ModelAttribute("PersonIdentifier") PersonIdentifier personIdentifier) {
        databaseUtil.saveUserToRepository(personIdentifier);
        return "redirect:/";
    }
}

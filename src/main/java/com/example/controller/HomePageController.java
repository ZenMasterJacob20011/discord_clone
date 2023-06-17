package com.example.controller;

import com.example.json.PersonIdentifier;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class HomePageController {
    @Autowired
    private DatabaseUtil databaseUtil;
    @Autowired
    private JWTService jwtService;

    @GetMapping("/")
    public String homePage() {
        return "index";
    }

    @GetMapping("/signup")
    public String signUpPage(Model model) {
        PersonIdentifier pi = new PersonIdentifier();
        model.addAttribute("personIdentifier", pi);
        return "signuppage";
    }

    @GetMapping("/login")
    public String logInPage() {
        return "loginpage";
    }

    @GetMapping("/chat")
    public String goToChat(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken){
        System.out.println(authorizationToken);
        if(jwtService.isValidJWT(authorizationToken)) {
            return "chat";
        }
        return "redirect:/login";
    }
}

package com.example.controller;

import com.example.json.PersonIdentifier;
import com.example.util.DatabaseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @Autowired
    private DatabaseUtil databaseUtil;

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
    public String logInPage(Model model) {
        PersonIdentifier pi = new PersonIdentifier();
        model.addAttribute("personIdentifier", pi);
        return "loginpage";
    }

    @PostMapping("/verify")
    public String logInUsrPass(@ModelAttribute("PersonIdentifier") PersonIdentifier personIdentifier) {
        if(databaseUtil.isValidUser(personIdentifier)) {
            return "yourin";
        }

        return "redirect:/login";
    }

    @PostMapping("/save")
    public String saveUsrPass(@ModelAttribute("PersonIdentifier") PersonIdentifier personIdentifier) {
        databaseUtil.saveUserToRepository(personIdentifier);
        return "redirect:/";
    }
}

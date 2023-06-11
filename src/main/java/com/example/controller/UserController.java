package com.example.controller;

import com.example.json.PersonIdentifier;
import com.example.util.DatabaseUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public String logInUsrPass(@ModelAttribute("PersonIdentifier") PersonIdentifier personIdentifier, HttpServletRequest request, HttpServletResponse response) {
        if(databaseUtil.isValidUser(personIdentifier)) {
            Cookie jwtTokenCookie = new Cookie("username",personIdentifier.getUsername());
            jwtTokenCookie.setDomain("localhost");
            request.getSession().setAttribute("currentuser",personIdentifier.getUsername());
            response.addCookie(jwtTokenCookie);
            return "redirect:/";
        }

        return "redirect:/login";
    }

    @PostMapping("/save")
    public String saveUsrPass(@ModelAttribute("PersonIdentifier") PersonIdentifier personIdentifier) {
        databaseUtil.saveUserToRepository(personIdentifier);
        return "redirect:/";
    }
}

package com.example.controller;

import com.example.entity.User;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

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




}

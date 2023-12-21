package com.example.controller;

import com.example.entity.Server;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("/invite")
public class InviteController {

    @Autowired
    private DatabaseUtil databaseUtil;
    @GetMapping("/getInviteLink/{serverID}")
    public ResponseEntity<?> createInviteLink(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt, @PathVariable(value = "serverID") Integer serverID){
        //have some function that generates an ID based on the serverID input...
        //server should have a generated invite link stored in the server entity
        /*when user navigates to invite link the browser will perform a request and the request will add server to user based on
        jwt token*/
        if(databaseUtil.getServer(serverID).isPresent()) {
            Server server = databaseUtil.getServer(serverID).get();
            JWTService jwtService = new JWTService();
            server.generateInvite(jwtService.getUsernameFromJWT(jwt));
            databaseUtil.saveServer(server);
            return new ResponseEntity<>(server, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{inviteCode}")
    public String acceptInvitePage(Model model, @PathVariable(value = "inviteCode") String inviteCode){
        if(databaseUtil.getServerByInviteCode(inviteCode).isPresent()) {
            Server server = databaseUtil.getServerByInviteCode(inviteCode).get();
            String inviter = server.getInvite().getInviter();
            model.addAttribute("username", inviter);
            model.addAttribute("servername", server.getServerName());
            model.addAttribute("serverid", server.getId().toString());
            return "invite";
        }
        return "redirect:/login";
    }
}

package com.example.controller;

import com.example.entity.User;
import com.example.entity.Server;
import com.example.service.MapService;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class ServerController {

    @Autowired
    private DatabaseUtil databaseUtil;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private MapService mapService;
    @PostMapping("/api/v1/createserver")
    public ResponseEntity<?> createServer(@RequestBody Server server){
        if (server.getServerName().length() <= 2) {
            return ResponseEntity.badRequest().body("Server name length must be greater than 2");
        }

        databaseUtil.saveServer(server);
        return ResponseEntity.ok(server);
    }
    @PostMapping("/api/v1/addServerToUser")
    public ResponseEntity<?> addServerToUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @RequestBody Integer serverID){
        if(!databaseUtil.containsJWT(authorization)){
            return new ResponseEntity<>("Invalid credentials",HttpStatus.FORBIDDEN);
        }
        Map<String,Object> JWT = jwtService.decodeJWT(authorization);
        User user = databaseUtil.getUser((String)JWT.get("sub"));
        databaseUtil.addServerToPersonIdentifier(serverID, user.getUsername());
        return ResponseEntity.ok(user);
    }
    @PostMapping("/api/v1/deleteserver")
    public ResponseEntity<String> deleteServer(@RequestBody Integer serverID){
        databaseUtil.deleteServer(serverID);
        return ResponseEntity.ok("server " + serverID + " deleted successfully");
    }
    @GetMapping("/api/v1/server/{serverID}")
    public ResponseEntity<?> getServerInfo(@PathVariable(value = "serverID") String serverID){
        int ID;
        try{
            ID = Integer.parseInt(serverID);
        }catch (NumberFormatException e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
        if(databaseUtil.getServer(ID).isPresent()){
            return ResponseEntity.ok(mapService.getServerByID(ID));
        }else{
            return new ResponseEntity<>("A server with that ID does not exist",HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/api/v1/server/{serverID}/invites")
    public ResponseEntity<?> createInviteLink(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt, @PathVariable(value = "serverID") Integer serverID){
        //have some function that generates an ID based on the serverID input...
        //server should have a generated invite link stored in the server entity
        /*when user navigates to invite link the browser will perform a request and the request will add server to user based on
        jwt token*/
        if(databaseUtil.getServer(serverID).isPresent()) {
            Server server = databaseUtil.getServer(serverID).get();
            server.generateInvite(jwtService.getUsernameFromJWT(jwt));
            databaseUtil.saveServer(server);
            return new ResponseEntity<>(server, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/invite/{inviteCode}")
    public String acceptInvitePage(Model model, @PathVariable(value = "inviteCode") String inviteCode){
        Server server = databaseUtil.getServerByInviteCode(inviteCode).get();
        String inviter = server.getInvite().getInviter();
        model.addAttribute("username",inviter);
        model.addAttribute("servername",server.getServerName());
        return "invite";
    }


}

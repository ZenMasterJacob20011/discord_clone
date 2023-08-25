package com.example.controller;

import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.service.MapService;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Controller
public class UserController {

    @Autowired
    private DatabaseUtil databaseUtil;

    @Autowired
    private MapService mapService;

    @ResponseBody
    @PostMapping("/verify")
    public ResponseEntity<?> logInUsrPass(@RequestBody User user) {
        HashMap<String,String> map = new HashMap<>();
        if(databaseUtil.isValidUser(user)) {
            JWTService jwtService = new JWTService();
            String JWT = jwtService.createJWT(user);
            databaseUtil.addJWTForPersonIdentifier(user,JWT);
            map.put("token",JWT);
            return new ResponseEntity<>(map,HttpStatus.OK);
        }
        map.put("Error","Username or Password is incorrect");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/save")
    public String saveUsrPass(@ModelAttribute("User") User user) {
        databaseUtil.saveUser(user);
        return "redirect:/";
    }

    @GetMapping("/api/v1/getUserInfo")
    public ResponseEntity<?> getUserInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization){
        if(databaseUtil.isValidJWT(authorization)){
//            PersonIdentifier personIdentifier = databaseUtil.getUserByJWT(authorization);
            UserDTO userDTO = mapService.getPersonIdentifierByJwt(authorization);
            return ResponseEntity.ok(userDTO);
        }
        return new ResponseEntity<>("Invalid auth token",HttpStatus.FORBIDDEN);
    }
    @PutMapping("/api/v1/sendFriendRequest")
    public ResponseEntity<?> sendFriendRequestToUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @RequestBody String username){
        if(databaseUtil.doesUserExist(username)){
            User userReceivingRequest = databaseUtil.getUser(username);
            User userSendingRequest = databaseUtil.getUserByJWT(authorization);
            if(userReceivingRequest.getPendingFriends().contains(userSendingRequest)){
                return new ResponseEntity<>("Friend Request already sent",HttpStatus.ALREADY_REPORTED);
            }else if(userSendingRequest.getAcceptedFriends().contains(userReceivingRequest) || userReceivingRequest.getAcceptedFriends().contains(userSendingRequest)){
                return new ResponseEntity<>("This person is already your friend",HttpStatus.ALREADY_REPORTED);
            }
            userReceivingRequest.addPendingFriend(userSendingRequest);
            databaseUtil.saveUser(userReceivingRequest);
            System.out.println(username);
            System.out.println(userSendingRequest.getUsername() + " just sent a friend request to " + userReceivingRequest.getUsername());
            return new ResponseEntity<>("Friend Request sent successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("An error has occured or user does not exist",HttpStatus.NOT_FOUND);
    }

    @PostMapping("/api/v1/acceptFriendRequest")
    public ResponseEntity<?> acceptFriendRequestFromUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @RequestBody String username){
        if(databaseUtil.isValidJWT(authorization)){
            User userAcceptingRequest = databaseUtil.getUserByJWT(authorization);
            User userBeingAddedAsAFriend = databaseUtil.getUser(username);
            if(userAcceptingRequest.getPendingFriends().contains(userBeingAddedAsAFriend)) {
                userBeingAddedAsAFriend.addAcceptedFriend(userAcceptingRequest);
                userAcceptingRequest.addAcceptedFriend(userBeingAddedAsAFriend);
                userAcceptingRequest.removePendingFriend(userBeingAddedAsAFriend);
                System.out.println(userAcceptingRequest.getPendingFriends());
                databaseUtil.saveUser(userAcceptingRequest);
                databaseUtil.saveUser(userBeingAddedAsAFriend);
                return new ResponseEntity<>("Friend Request Accepted", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("This user no longer exists in pending friend requests",HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>("An error has occurred",HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/api/v1/declineFriendRequest")
    public ResponseEntity<?> declineFriendRequestFromUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @RequestBody String username){
        if(databaseUtil.isValidJWT(authorization)){
            User userDecliningRequest = databaseUtil.getUserByJWT(authorization);
            User userBeingDeclinedAsAFriend = databaseUtil.getUser(username);
            if(userDecliningRequest.getPendingFriends().contains(userBeingDeclinedAsAFriend)) {
                userDecliningRequest.removePendingFriend(userBeingDeclinedAsAFriend);
                System.out.println(userDecliningRequest.getPendingFriends());
                databaseUtil.saveUser(userDecliningRequest);
                return new ResponseEntity<>("Friend Request Declined", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("This user no longer exists in pending friend request",HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>("An error has occurred",HttpStatus.BAD_REQUEST);
    }


}

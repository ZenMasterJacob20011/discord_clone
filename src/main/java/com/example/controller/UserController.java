package com.example.controller;

import com.example.dto.UserDTO;
import com.example.entity.User;
import com.example.service.MapService;
import com.example.util.DatabaseUtil;
import com.example.util.JWTService;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import java.util.HashMap;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private DatabaseUtil databaseUtil;

    @Autowired
    private MapService mapService;


    @GetMapping("/getUserInfo")
    public ResponseEntity<?> getUserInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization){
        if(databaseUtil.isValidJWT(authorization)){
//            PersonIdentifier personIdentifier = databaseUtil.getUserByJWT(authorization);
            UserDTO userDTO = mapService.getPersonIdentifierByJwt(authorization);
            return ResponseEntity.ok(userDTO);
        }
        return new ResponseEntity<>("Invalid auth token",HttpStatus.FORBIDDEN);
    }
    @PutMapping(value = "/sendFriendRequest", produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public String sendFriendRequestToUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization, @RequestBody String username){
        if(databaseUtil.doesUserExist(username)){
            User userReceivingRequest = databaseUtil.getUser(username);
            User userSendingRequest = databaseUtil.getUserByJWT(authorization);
            if(userReceivingRequest.getPendingFriends().contains(userSendingRequest)){
                return "<div class=\"text-danger\">Friend Request already sent</div>";
            }else if(userSendingRequest.getAcceptedFriends().contains(userReceivingRequest) || userReceivingRequest.getAcceptedFriends().contains(userSendingRequest)){
                return "<div class=\"text-danger\">This user is already your friend</div>";
            }
            userReceivingRequest.addPendingFriend(userSendingRequest);
            databaseUtil.saveUser(userReceivingRequest);
            System.out.println(username);
            System.out.println(userSendingRequest.getUsername() + " just sent a friend request to " + userReceivingRequest.getUsername());
            return "<div class=\"text-success\">Friend Request sent successfully</div>";
        }
        return "<div class=\"text-danger\">An error has occurred or user does not exist</div>";
    }

    @PostMapping("/acceptFriendRequest")
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
    @PostMapping("/declineFriendRequest")
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

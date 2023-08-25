package com.example.dto;

import com.example.entity.User;
import com.example.entity.Server;

import java.util.List;

public class UserDTO {
    private Integer id;
    private String username;

    private List<Server> serverList;

    private List<User> acceptedFriends;

    private List<User> pendingFriends;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Server> getServerList() {
        return serverList;
    }

    public void setServerList(List<Server> serverList) {
        this.serverList = serverList;
    }

    public List<User> getAcceptedFriends() {
        return acceptedFriends;
    }

    public void setAcceptedFriends(List<User> acceptedFriends) {
        this.acceptedFriends = acceptedFriends;
    }

    public List<User> getPendingFriends() {
        return pendingFriends;
    }

    public void setPendingFriends(List<User> pendingFriends) {
        this.pendingFriends = pendingFriends;
    }
}

package com.example.entity;


import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity

public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String username;

    private String password;

    private String JWT;

    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<Server> serverList;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> acceptedFriends;

    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<User> pendingFriends;

    public User() {
        serverList = new ArrayList<>();
        acceptedFriends = new ArrayList<>();
        pendingFriends = new ArrayList<>();
    }

    public User(Integer id, String username, String password) {
        this();
        this.id = id;
        this.username = username;
        this.password = password;
    }

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

    //add ignore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    //add ignore
    public String getJWT() {
        return JWT;
    }

    public void setJWT(String JWT) {
        this.JWT = JWT;
    }

    @JsonIgnore
    public List<Server> getServerList() {
        return serverList;
    }

    public void setServerList(List<Server> serverList) {
        this.serverList = serverList;
    }

    @JsonIgnore
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

    public void addServer(Server server) {
        serverList.add(server);
    }

    public void addAcceptedFriend(User user) {
        acceptedFriends.add(user);
    }

    public void addPendingFriend(User user) {
        pendingFriends.add(user);
    }

    public void removePendingFriend(User user) {
        pendingFriends.remove(user);
    }
}

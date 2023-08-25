package com.example.entity;

import com.example.dto.InviteDTO;
import com.example.dto.ServerDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.UUID;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Server {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String serverName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "server")
    private List<Message> messages;

    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "serverList")
    private List<User> users;

    @OneToOne(cascade = CascadeType.ALL)
    private Invite invite;

    public Server() {
        messages = new ArrayList<>();
        users = new ArrayList<>();
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> message) {
        this.messages = message;
    }

    @JsonIgnore
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public Invite getInvite() {
        return invite;
    }

    public void setInvite(Invite invite) {
        this.invite = invite;
    }

    public void generateInvite(String inviter) {
        setInvite(new Invite(inviter));
    }
}

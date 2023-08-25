package com.example.entity;

import jakarta.persistence.*;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String message;

    private String username;

    @ManyToOne
    private Server server;

    public Message() {

    }

    public Message(String message, String username) {
        this.message = message;
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Server getServer() {
        return server;
    }

    public void setServer(Server server) {
        this.server = server;
    }

    @Override
    public String toString() {
        return "MessageJSON{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}

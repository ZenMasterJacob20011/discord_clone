package com.example.dto;


import java.time.LocalDateTime;

public class MessageDTO {


    private Integer id;

    private String message;

    private String username;

    private Integer serverID;

    private LocalDateTime postTime;
    public MessageDTO() {

    }

    public MessageDTO(String message, String username) {
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


    public Integer getServerID() {
        return serverID;
    }

    public void setServerID(Integer serverID) {
        this.serverID = serverID;
    }

    public LocalDateTime getPostTime() {
        return postTime;
    }

    public void setPostTime(LocalDateTime postTime) {
        this.postTime = postTime;
    }

    @Override
    public String toString() {
        return "MessageDTO{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", username='" + username + '\'' +
                ", serverID=" + serverID +
                ", postTime=" + postTime +
                '}';
    }
}

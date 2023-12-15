package com.example.dto;



public class MessageDTO {


    private Integer id;

    private String message;

    private String username;


    private Integer serverID;

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

    @Override
    public String toString() {
        return "MessageDTOJSON{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}

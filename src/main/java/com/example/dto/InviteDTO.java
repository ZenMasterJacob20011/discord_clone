package com.example.dto;

public class InviteDTO {
    private String inviteCode;

    private String inviter;

    public InviteDTO(String inviteCode, String inviter) {
        this.inviteCode = inviteCode;
        this.inviter = inviter;
    }
}

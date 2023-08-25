package com.example.entity;

import com.example.dto.InviteDTO;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Invite {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String inviteCode;

    private String inviter;

    @OneToOne(mappedBy = "invite")
    private Server server;

    public Invite(){

    }

    public Invite(String inviter) {
        this.inviteCode = generateInviteCode();
        this.inviter = inviter;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public String getInviter() {
        return inviter;
    }

    public void setInviter(String inviter) {
        this.inviter = inviter;
    }

    public static String generateInviteCode() {
        return UUID.randomUUID().toString().replaceAll("_", "").replaceAll("-","").substring(0, 9);
    }
}

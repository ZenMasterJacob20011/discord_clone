package com.example.json;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class JWTJSON {

    @Id
    @GeneratedValue
    private Long id;

    private String JWT;

    public JWTJSON(String JWT) {
        this.JWT = JWT;
    }

    public JWTJSON() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getJWT() {
        return JWT;
    }

    public void setJWT(String JWT) {
        this.JWT = JWT;
    }
}

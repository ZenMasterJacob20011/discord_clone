package com.example.util;

import com.example.json.PersonIdentifier;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Component
public class JWTService {

    @Autowired
    private DatabaseUtil databaseUtil;

    @Value("${jwt.secret}")
    private String secret = "password";
    String id = UUID.randomUUID().toString().replace("-","");

    public String createJWT(PersonIdentifier personIdentifier){
        Date currentDate = new Date();
        return Jwts.builder()
                .setId(id)
                .setHeaderParam("typ","JWT")
                .claim("scope","user")
                .setSubject(personIdentifier.getUsername())
                .setIssuedAt(currentDate)
                .setExpiration(new Date(currentDate.getTime() + 60 * 10 * 1000))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public Map<String,Object> decodeJWT(String JWT){
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String[] chunks = JWT.split("\\.");
        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));
        GsonJsonParser gsonJsonParser = new GsonJsonParser();
        System.out.println(gsonJsonParser.parseMap(payload));
        return gsonJsonParser.parseMap(payload);
    }
    public boolean isValidJWT(String JWT){
        return databaseUtil.containsJWT(JWT);
    }

}

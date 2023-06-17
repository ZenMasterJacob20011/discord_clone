package com.example.repositories;

import com.example.json.JWTJSON;
import org.springframework.data.repository.CrudRepository;

public interface JWTRepository extends CrudRepository<JWTJSON,Integer> {

}

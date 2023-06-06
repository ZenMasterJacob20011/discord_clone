package com.example.repositories;

import com.example.json.MessageJSON;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<MessageJSON,Integer> {

}

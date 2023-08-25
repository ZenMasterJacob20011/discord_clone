package com.example.repository;

import com.example.entity.Message;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends ListCrudRepository<Message,Integer> {

}

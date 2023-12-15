package com.example.repository;

import com.example.entity.Message;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends ListCrudRepository<Message,Integer> {
    List<Message> getMessagesByServer_Id(Integer server_id);
}

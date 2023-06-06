package com.example.repositories;

import com.example.json.PersonIdentifier;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<PersonIdentifier,Integer> {

}

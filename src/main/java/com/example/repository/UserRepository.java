package com.example.repository;

import com.example.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    User findPersonIdentifierByUsername(String username);

    Optional<User> findPersonIdentifierByJWT(String JWT);
    boolean existsByUsernameAndPassword(String username, String password);
    boolean existsByUsername(String username);
    boolean existsByJWT(String JWT);
}

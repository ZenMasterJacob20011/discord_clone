package com.example.repository;

import com.example.entity.Channel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends CrudRepository<Channel, Integer> {
    @Query(value = "SELECT c FROM Server s JOIN Channel c on s.serverID = c.server.serverID JOIN User u where u.JWT = :JWT")
    Optional<List<Channel>> findChannelsByJWT(@Param("JWT") String JWT);

    @Query(value = """
                select c
                from Server s JOIN Channel c on s.serverID = c.server.serverID JOIN User u1 JOIN User u2
                where s.serverName='@me' and u1.username=:userOne and u2.username=:userTwo
            """)
    Optional<Channel> findDirectMessageChannelByUsers(@Param("userOne") String userOne, @Param("userTwo") String userTwo);
}

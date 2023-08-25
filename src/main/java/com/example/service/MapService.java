package com.example.service;

import com.example.dto.ServerDTO;
import com.example.dto.UserDTO;
import com.example.entity.Server;
import com.example.entity.User;
import com.example.repository.ServerRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MapService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServerRepository serverRepository;

    public List<UserDTO> getAllPersonIdentifierInfo(){
        return ((List<User>) userRepository
                .findAll())
                .stream()
                .map(this::convertPersonIdentifierToDTO)
                .collect(Collectors.toList());
    }
    public UserDTO getPersonIdentifierByJwt(String JWT){
        return convertPersonIdentifierToDTO(userRepository.findPersonIdentifierByJWT(JWT));
    }
    public ServerDTO getServerByID(Integer id){
        return convertServerToDTO(serverRepository.findById(id).get());
    }

    private UserDTO convertPersonIdentifierToDTO(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setServerList(user.getServerList());
        userDTO.setAcceptedFriends(user.getAcceptedFriends());
        userDTO.setPendingFriends(user.getPendingFriends());
        return userDTO;
    }

    private ServerDTO convertServerToDTO(Server server){
        ServerDTO serverDTO = new ServerDTO();
        serverDTO.setId(server.getId());
        serverDTO.setServerName(server.getServerName());
        serverDTO.setUsers(server.getUsers());
        serverDTO.setMessage(server.getMessages());
        return serverDTO;
    }
}

package com.example.service;

import com.example.dto.MessageDTO;
import com.example.dto.ServerDTO;
import com.example.dto.UserDTO;
import com.example.entity.Message;
import com.example.entity.Server;
import com.example.entity.User;
import com.example.repository.MessageRepository;
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

    @Autowired
    private MessageRepository messageRepository;

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

    public List<MessageDTO> getMessageByServerID(Integer serverID){
        return messageRepository.getMessagesByServer_Id(serverID).stream().map(this::convertMessageToDTO).collect(Collectors.toList());
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

    public MessageDTO convertMessageToDTO(Message message){
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setMessage(message.getMessage());
        messageDTO.setServerID(message.getServer().getId());
        messageDTO.setUsername(message.getUsername());
        messageDTO.setId(message.getId());
        return messageDTO;
    }
}

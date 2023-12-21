package com.example.util;

import com.example.entity.Message;
import com.example.entity.User;
import com.example.entity.Server;
import com.example.repository.MessageRepository;
import com.example.repository.ServerRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DatabaseUtil {


    @Autowired
    public MessageRepository messageRepository;
    @Autowired
    public UserRepository userRepository;
    @Autowired
    public ServerRepository serverRepository;
    public boolean isValidUser(String userName, String password) {
        if (userRepository.existsByUsernameAndPassword(userName, password)) {
            return true;
        }
        return false;
    }

    public boolean isValidUser(User user) {
        return isValidUser(user.getUsername(), user.getPassword());
    }
    public boolean doesUserExist(String username){
        return userRepository.existsByUsername(username);
    }


    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User getUser(Integer ID){
        return userRepository.findById(ID).get();
    }
    public User getUser(String userName){
        return userRepository.findPersonIdentifierByUsername(userName);
    }

    public User getUserByJWT(String JWT){
        return userRepository.findPersonIdentifierByJWT(JWT);
    }
    public void addJWTForUser(User user, String JWT){
        User oldPI = userRepository.findPersonIdentifierByUsername(user.getUsername());
        oldPI.setJWT(JWT);
        userRepository.save(oldPI);
    }

    public List<Message> getMessagesByServerID(int serverID) {
        return messageRepository.getMessagesByServer_Id(serverID);
    }

    public boolean containsJWT(String JWT) {
        if (userRepository.existsByJWT(JWT)) {
            return true;
        }
        return false;
    }
    public boolean isValidJWT(String JWT){
        if(containsJWT(JWT)){
            return true;
        }
        return false;
    }

    public void saveServer(Server server){
        serverRepository.save(server);
    }
    public void deleteServer(Integer serverID){
        serverRepository.deleteById(serverID);
    }
    public void deleteServer(Server server){
        deleteServer(server.getId());
    }
    public Optional<Server> getServer(Integer serverID){
        return serverRepository.findById(serverID);
    }
    public Optional<Server> getServerByInviteCode(String inviteCode){
        return serverRepository.findServersByInvite_InviteCode(inviteCode);
    }
    public void addServerToUser(Integer serverID, String userName) throws Exception {
        Server server = getServer(serverID).get();
        User user = getUser(userName);
        if (user.getServerList().contains(server)){
            throw new Exception(userName + " is already a member of " + server.getServerName());
        }
        user.addServer(server);
        userRepository.save(user);
    }
    public void addMessage(Message message){
        messageRepository.save(message);
    }

}

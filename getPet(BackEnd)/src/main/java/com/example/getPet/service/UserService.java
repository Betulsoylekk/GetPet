package com.example.getPet.service;

import com.example.getPet.entity.User;
import com.example.getPet.exceptions.UsedUsernameException;
import com.example.getPet.repository.CommentRepo;
import com.example.getPet.repository.PostRepo;
import com.example.getPet.repository.UserRepo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Service
public class UserService {
    private UserRepo userRepo;
    private CommentRepo commentRepo;
    private PostRepo postRepo;

    @Autowired
    public UserService(UserRepo userRepo, CommentRepo commentRepo, PostRepo postRepo) {
        this.userRepo = userRepo;
        this.commentRepo = commentRepo;
        this.postRepo = postRepo;
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public User updateOneUserById(Long userId, User newUser) {
        Optional<User> user = userRepo.findById(userId);
        if(user.isPresent()) {
            User foundUser = user.get();
            foundUser.setUserName(newUser.getUserName());
            foundUser.setPassword(newUser.getPassword());
            userRepo.save(foundUser);
            return foundUser;
        }else
            return null;
    }

    public void deleteUserById(Long userId) {
        try {
            userRepo.deleteById(userId);
        }catch(Exception e) {
            System.out.println("The user which has id :  ."+userId+" doesn't exist");
        }
    }

    public User getUserByUserName(String userName) {
        return userRepo.findByUserName(userName);
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }


    @Transactional
    public void userRegisteration(User newUser) throws UsedUsernameException {
        Iterator<User> getAllUsers = getAllUsers().iterator();
        List<String> usernames = new ArrayList<>();
        while (getAllUsers.hasNext()){
            usernames.add(getAllUsers.next().getUserName());
        }
        if (usernames.contains(newUser.getUserName())){
            throw new UsedUsernameException("Username already in use!!");
        }else{
            userRepo.save(newUser);
        }
    }

    public void save(User user){
        userRepo.save(user);
    }


}

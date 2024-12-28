package com.example.getPet.controller;

import com.example.getPet.response.LoginResponse;
import com.example.getPet.entity.User;
import com.example.getPet.exceptions.UsedUsernameException;
import com.example.getPet.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @GetMapping("/allUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

}


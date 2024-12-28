package com.example.getPet.controller;

import com.example.getPet.entity.User;
import com.example.getPet.exceptions.UsedUsernameException;
import com.example.getPet.response.LoginResponse;
import com.example.getPet.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Getter
@Setter
@RestController
public class SystemAccessController {
    private UserService userService;


    @PostMapping("/signup")
    // User signup URL.
    public ResponseEntity<String> registerCustomer(@RequestBody User user) throws UsedUsernameException {
        try {
            userService.userRegisteration(user);
            // response object returns http 2**
            return new ResponseEntity<>("Successful Registration!", HttpStatus.OK);
        }
        // If not understandable error is thrown which is probably server error.
        catch (Exception err) {
            return new ResponseEntity<>("Not unique data! mail or sth in SYSTEM!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/login/{userName}/{password}")
    // Basically generic type login function.
    public ResponseEntity<LoginResponse> login(@PathVariable String userName, @PathVariable String password) {
        String controller = "";
        // user type for front-end
        User user = userService.getUserByUserName(userName);

        if (user != null && user.getPassword().equals(password)){
            controller = "Logged-in";
        }
        try {
            if((controller.equals("Logged-in"))){
                // Http status 2**
                return new ResponseEntity<>(new LoginResponse(200, user, controller), HttpStatus.OK);
            }
            else {
                // Http status 4**
                return new ResponseEntity<>(new LoginResponse(400, "Invalid Request"), HttpStatus.BAD_REQUEST);
            }
        }
        catch (UsernameNotFoundException exception){
            return new ResponseEntity<>(new LoginResponse(400, "Not valid username"), HttpStatus.BAD_REQUEST);
        }
    }





}

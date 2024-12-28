package com.example.getPet.response;

import com.example.getPet.entity.User;
import lombok.*;


@Getter
@Setter
@Data
public class LoginResponse {
    private int status;
    private String message;
    private long dateTimeObject;
    private String path;
    private User user;

    public LoginResponse(int status,User user,String message) {
        this.status = status;
        this.user = user;
        this.message = message;
    }

    public LoginResponse(int status,String message) {
        this.status = status;
        this.message = message;
    }

}

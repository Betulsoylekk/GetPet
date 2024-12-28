package com.example.getPet.response;

import com.example.getPet.entity.User;
import lombok.*;


@Getter
@Setter
@Data
public class UserResponse {
    Long userId;
    String userName;

    public UserResponse(User user) {
        this.userId = user.getId();
        this.userName = user.getUserName();
    }

}

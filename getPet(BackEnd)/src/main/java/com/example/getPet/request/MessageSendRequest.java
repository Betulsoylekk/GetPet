package com.example.getPet.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class MessageSendRequest {
    private Long senderId;
    private Long recieverId;
    private String message;
}

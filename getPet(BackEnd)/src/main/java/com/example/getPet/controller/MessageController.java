package com.example.getPet.controller;

import com.example.getPet.entity.Message;
import com.example.getPet.request.MessageSendRequest;
import com.example.getPet.service.MessageService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@Setter
@RestController
@RequestMapping("/messages")
public class MessageController {
    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService){
        this.messageService= messageService;
    }

    @GetMapping("/{userId}")
    public List<Message> getMessagesForUser(@PathVariable Long userId){
        return messageService.getMessagesByUserId(userId);
    }

    @PostMapping("/send")
    public Message sendMessage(@RequestBody MessageSendRequest messageSendRequest){
        return messageService.sendMessage(messageSendRequest);
    }

    @GetMapping("/conversation/{senderId}/{recieverId}")
    public List<Message> getConversation(@PathVariable Long senderId, @PathVariable Long recieverId){
        return messageService.getConversation(senderId,recieverId);
    }
}
  
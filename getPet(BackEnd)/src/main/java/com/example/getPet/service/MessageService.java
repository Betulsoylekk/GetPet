package com.example.getPet.service;

import com.example.getPet.entity.Message;
import com.example.getPet.entity.User;
import com.example.getPet.repository.MessageRepository;
import com.example.getPet.request.MessageSendRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Getter
@Setter
@Service
public class MessageService {
    private  MessageRepository messageRepository;
    private  UserService userService;
    @Autowired
    public MessageService(MessageRepository messageRepository,UserService userService){
        this.messageRepository=messageRepository;
        this.userService=userService;
    }

    public List<Message> getMessagesByUserId(Long userId) {
        return messageRepository.findBySenderIdOrReceiverId(userId,userId);
    }

    public List<Message> getConversation(Long senderId, Long receiverId){
        User sender = userService.getUserById(senderId);
        User receiver = userService.getUserById(receiverId);
        List<Message> messages_sender_reciever= messageRepository.findBySenderAndReceiver(sender,receiver);
        List<Message> messages_reciever_sender= messageRepository.findBySenderAndReceiver(receiver,sender);
        messages_reciever_sender.addAll(messages_sender_reciever);
        Collections.sort(messages_reciever_sender, Comparator.comparing(Message::getCreationTime)); //  all messages in conversation is sorted by creations date
        return messages_reciever_sender;
    }


    public Message sendMessage(MessageSendRequest messageSendRequest) {
        LocalDateTime now = LocalDateTime.now(); // message creation date

        User sender = userService.getUserById(messageSendRequest.getSenderId());
        User reciever = userService.getUserById(messageSendRequest.getRecieverId());
    //null ise error handling eklenebilir
        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(reciever);
        message.setMessageText(messageSendRequest.getMessage());
        message.setCreationTime(now);
        messageRepository.save(message);

        return message;
    }

}

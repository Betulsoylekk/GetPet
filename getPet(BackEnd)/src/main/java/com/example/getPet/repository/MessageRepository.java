package com.example.getPet.repository;

import com.example.getPet.entity.Message;
import com.example.getPet.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long> {
    List<Message> findBySenderAndReceiver(User sender, User receiver);

    List<Message> findBySenderIdOrReceiverId(Long sender, Long receiver);
}

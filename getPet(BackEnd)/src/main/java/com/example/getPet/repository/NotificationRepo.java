package com.example.getPet.repository;

import com.example.getPet.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findByUser_Id(Long id);

}

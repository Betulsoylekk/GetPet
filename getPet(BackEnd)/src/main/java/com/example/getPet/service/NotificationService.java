package com.example.getPet.service;

import com.example.getPet.entity.Notification;
import com.example.getPet.repository.NotificationRepo;
import lombok.Getter;
import lombok.Setter;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Service
public class NotificationService {
    private NotificationRepo notificationRepo;
    private UserService userService;

    @Autowired
    public NotificationService(NotificationRepo notificationRepo, UserService userService) {
        this.notificationRepo = notificationRepo;
        this.userService = userService;
    }

    public List<Notification> getNotificationByUserId(Long userId){
        return notificationRepo.findByUser_Id(userId);
    }


    public void deleteAllNotificationsOfAnUser(Long userId){
        if(notificationRepo.findByUser_Id(userId) != null){
            notificationRepo.deleteAll(notificationRepo.findByUser_Id(userId));
        }
    }

 //   public void deleteNotificationById(Long notificationId){
 //       Notification notification = notificationRepo.findById(notificationId);
 //       notificationRepo.delete(notification);
 //   }
//

    public void save(Notification notification){
        notificationRepo.save(notification);
    }



}

package com.example.getPet.controller;

import com.example.getPet.entity.Notification;
import com.example.getPet.service.NotificationService;
import com.example.getPet.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/notifications")
public class NotificationController {
    NotificationService notificationService;

    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }


    @GetMapping("/{userId}")
    public List<Notification> getAllNotifications(@PathVariable Long userId){
        return notificationService.getNotificationByUserId(userId);
    }

    @DeleteMapping("/{userId}") // clear all notifications of an user.   ------ burayı tüm bildirimleri temizle butonuyla bağlayabiliriz.
    public void deleteAllNotificationsOfUser(@PathVariable Long userId){
        notificationService.deleteAllNotificationsOfAnUser(userId);
    }


    @DeleteMapping("/{notificationId}") // clear one notification with notification id. ---- burayı bildirimin üstünde çıkan X butonuyla bağlayabiliriz.
    public void deleteNotificationByNotificationId(@PathVariable Long notificationId){
        notificationService.deleteAllNotificationsOfAnUser(notificationId);
    }




}

package com.example.getPet.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="notification")
@Data
@Getter
@Setter
public class Notification {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @Column(name = "message")
    private String message;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, name = "creation_time")
    private LocalDateTime creationTime;

}

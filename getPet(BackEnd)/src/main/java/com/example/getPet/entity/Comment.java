package com.example.getPet.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Entity
@Table(name="comment")
@Data
@Getter
@Setter
public class Comment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Post post;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @Lob
    @Column(columnDefinition = "text")
    private String text;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, name = "creation_time")
    private LocalDateTime creationTime;




    public Comment(Long commentId, Post post, User user, String text) { // constructor for comments of a post
        this.commentId = commentId;
        this.post = post;
        this.user = user;
        this.text = text;
    }




}

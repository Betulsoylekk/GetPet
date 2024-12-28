package com.example.getPet.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "post")
@Data
public class Post {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(nullable = false,name = "title")
    private String title;

    @Column(nullable = false,name="content")  //  250 KELİMEYLE SINIRLADIM DATABASEDE
    private String content; //  explanation section for adoption and take care , content of question section

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, name = "creation_time")
    private LocalDateTime creationTime;

    @Column(name = "photo_path")
    private String photoPath;

    @Column(name="like_count")
    private Long likeCount;

    @Column(name = "post_type") //  "adoption" or "take care".
    private String postType;

    @Column(name= "city")
    private String city;

    @Column(name = "age")
    private Integer age;

    @Column(name="kind")
    private String kind;



    //it's for takecare  //// json formatters will be added

    @Column(name ="start_date")
    private LocalDate startDate;

    @Column(name ="end_date")
    private LocalDate endDate;

    @Column(name="price")
    private Float takeCarePrice;


    @Column(name= "special_needs")
    private String specialNeeds;

    @Column(name= "topic")
    private String topic;


    // Constructor for adoption posts.
    public Post(Long id, String title, String content, User user, Long likeCount, String postType, String city, int age,String kind, LocalDateTime creationTime, String specialNeeds, String photoPath) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
       // this.image = image;
        this.likeCount = likeCount;
        this.postType = postType;
        this.city = city;
        this.age = age;
        this.kind = kind;
        this.creationTime = creationTime;
        this.specialNeeds = specialNeeds;
        this.photoPath = photoPath;
    }


    // Constructor for take care posts.
    public Post(Long id, String title, String content, User user, Long likeCount, String postType, String city, int age,String kind,
                LocalDate startDate, LocalDate endDate, Float takeCarePrice, LocalDateTime creationTime, String specialNeeds,String photoPath) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
       // this.image = image;
        this.likeCount = likeCount;
        this.postType = postType;
        this.city = city;
        this.age = age;
        this.kind = kind;
        this.startDate = startDate;
        this.endDate = endDate;
        this.takeCarePrice = takeCarePrice;
        this.creationTime = creationTime;
        this.specialNeeds = specialNeeds;
        this.photoPath = photoPath;
    }

    // Constructor for question posts.
    public Post(Long id, String title, String content, User user, Long likeCount, String postType, LocalDateTime creationTime, String photoPath, String topic,String kind) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
        this.likeCount = likeCount;
        this.postType = postType;
        this.creationTime = creationTime;
        this.photoPath = photoPath;
        this.topic = topic;
        this.kind = kind;
    }


}

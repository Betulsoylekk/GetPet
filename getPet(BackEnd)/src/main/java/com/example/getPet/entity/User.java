package com.example.getPet.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name ="first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name="user_name")
    private String userName;

    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @Column(name="role")
    private String role;



}

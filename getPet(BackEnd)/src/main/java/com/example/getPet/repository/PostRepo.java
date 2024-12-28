package com.example.getPet.repository;

import com.example.getPet.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepo extends JpaRepository<Post,Long> {



   // List<Post> findByUser_Id(Long id); // it's for user's profile

    List<Post> findByPostType(String postType); // it's for main page ordered by creation date. ( ADOPTION POST OR TAKE CARE POST)






}

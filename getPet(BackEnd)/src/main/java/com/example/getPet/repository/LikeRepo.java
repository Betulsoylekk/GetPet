package com.example.getPet.repository;

import com.example.getPet.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepo extends JpaRepository<Like,Long> {
    List<Like> findByPost_Id(Long id);
    List<Like> findByUser_Id(Long id);

    Like findByUser_IdAndPost_Id(Long userId,Long postId);




}

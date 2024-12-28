package com.example.getPet.repository;

import com.example.getPet.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepo extends JpaRepository<Comment,Long> {
  //  List<Comment> findByUserIdAndPostId(Long userId, Long postId);
    List<Comment> findByPost_Id(Long id);
}

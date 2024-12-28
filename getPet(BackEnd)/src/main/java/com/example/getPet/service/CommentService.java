package com.example.getPet.service;

import com.example.getPet.entity.Comment;
import com.example.getPet.entity.Post;
import com.example.getPet.entity.User;
import com.example.getPet.repository.CommentRepo;
import com.example.getPet.request.CommentCreateRequest;
import com.example.getPet.request.CommentUpdateRequest;
import com.example.getPet.response.CommentResponse;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Getter
@Setter
@Service

public class CommentService {
    private CommentRepo commentRepo;
    private UserService userService;
    private PostService postService;


    @Autowired
    public CommentService(CommentRepo commentRepo, UserService userService, PostService postService) {
        this.commentRepo = commentRepo;
        this.userService = userService;
        this.postService = postService;
    }


//  public List<CommentResponse> getAllCommentsWithParam(Optional<Long> userId, Optional<Long> postId) {
//      List<Comment> comments;
//      if(userId.isPresent() && postId.isPresent()) {
//          comments = commentRepo.findByUserIdAndPostId(userId.get(), postId.get());
//      }else if(userId.isPresent()) {
//          comments = commentRepo.findByUser_Id(userId.get());
//      }else if(postId.isPresent()) {
//          comments = commentRepo.findByPost_Id(postId.get());
//      }else
//          comments = commentRepo.findAll();
//      return comments.stream().map(comment -> new CommentResponse(comment)).collect(Collectors.toList());
//  }

  public List<Comment> getAllComentsOfAPost(Long postId){
        List<Comment> comments = commentRepo.findByPost_Id(postId);
        if(comments != null){
            return commentRepo.findByPost_Id(postId);
        }
        return null;
    }


    public Comment getCommentById(Long commentId){
        return commentRepo.findById(commentId).orElse(null);
    }

    public Comment createComment(CommentCreateRequest commentCreateRequest){
        User user = userService.getUserById(commentCreateRequest.getUserId());
        Post post = postService.getPostById(commentCreateRequest.getPostId());
        Comment commentToSave = new Comment();
        commentToSave.setPost(post);
        commentToSave.setUser(user);
        commentToSave.setText(commentCreateRequest.getText());
        commentToSave.setCreationTime(LocalDateTime.now());
        return commentToSave;
    }

    public Comment updateOneCommentById(Long commentId, CommentUpdateRequest commentUpdateRequest){
        Optional<Comment> comment = commentRepo.findById(commentId);
        if(comment.isPresent()) {
            Comment commentToUpdate = comment.get();
            commentToUpdate.setText(commentUpdateRequest.getText());
            return commentRepo.save(commentToUpdate);
        }else
            return null;
    }

    public void deleteCommentById(Long commentId) {
        commentRepo.deleteById(commentId);
    }

    public void save(Comment comment){
        commentRepo.save(comment);
    }


}

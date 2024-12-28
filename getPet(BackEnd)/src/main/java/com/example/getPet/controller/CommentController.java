package com.example.getPet.controller;

import com.example.getPet.entity.Comment;
import com.example.getPet.entity.Notification;
import com.example.getPet.request.CommentCreateRequest;
import com.example.getPet.request.CommentUpdateRequest;
import com.example.getPet.response.CommentResponse;
import com.example.getPet.service.CommentService;
import com.example.getPet.service.NotificationService;
import com.example.getPet.service.PostService;
import com.example.getPet.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Getter
@Setter
@RestController
@RequestMapping("/comments")
public class CommentController {
    private CommentService commentService;
    private NotificationService notificationService;
    private UserService userService;
    private PostService postService;

    public CommentController(CommentService commentService, NotificationService notificationService, UserService userService, PostService postService) {
        this.commentService = commentService;
        this.notificationService = notificationService;
        this.userService = userService;
        this.postService = postService;
    }

    //{
    //    "commentId": 4,
    //    "userId": 1,
    //    "postId": 1,
    //    "text" : "text4",
    //    "target": "question"
    //
    //}
    @GetMapping("/commentsOf/{postId}")   // gets all comments of a post which has an id of postId.
    public List<CommentResponse> getAllCommentsOfAPost(@PathVariable Long postId){
        List<CommentResponse> responsesList = new ArrayList<>();
        List<Comment> comments = commentService.getAllComentsOfAPost(postId);
        if(comments != null){
            for(Comment comment: comments){
                CommentResponse commentResponse = new CommentResponse();
                commentResponse.setId(comment.getCommentId());
                commentResponse.setUserName(comment.getUser().getUserName());
                commentResponse.setText(comment.getText());
                commentResponse.setUserId(comment.getUser().getId());
                commentResponse.setCreationTime(comment.getCreationTime());
                responsesList.add(commentResponse);
            }
        }
        return responsesList;
    }





    @PostMapping
    public ResponseEntity<CommentResponse> createComment(@RequestBody CommentCreateRequest commentCreateRequest){ //  after comment is created by user. Notification will be sended to user who is the owner of the post.
        Comment comment = new Comment();
        LocalDateTime now = LocalDateTime.now();
        comment.setPost(postService.getPostById(commentCreateRequest.getPostId()));
        comment.setText(commentCreateRequest.getText());
        comment.setUser(userService.getUserById(commentCreateRequest.getUserId()));
        comment.setCreationTime(now);
        commentService.save(comment);

        if(postService.getPostById(commentCreateRequest.getPostId()).getUser().getId() != commentCreateRequest.getUserId()){ // if user doesn't comment on his post notification will be created.
            Notification notification = new Notification();
            notification.setPost(postService.getPostById(commentCreateRequest.getPostId()));
            notification.setMessage(userService.getUserById(commentCreateRequest.getUserId()).getUserName()+" commented on your post.");
            notification.setUser(userService.getUserById(postService.getPostById(commentCreateRequest.getPostId()).getUser().getId()));
            notification.setCreationTime(now); // creation time
            notificationService.save(notification);
        }

        try{
            return new ResponseEntity<>(new CommentResponse(comment), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponse> getCommentById(@PathVariable Long commentId){
        CommentResponse commentResponse = new CommentResponse();
        Comment comment = commentService.getCommentById(commentId);
        commentResponse.setId(comment.getCommentId());
        commentResponse.setText(comment.getText());
        commentResponse.setUserId(comment.getUser().getId());
        commentResponse.setUserName(comment.getUser().getUserName());
        try{
            return new ResponseEntity<>(commentResponse, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

 //  @PutMapping("/{commentId}")  // eklemek istersek requestlerde değişiklşik yapmam lazım.
 //  public Comment updateCommentById(@PathVariable Long commentId, @RequestBody CommentUpdateRequest commentUpdateRequest){
 //      return commentService.updateOneCommentById(commentId, commentUpdateRequest);
 //  }

    @DeleteMapping("/{commentId}")
    public void deleteCommentById(@PathVariable Long commentId){
        commentService.deleteCommentById(commentId);
    }
}

package com.example.getPet.controller;

import com.example.getPet.entity.Like;
import com.example.getPet.entity.Notification;
import com.example.getPet.entity.Post;
import com.example.getPet.entity.User;
import com.example.getPet.request.LikeRequest;
import com.example.getPet.response.LikeResponse;
import com.example.getPet.service.LikeService;
import com.example.getPet.service.NotificationService;
import com.example.getPet.service.PostService;
import com.example.getPet.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RestController
@RequestMapping("/likes")
public class LikeController {
    private LikeService likeService;
    private PostService postService;
    private UserService userService;
    private NotificationService notificationService;

    public LikeController(LikeService likeService, PostService postService, UserService userService, NotificationService notificationService) {
        this.likeService = likeService;
        this.postService = postService;
        this.userService = userService;
        this.notificationService = notificationService;
    }


    @PostMapping
    public ResponseEntity<LikeResponse> createLike(@RequestBody LikeRequest likeRequest){
        Like tempLike = likeService.findByUserIdAndPostId(likeRequest.getUserId(), likeRequest.getPostId());
        if(tempLike != null){ // if user has already liked this post !!
            try{
                return new ResponseEntity<>(HttpStatus.OK);
            }catch (Exception e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        else{
            LikeResponse likeResponse = new LikeResponse();
            LocalDateTime now = LocalDateTime.now();
            Post post = postService.getPostById(likeRequest.getPostId());
            User user = userService.getUserById(likeRequest.getUserId());
            Like like = new Like();
            like.setPost(post);
            like.setUser(user);
            post.setLikeCount(post.getLikeCount() + 1);// increment likeCount of post.
            likeService.save(like);
            if(post.getUser().getId() != user.getId()){ // if user doesn't like him post notification will be created.
                Notification notification = new Notification();
                notification.setPost(post);
                notification.setMessage(user.getUserName() + " liked your post.");
                notification.setUser(userService.getUserById(post.getUser().getId()));
                notification.setCreationTime(now);
                notificationService.save(notification);
            }

            try{
                likeResponse.setId(like.getId());
                likeResponse.setPostId(post.getId());
                likeResponse.setUserId(user.getId());
                return new ResponseEntity<>(likeResponse, HttpStatus.OK);
            }catch (Exception e){
                return new ResponseEntity<>(new LikeResponse(), HttpStatus.BAD_REQUEST);
            }

        }

    }




    @GetMapping("/{likeId}")
    public Like getOneLikeById(@PathVariable Long likeId){
        return likeService.getLikeById(likeId);
    }

 //   @DeleteMapping("/{likeId}")
 //   public void getLikeBackById(@PathVariable Long likeId){
 //       Like tempLike = likeService.getLikeById(likeId);
 //       likeService.getLikeBack(likeId);
 //       tempLike.getPost().setLikeCount(tempLike.getPost().getLikeCount() - 1);
 //   } // it's for getting like back.



                                         // userId -> like atan userın Id'si, postId-> like atılan post.
    @DeleteMapping("/{userId}/{postId}") // frontendde kolay erişilişmesi için parametreleri değiştirdim.Üstteki fonksiyonla işlevleri tamamen aynı
    public void getLikeBackByUserIdAndPostId(@PathVariable Long userId,@PathVariable Long postId){
        Like tempLike = likeService.findByUserIdAndPostId(userId,postId);
        tempLike.getPost().setLikeCount(tempLike.getPost().getLikeCount() - 1);
        likeService.getLikeBack(tempLike.getId());
    } // it's for getting like back.



    @GetMapping("/likesOf/{userId}")
    public List<LikeResponse> getAllLikesOfUser(@PathVariable Long userId){ // gets all likes of an user. We can acces posts from likes.
        //                                              so it's for user profile.
        //                                              'FAV POSTS' maybe...
        List<LikeResponse> likeResponses = new ArrayList<>();
        List<Like> likeList = likeService.getLikeByUserId(userId);

        if(likeList != null){
            for(Like like: likeList){
                LikeResponse likeResponse = new LikeResponse();
                likeResponse.setId(like.getId());
                likeResponse.setUserId(like.getUser().getId());
                likeResponse.setPostId(like.getPost().getId());
                likeResponses.add(likeResponse);
            }
        }
        return likeResponses;
    }



}

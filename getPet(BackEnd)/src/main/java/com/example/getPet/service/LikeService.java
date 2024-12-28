package com.example.getPet.service;

import com.example.getPet.entity.Like;
import com.example.getPet.entity.Post;
import com.example.getPet.entity.User;
import com.example.getPet.repository.LikeRepo;
import com.example.getPet.request.LikeRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
public class LikeService {
    private LikeRepo likeRepo;
    private UserService userService;
    private PostService postService;

    @Autowired
    public LikeService(LikeRepo likeRepo, UserService userService, PostService postService) {
        this.likeRepo = likeRepo;
        this.userService = userService;
        this.postService = postService;
    }

    public Like likePost(LikeRequest request){
        User user = userService.getUserById(request.getUserId());
        Post post = postService.getPostById(request.getPostId());
        Like tempLike = new Like();
        if(user != null && post != null){
            tempLike.setUser(user);
            tempLike.setPost(post);
            return likeRepo.save(tempLike);
        }
        return tempLike;
    }



    public void getLikeBack(Long likeId){
        likeRepo.deleteById(likeId);
    }

    public Like getLikeById(Long likeId){
        return likeRepo.findById(likeId).orElse(null);
    }

    public int getLikeCountPost(Long postId){ // it returns counter of a post for likes.
        if(likeRepo.findByPost_Id(postId) != null){
            return likeRepo.findByPost_Id(postId).size();
        }
        return 0;
    }


    public List<Like> getLikeByUserId(Long userId){
        return likeRepo.findByUser_Id(userId);
    }


    public Like findByUserIdAndPostId(Long userId,Long postId){
        return likeRepo.findByUser_IdAndPost_Id(userId,postId);
    }


    public void save(Like like){
        likeRepo.save(like);
    }



}

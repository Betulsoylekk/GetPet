package com.example.getPet.controller;

import com.example.getPet.entity.Post;
import com.example.getPet.request.AdoptionPostCreateRequest;
import com.example.getPet.request.PostUpdateRequest;

import com.example.getPet.request.QuestionPostCreateRequest;
import com.example.getPet.request.TakeCarePostCreateRequest;
import com.example.getPet.service.PostService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Getter
@Setter
@RestController
@RequestMapping("/posts")
public class PostController {
    private PostService postService;


    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getPostRepo().findAll();
    }

    @PostMapping("/createAdoption")
    public String createAdoptionPost(@ModelAttribute AdoptionPostCreateRequest postCreateRequest,
                                     @RequestParam("photo") MultipartFile photo) throws Exception {
        // Check if all required fields are present
        if (postCreateRequest.getTitle() == null || postCreateRequest.getContent() == null ||
                postCreateRequest.getUserId() == null || postCreateRequest.getCity() == null ||
                postCreateRequest.getAge() == null || postCreateRequest.getKind() == null) {
            return null;
        } else {
            return postService.createAdoptionPost(postCreateRequest,photo);


        }
    }

    @PostMapping("/createTakeCare")
    public Post createTakeCarePost(@ModelAttribute TakeCarePostCreateRequest postCreateRequest,
                                   @RequestParam("photo") MultipartFile photo) throws IOException {
        // Check if all required fields are present
        if (postCreateRequest.getTitle() == null || postCreateRequest.getContent() == null ||
                postCreateRequest.getUserId() == null || postCreateRequest.getCity() == null ||
                postCreateRequest.getAge() == null || postCreateRequest.getKind() == null) {
            return null;
        } else {
            return postService.createTakeCarePost(postCreateRequest,photo);


        }
    }


    @PostMapping("/createQuestion")
    public Post createQuestionPost(@RequestBody QuestionPostCreateRequest postCreateRequest) {
        return postService.createQuestionPost(postCreateRequest);
    }



    @GetMapping("/{postId}")
    public Post getPostById(@PathVariable Long postId) {
        return postService.getPostById(postId);
    }

 //   @PostMapping("/updatePost")
 //   public Post updatePostById(@RequestBody PostUpdateRequest updatePost) {
 //       return postService.updatePostById(updatePost);
 //   }
//

    @DeleteMapping("/{postId}")
    public void deletePostById(@PathVariable Long postId) {
        postService.deletePost(postId);
    }
}


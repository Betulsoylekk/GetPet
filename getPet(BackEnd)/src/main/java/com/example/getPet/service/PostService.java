package com.example.getPet.service;

import com.example.getPet.entity.Post;
import com.example.getPet.entity.User;
import com.example.getPet.repository.PostRepo;
import com.example.getPet.request.AdoptionPostCreateRequest;
import com.example.getPet.request.PostUpdateRequest;
import com.example.getPet.request.QuestionPostCreateRequest;
import com.example.getPet.request.TakeCarePostCreateRequest;

import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.Setter;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Getter
@Setter
@Service

public class PostService {
    private UserService userService;
    private PostRepo postRepo;

    @Autowired
    public PostService(UserService userService, PostRepo postRepo) {
        this.userService = userService;
        this.postRepo = postRepo;
    }

//  public List<PostResponse> getAllPostsAnUser(Long userId) { // it's for posts that belong a person which's userid is userId.
    //      List<Post> list = Collections.singletonList(postRepo.findByUser_Id(userId));
    //      return list.stream().map(PostResponse::new).collect(Collectors.toList());
    //  }


    public Post getPostById(Long id) {
        return postRepo.findById(id).orElse(null);
    }

    private final String uploadDir = "C:\\Users\\Ahmet\\Documents\\GitHub\\GetPet\\get-pet\\src\\images";



    public String createAdoptionPost(AdoptionPostCreateRequest postCreateRequest, MultipartFile photo) throws Exception { // creation for adoption posts.
        try {
            // Create the post entity
            Post post = new Post();
            post.setTitle(postCreateRequest.getTitle());
            post.setContent(postCreateRequest.getContent());
            post.setUser(userService.getUserById(postCreateRequest.getUserId()));
            post.setLikeCount(0L);
            post.setPostType("adoption");
            post.setCity(postCreateRequest.getCity());
            post.setAge(postCreateRequest.getAge());
            post.setKind(postCreateRequest.getKind());
            post.setSpecialNeeds(postCreateRequest.getSpecialNeeds());
            post.setCreationTime(LocalDateTime.now());
            post = postRepo.save(post);
            uploadPhoto(post, photo);
        } catch (Exception e) {
            throw new Exception("error occured.");
        }
        return "post-created succesfully.";
    }


    public Post uploadPhoto(Post post, MultipartFile photo) throws IOException {
        if (!photo.isEmpty()) {
            // Validate file format
            String contentType = photo.getContentType();
            if (!contentType.equals("image/jpeg")) {
                // Invalid file format
                return null;
            }

            // Generate the file name using post ID
            String fileName = "post_" + post.getId() + ".jpg"; // Replace "post_id" with the actual column name

            // Resize the image
            BufferedImage originalImage = ImageIO.read(photo.getInputStream());
            BufferedImage resizedImage = Thumbnails.of(originalImage)
                    .size(800, 600)
                    .outputFormat("jpeg")
                    .asBufferedImage();

            // Save the resized image to the server
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdir();
            }
            Path filePath = Paths.get(uploadDir, fileName);
            ImageIO.write(resizedImage, "jpeg", filePath.toFile());

            // Update the post's photo path
            System.out.println(filePath.toString());

            post.setPhotoPath(filePath.toString());
            post = postRepo.save(post);
        }
        return post;
    }


// Handle photo upload


    public Post createQuestionPost(QuestionPostCreateRequest postCreateRequest) { // creation for question posts.
        LocalDateTime now = LocalDateTime.now();
        User user = userService.getUserById(postCreateRequest.getUserId());
        if (user == null)
            return null;
        Post toSave = new Post();
        toSave.setLikeCount(Long.valueOf(0));
        toSave.setContent(postCreateRequest.getContent());
        toSave.setTitle(postCreateRequest.getTitle());
        toSave.setUser(user);
        toSave.setPostType("question");
        toSave.setCreationTime(LocalDateTime.now());
        toSave.setTopic(postCreateRequest.getTopic());
        toSave.setKind(postCreateRequest.getKind());
        return postRepo.save(toSave);
    }


    public Post createTakeCarePost(TakeCarePostCreateRequest postCreateRequest, MultipartFile photo) throws IOException { // creation for take care posts.
        LocalDateTime now = LocalDateTime.now();
        User user = userService.getUserById(postCreateRequest.getUserId());
        if (user == null)
            return null;
        Post toSave = new Post();
        toSave.setLikeCount(Long.valueOf(0));
        toSave.setContent(postCreateRequest.getContent());
        toSave.setTitle(postCreateRequest.getTitle());
        toSave.setUser(user);
        toSave.setPostType("take care");
        toSave.setCity(postCreateRequest.getCity());
        toSave.setAge(postCreateRequest.getAge());
        toSave.setKind(postCreateRequest.getKind());
        toSave.setSpecialNeeds(postCreateRequest.getSpecialNeeds());
        toSave.setStartDate(postCreateRequest.getStartDate());
        toSave.setEndDate(postCreateRequest.getEndDate());
        toSave.setTakeCarePrice(postCreateRequest.getPrice());
        toSave.setCreationTime(now);
        postRepo.save(toSave);
        uploadPhoto(toSave, photo);
        return toSave;
    }


 //   public Post updatePostById(PostUpdateRequest updatedPost) {
 //       Optional<Post> post = postRepo.findById(updatedPost.getId());
 //       if (post.isPresent()) {
 //           Post toUpdate = post.get();
 //           toUpdate.setContent(updatedPost.getText());
 //           toUpdate.setTitle(updatedPost.getTitle());
 //           return postRepo.save(toUpdate);
 //       }
 //       return null;
 //   }
//
    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }

    public List<Post> getAdoptionPosts() {
        return postRepo.findByPostType("adoption");
    }

    public List<Post> getTakeCarePosts() {
        return postRepo.findByPostType("take care");
    }


}

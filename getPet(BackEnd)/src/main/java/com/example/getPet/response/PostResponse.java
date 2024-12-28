package com.example.getPet.response;

import com.example.getPet.entity.Post;
import com.example.getPet.entity.User;
import lombok.*;


@Getter
@Setter
@Data
public class PostResponse {
    private Long id;
    private User user;
    private String title;
    private String content;
    private String postType;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.user = post.getUser();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.postType = post.getPostType();

    }

}

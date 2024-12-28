package com.example.getPet.request;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Data
public class CommentCreateRequest {
    private Long userId;
    private Long postId;
    private String text;


    public CommentCreateRequest(Long userId, Long postId ,String text, Long commentId) {
            this.userId = userId;
            this.postId = postId;
            this.text = text;
    }


}

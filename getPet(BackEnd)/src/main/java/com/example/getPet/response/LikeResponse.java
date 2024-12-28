package com.example.getPet.response;

import com.example.getPet.entity.Like;
import com.example.getPet.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LikeResponse {
    Long id;
    Long postId;
    Long userId;

}

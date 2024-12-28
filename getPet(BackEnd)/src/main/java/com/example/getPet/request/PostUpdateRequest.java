package com.example.getPet.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class PostUpdateRequest {
    private String title;
    private String text;
}

package com.example.getPet.request;

import com.example.getPet.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class QuestionPostCreateRequest {
    private Long userId;

    private String content;
    private String title;
    private String topic;
    private String kind;

}


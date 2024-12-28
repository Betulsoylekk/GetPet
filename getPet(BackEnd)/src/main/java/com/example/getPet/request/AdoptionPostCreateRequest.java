package com.example.getPet.request;

import com.example.getPet.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AdoptionPostCreateRequest {
      private String title;
      private String content;
      private Long userId;
      private String city;
      private Integer age;
      private String kind;
      private String specialNeeds;

}
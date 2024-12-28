package com.example.getPet.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Data
public class TakeCarePostCreateRequest {

    private String title;
    private String content;
    private Long userId;
    private String city;
    private Integer age;
    private String kind;
    private LocalDate startDate;
    private LocalDate endDate;
    private Float price;
    private String specialNeeds;
}

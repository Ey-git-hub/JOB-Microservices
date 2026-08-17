package com.jobapplication.reviewms.Review.entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;

// import com.app.jobapplication.Company.entity.CompanyEntity;

import jakarta.persistence.Entity;
import lombok.*;
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private double rating;
    private Long companyId;
  
}

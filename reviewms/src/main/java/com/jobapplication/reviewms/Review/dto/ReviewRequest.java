package com.jobapplication.reviewms.Review.dto;
// import com.app.jobapplication.Company.entity.CompanyEntity;

import lombok.Data;

@Data
public class ReviewRequest {
    private String title;
    private String description;
    private double rating;
    // private CompanyEntity company;
}

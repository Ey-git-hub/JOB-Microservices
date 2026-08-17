package com.jobapplication.reviewms.Review.dto;
import com.jobapplication.reviewms.Review.entity.ReviewEntity;

// import com.app.jobapplication.Review.entity.ReviewEntity;
import lombok.*;

@Data
@NoArgsConstructor
public class ReviewResponse {
    private Long id;
    private String title;
    private String description;
    private double rating;

    public static ReviewResponse fromEntity(ReviewEntity reviewEntity) {
        ReviewResponse response = new ReviewResponse();
        response.setId(reviewEntity.getId());
        response.setTitle(reviewEntity.getTitle());
        response.setDescription(reviewEntity.getDescription());
        response.setRating(reviewEntity.getRating());
      
        return response;
    }
}

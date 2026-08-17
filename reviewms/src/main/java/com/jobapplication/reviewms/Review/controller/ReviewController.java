package com.jobapplication.reviewms.Review.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobapplication.reviewms.Review.dto.ReviewRequest;
import com.jobapplication.reviewms.Review.dto.ReviewResponse;
import com.jobapplication.reviewms.Review.entity.ReviewEntity;
import com.jobapplication.reviewms.Review.service.ReviewService;
import com.jobapplication.reviewms.Review.service.Impl.ReviewServiceImpl;

import java.util.List;

// import com.app.jobapplication.Review.dto.ReviewRequest;
// import com.app.jobapplication.Review.dto.ReviewResponse;
// import com.app.jobapplication.Review.service.Impl.ReviewServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getReviews(@RequestParam Long companyId) {
        return ResponseEntity.ok(reviewService.getAllReviews(companyId));
    }


    @PostMapping
    public ResponseEntity<String> createReview(@RequestBody ReviewRequest reviewRequest, 
        @RequestParam Long companyId) {
     boolean isCreated=reviewService.createReview(reviewRequest,companyId);
   if(isCreated){
    return ResponseEntity.ok("review created successfully");
   }
   return ResponseEntity.notFound().build();
}

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewEntity> getReviewById(@PathVariable Long reviewId){
    ReviewEntity review=reviewService.getReviewById(reviewId);
    if(review != null){
   return ResponseEntity.ok(review);
      }
    return ResponseEntity.notFound().build();
}
   @PutMapping("/{reviewId}")
   public ResponseEntity<String> updateReview(@PathVariable Long reviewId,@RequestBody ReviewRequest reviewRequest){
        boolean isUpdated=reviewService.updateReview(reviewId,reviewRequest);
        if(isUpdated){
            return ResponseEntity.ok("review updated Successfully");
        }
        return ResponseEntity.notFound().build();
    }
   @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId){
boolean isDeleted=reviewService.deleteReview(reviewId);
        if(isDeleted){
            return ResponseEntity.ok("review deleted Successfully");
        }
        return ResponseEntity.notFound().build();
    
}
}
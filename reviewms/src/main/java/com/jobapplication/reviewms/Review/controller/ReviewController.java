package com.app.jobapplication.Review.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.app.jobapplication.Review.dto.ReviewRequest;
import com.app.jobapplication.Review.dto.ReviewResponse;
import com.app.jobapplication.Review.service.Impl.ReviewServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/companies/{companyId}")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewServiceImpl reviewService;

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable Long companyId) {
        return ResponseEntity.ok(reviewService.getAllReviews(companyId));
    }


    @PostMapping("/reviews")
    public ResponseEntity<String> createReview(@RequestBody ReviewRequest reviewRequest, 
        @PathVariable Long companyId) {
     boolean isCreated=reviewService.createReview(reviewRequest,companyId);
   if(isCreated){
    return ResponseEntity.ok("review created successfully");
   }
   return ResponseEntity.notFound().build();
}

    @GetMapping("reviews/{reviewId}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long companyId,@PathVariable Long reviewId){
    ReviewResponse review=reviewService.getReviewById(companyId,reviewId);
    if(review != null){
   return ResponseEntity.ok(review);
      }
    return ResponseEntity.notFound().build();
}
   @PutMapping("/reviews/{reviewId}")
   public ResponseEntity<String> updateReview(@PathVariable Long companyId,
    @PathVariable Long reviewId,@RequestBody ReviewRequest reviewRequest){
        boolean isUpdated=reviewService.updateReview(companyId,reviewId,reviewRequest);
        if(isUpdated){
            return ResponseEntity.ok("review updated Successfully");
        }
        return ResponseEntity.notFound().build();
    }
   @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long companyId,@PathVariable Long reviewId){
boolean isDeleted=reviewService.deleteReview(companyId,reviewId);
        if(isDeleted){
            return ResponseEntity.ok("review deleted Successfully");
        }
        return ResponseEntity.notFound().build();
    
}
}
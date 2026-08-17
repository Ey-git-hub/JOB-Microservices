package com.jobapplication.reviewms.Review.service.Impl;
import java.util.List;
// import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jobapplication.reviewms.Review.dto.ReviewRequest;
import com.jobapplication.reviewms.Review.dto.ReviewResponse;
import com.jobapplication.reviewms.Review.entity.ReviewEntity;
import com.jobapplication.reviewms.Review.repository.ReviewRepository;
import com.jobapplication.reviewms.Review.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
   private final ReviewRepository reviewRepository;
 @Override
 public List<ReviewResponse> getAllReviews(Long companyId){
   List<ReviewResponse> reviews=reviewRepository.findBycompanyId(companyId);
  return reviews;
 }
@Override
public boolean createReview(ReviewRequest reviewRequest, Long companyId) {
   if(companyId != null && reviewRequest!=null ){
   ReviewEntity review= new ReviewEntity();
   review.setTitle(reviewRequest.getTitle());
   review.setDescription(reviewRequest.getDescription());
   review.setRating(reviewRequest.getRating());
   review.setCompanyId(reviewRequest.getCompanyId());
   reviewRepository.save(review);
   return true;
   }
   return false;
   
}

public ReviewEntity getReviewById(Long reviewId){
   return reviewRepository.findById(reviewId).orElse(null);

}
@Override
public boolean updateReview(Long reviewId,ReviewRequest reviewRequest) {
   ReviewEntity existingReview=reviewRepository.findById(reviewId).orElse(null);
   if(reviewId!= null){
       existingReview.setTitle(reviewRequest.getTitle());
       existingReview.setRating(reviewRequest.getRating());
       existingReview.setDescription(reviewRequest.getDescription());
       existingReview.setCompanyId(reviewRequest.getCompanyId());

       reviewRepository.save(existingReview);
       return true;
    }
    return false;
 }
@Override
public boolean deleteReview(Long reviewId) {
   //  // ensure company exists
    ReviewEntity review =reviewRepository.findById(reviewId).orElse(null);
    if(review !=null){
      reviewRepository.delete(review);
      return true;
    }
    return false;
}

}
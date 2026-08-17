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

// import com.app.jobapplication.Company.dto.CompanyResponse;
// import com.app.jobapplication.Company.entity.CompanyEntity;
// import com.app.jobapplication.Company.service.Impl.CompanyServiceImpl;
// import com.app.jobapplication.Review.dto.ReviewRequest;
// import com.app.jobapplication.Review.dto.ReviewResponse;
// import com.app.jobapplication.Review.entity.ReviewEntity;
// import com.app.jobapplication.Review.repository.ReviewRepository;
// import com.app.jobapplication.Review.service.ReviewService;
// import java.util.Collection
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
   private final ReviewRepository reviewRepository;
   // private final companyServiceImpl companyService;
 @Override
 public List<ReviewResponse> getAllReviews(Long companyId){
  return reviewRepository.findByCompanyId(companyId);
 }
@Override
public boolean createReview(ReviewRequest reviewRequest, Long id) {
   // CompanyResponse company=companyService.getCompanyById(id);
   // if(company != null){
   // ReviewEntity review= new ReviewEntity();
   // review.setTitle(reviewRequest.getTitle());
   // review.setDescription(reviewRequest.getDescription());
   // review.setRating(reviewRequest.getRating());
   // reviewRepository.save(review);
   // return true;
   // }
   return false;
   
}

public ReviewResponse getReviewById(Long companyId,Long reviewId){
   List<ReviewResponse> reviews =getAllReviews(companyId);
           return reviews.stream().filter(review-> review.getId().equals(reviewId))
           .findFirst()
           .orElse(null);

}
@Override
public boolean updateReview(Long reviewId,Long companyId,ReviewRequest reviewRequest) {
   Optional<ReviewEntity> reviewOptional=reviewRepository.findById(reviewId);
   // if(companyService.getCompanyById(companyId) != null){
   //     if (reviewOptional.isPresent()) {
   //        ReviewEntity review = reviewOptional.get();
   //        // ensure the review belongs to the given company
   //        if (review.getCompany() != null && review.getCompany().getId() != null
   //              && review.getCompany().getId().equals(companyId)) {
   //           review.setTitle(reviewRequest.getTitle());
   //           review.setDescription(reviewRequest.getDescription());
   //           review.setRating(reviewRequest.getRating());
   //           reviewRepository.save(review);
   //           return true;
   //        }
   //     }
   //  }
    return false;
 }
@Override
public boolean deleteReview(Long companyId, Long reviewId) {
   //  // ensure company exists
   //  if (companyService.getCompanyById(companyId) == null) {
   //     return false;
   //  }
   //  Optional<ReviewEntity> reviewOptional = reviewRepository.findById(reviewId);
   //  if (reviewOptional.isPresent()) {
   //     ReviewEntity review = reviewOptional.get();
   //     if (review.getCompany() != null && review.getCompany().getId() != null
   //           && review.getCompany().getId().equals(companyId)) {
   //        reviewRepository.delete(review);
   //        return true;
   //     }
   //  }
    return false;
}}
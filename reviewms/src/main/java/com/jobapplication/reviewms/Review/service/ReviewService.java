package com.jobapplication.reviewms.Review.service;

// import com.app.jobapplication.Review.dto.*;
import java.util.List;

import com.jobapplication.reviewms.Review.dto.ReviewRequest;
import com.jobapplication.reviewms.Review.dto.ReviewResponse;
import com.jobapplication.reviewms.Review.entity.ReviewEntity;

public interface ReviewService {
     List<ReviewResponse> getAllReviews(Long companyId);
     boolean updateReview(Long reviewId,ReviewRequest reviewRequest);
     boolean createReview(ReviewRequest reviewRequest,Long companyId);
     boolean deleteReview(Long reviewId);
     ReviewEntity getReviewById(Long reviewId);
}

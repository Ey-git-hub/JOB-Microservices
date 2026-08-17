package com.jobapplication.reviewms.Review.service;

// import com.app.jobapplication.Review.dto.*;
import java.util.List;

import com.jobapplication.reviewms.Review.dto.ReviewRequest;
import com.jobapplication.reviewms.Review.dto.ReviewResponse;

public interface ReviewService {
     List<ReviewResponse> getAllReviews(Long companyId);
     boolean updateReview(Long reviewId,Long companyId,ReviewRequest reviewRequest);
     boolean createReview(ReviewRequest reviewRequest,Long id);
     boolean deleteReview(Long companyId,Long reviewId);
     ReviewResponse getReviewById(Long companyId,Long reviewId);
}

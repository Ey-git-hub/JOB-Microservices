package com.jobapplication.reviewms.Review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobapplication.reviewms.Review.dto.ReviewResponse;
import com.jobapplication.reviewms.Review.entity.ReviewEntity;

// import com.app.jobapplication.Review.entity.ReviewEntity;

// import com.app.jobapplication.Review.dto.ReviewResponse;
// import com.app.jobapplication.Review.entity.ReviewEntity;

public interface ReviewRepository extends JpaRepository<ReviewEntity,Long>{

    // List<ReviewResponse> findByCompanyId(Long companyId);

    List<ReviewResponse> findBycompanyId(Long companyId);
    
}

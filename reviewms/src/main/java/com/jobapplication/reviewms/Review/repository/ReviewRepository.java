package com.app.jobapplication.Review.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.jobapplication.Review.dto.ReviewResponse;
import com.app.jobapplication.Review.entity.ReviewEntity;

public interface ReviewRepository extends JpaRepository<ReviewEntity,Long>{

    List<ReviewResponse> findByCompanyId(Long id);
    
}

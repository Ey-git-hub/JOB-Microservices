package com.jobapplication.reviewms.messages;

import org.springframework.amqp.rabbit.core.RabbitTemplate;

import com.jobapplication.reviewms.Review.dto.ReviewMessage;
import com.jobapplication.reviewms.Review.entity.ReviewEntity;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class ReviewMessageProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendMessage(ReviewEntity review) {
        ReviewMessage message = new ReviewMessage();
        message.setId(review.getId());
        message.setTitle(review.getTitle());
        message.setDescription(review.getDescription());
        message.setRating(review.getRating());
        message.setCompanyId(review.getCompanyId());
        rabbitTemplate.convertAndSend("companyReviewQueue", message);
    } 
}

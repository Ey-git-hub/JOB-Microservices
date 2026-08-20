package com.jobapplication.companyms.messages;

import org.springframework.amqp.rabbit.annotation.RabbitListener;

import com.jobapplication.companyms.Company.dto.ReviewMessage;
import com.jobapplication.companyms.Company.service.CompanyService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ReviewMessageConsumer {
    private final CompanyService companyService;
    @RabbitListener(queues = "companyReviewQueue")
    public void consumeMessage(ReviewMessage message) {
        companyService.updateCompanyRating(message);
    }
}

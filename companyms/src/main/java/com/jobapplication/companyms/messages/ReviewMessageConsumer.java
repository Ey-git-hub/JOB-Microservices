package com.jobapplication.companyms.messages;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.jobapplication.companyms.Company.dto.ReviewMessage;
import com.jobapplication.companyms.Company.service.CompanyService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ReviewMessageConsumer {
    private final CompanyService companyService;
    @RabbitListener(queues = "companyReviewQueue")
    public void consumeMessage(ReviewMessage message) {
        companyService.updateCompanyRating(message);
    }
}

package com.jobapplication.reviewms.messages;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;

public class RabbitMqConfiguration {

    public Queue companyReviewQueue() {
        return new Queue("companyReviewQueue");
    }
    
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}

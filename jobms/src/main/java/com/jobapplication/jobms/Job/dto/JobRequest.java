package com.jobapplication.jobms.Job.dto;

import lombok.Data;

@Data  
public class JobRequest {
    private String title;
    private String description;
    private String minSalary;
    private String maxSalary;
    private String location; 
    private Long companyId;     
}

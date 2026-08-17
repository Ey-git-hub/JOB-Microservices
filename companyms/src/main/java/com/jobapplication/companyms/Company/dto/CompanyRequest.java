package com.app.jobapplication.Company.dto;

import java.util.List;
import com.app.jobapplication.Job.dto.JobRequest;
import lombok.Data;

@Data
public class CompanyRequest {
    private String name;
    private String location;
    private String description;
    private List<JobRequest> jobs;
}

package com.jobapplication.companyms.Company.dto;

import java.util.List;

// import com.app.jobapplication.Job.dto.JobResponse;
import com.jobapplication.companyms.Company.entity.Company;
// import com.app.jobapplication.Company.entity.CompanyEntity;
import lombok.Data;

@Data
public class CompanyResponse {
    private Long id;
    private String name;
    private String location;
    private String description;
    // private List<JobResponse> jobs;


    public static CompanyResponse fromEntity(Company companyEntity) {
        CompanyResponse response = new CompanyResponse();
        response.setId(companyEntity.getId());
        response.setName(companyEntity.getName());
        response.setLocation(companyEntity.getLocation());
        response.setDescription(companyEntity.getDescription());
        // if (companyEntity.getJobs() != null) {
        //     List<JobResponse> jobResponses = companyEntity.getJobs().stream()
        //             .map(JobResponse::fromEntity)
        //             .collect(java.util.stream.Collectors.toList());
        //     response.setJobs(jobResponses);
        // }
        return response;
    }
    
}

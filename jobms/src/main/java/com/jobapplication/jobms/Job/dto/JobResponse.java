package com.app.jobapplication.Job.dto;

import com.app.jobapplication.Job.entity.JobEntity;

import lombok.Data;

@Data
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String minSalary;
    private String maxSalary;
    private String location;

    public static JobResponse fromEntity(JobEntity entity) {
        JobResponse response = new JobResponse();
        response.setId(entity.getId());
        response.setTitle(entity.getTitle());
        response.setDescription(entity.getDescription());
        response.setMinSalary(entity.getMinSalary());
        response.setMaxSalary(entity.getMaxSalary());
        response.setLocation(entity.getLocation());
        return response;
    }
}
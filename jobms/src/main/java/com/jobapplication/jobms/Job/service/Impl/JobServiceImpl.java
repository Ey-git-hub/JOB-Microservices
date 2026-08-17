package com.app.jobapplication.Job.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

// import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import com.app.jobapplication.Job.dto.JobRequest;
import com.app.jobapplication.Job.dto.JobResponse;
import com.app.jobapplication.Job.entity.JobEntity;
import com.app.jobapplication.Job.repository.JobRepository;
import com.app.jobapplication.Job.service.JobService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;
@Override
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(JobResponse::fromEntity)
                .collect(Collectors.toList());
    }
@Override
    public JobResponse addNewJob(JobRequest request) {
        JobEntity entity = new JobEntity();
        entity.setTitle(request.getTitle());
        entity.setDescription(request.getDescription());
        entity.setMinSalary(request.getMinSalary());
        entity.setMaxSalary(request.getMaxSalary());
        entity.setLocation(request.getLocation());
        return JobResponse.fromEntity(jobRepository.save(entity));
    }
@Override
    public JobResponse getJobById(Long id) {
        return jobRepository.findById(id)
                .map(JobResponse::fromEntity)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }
@Override
    public JobResponse updateJob(Long id, JobRequest request) throws IllegalAccessException {
        JobEntity existingJob=jobRepository.findById(id).orElseThrow(() -> new IllegalAccessException("job doest not exist by id: "+id));
        existingJob.setTitle(request.getTitle());
        existingJob.setDescription(request.getDescription());
        existingJob.setMinSalary(request.getMinSalary());
        existingJob.setMinSalary(request.getMinSalary());
        existingJob.setLocation(request.getLocation());
        return JobResponse.fromEntity(jobRepository.save(existingJob));
    }
@Override
    public void deleteJob(Long id) throws IllegalAccessException {
        JobEntity existingJob=jobRepository.findById(id).orElseThrow(() -> new IllegalAccessException("job doest not exist by id: "+id));
        jobRepository.delete(existingJob);
    }
}

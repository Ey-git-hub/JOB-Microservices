package com.jobapplication.jobms.Job.service;

import java.util.List;

import com.jobapplication.jobms.Job.dto.JobRequest;
import com.jobapplication.jobms.Job.dto.JobResponse;

public interface JobService {
List<JobResponse> getAllJobs();
JobResponse addNewJob(JobRequest request);
 JobResponse getJobById(Long id);
  JobResponse updateJob(Long id, JobRequest request)throws IllegalAccessException;
  void deleteJob(Long id)throws IllegalAccessException ;
}
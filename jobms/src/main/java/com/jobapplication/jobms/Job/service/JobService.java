package com.app.jobapplication.Job.service;

import java.util.List;

import com.app.jobapplication.Job.dto.JobRequest;
import com.app.jobapplication.Job.dto.JobResponse;

public interface JobService {
List<JobResponse> getAllJobs() ;
JobResponse addNewJob(JobRequest request) ;
 JobResponse getJobById(Long id) ;
  JobResponse updateJob(Long id, JobRequest request)throws IllegalAccessException ;
  void deleteJob(Long id)throws IllegalAccessException ;
}
package com.app.jobapplication.Job.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.jobapplication.Job.dto.JobRequest;
import com.app.jobapplication.Job.dto.JobResponse;
import com.app.jobapplication.Job.service.JobService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @PostMapping
    public ResponseEntity<JobResponse> addNewJob(@RequestBody JobRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.addNewJob(request));
    }
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id,@RequestBody JobRequest request) throws IllegalAccessException{
        return ResponseEntity.ok(jobService.updateJob(id,request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) throws IllegalAccessException {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}

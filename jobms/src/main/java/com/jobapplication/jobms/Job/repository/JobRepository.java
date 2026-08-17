package com.jobapplication.jobms.Job.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobapplication.jobms.Job.entity.JobEntity;

// import com.app.jobapplication.Job.entity.JobEntity;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
}

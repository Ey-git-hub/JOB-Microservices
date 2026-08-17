package com.app.jobapplication.Job.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.jobapplication.Job.entity.JobEntity;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
}

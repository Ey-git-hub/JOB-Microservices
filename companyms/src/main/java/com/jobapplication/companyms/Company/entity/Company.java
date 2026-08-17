package com.jobapplication.companyms.Company.entity;

import java.util.List;

// import com.app.jobapplication.Job.entity.JobEntity;
// import com.app.jobapplication.Review.entity.ReviewEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    // @JsonIgnore
    // @OneToMany(mappedBy = "company")
    // // private List<JobEntity> jobs;
    // @JsonIgnore
    // @OneToMany(mappedBy = "company")
    // // private List<ReviewEntity> reviews;
    private String description;
}

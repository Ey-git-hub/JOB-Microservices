package com.jobapplication.jobms.Job.entity;

// import com.app.jobapplication.Company.entity.CompanyEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToMany;    
import lombok.*;
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class JobEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description; 
    private String minSalary;
    private String maxSalary;
    private String location;
    // @ManyToOne
    // private CompanyEntity company;
}

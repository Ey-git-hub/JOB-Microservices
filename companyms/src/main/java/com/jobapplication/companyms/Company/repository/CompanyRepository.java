package com.jobapplication.companyms.Company.repository;
import org.springframework.data.jpa.repository.JpaRepository;
// import com.app.jobapplication.Company.entity.CompanyEntity;

import com.jobapplication.companyms.Company.entity.Company;

public interface CompanyRepository extends JpaRepository<Company,Long> {
    
}

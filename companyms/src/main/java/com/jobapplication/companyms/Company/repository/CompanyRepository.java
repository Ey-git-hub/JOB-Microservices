package com.app.jobapplication.Company.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.jobapplication.Company.entity.CompanyEntity;

public interface CompanyRepository extends JpaRepository<CompanyEntity,Long> {
    
}

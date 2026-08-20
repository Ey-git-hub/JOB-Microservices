package com.jobapplication.companyms.Company.service;
// import com.app.jobapplication.Company.dto.CompanyResponse;
import java.util.List;
// import com.app.jobapplication.Company.dto.CompanyRequest;

import com.jobapplication.companyms.Company.dto.CompanyRequest;
import com.jobapplication.companyms.Company.dto.CompanyResponse;
import com.jobapplication.companyms.Company.dto.ReviewMessage;

public interface CompanyService {
    List<CompanyResponse> getAllCompanies();
    boolean updateCompany(Long id, CompanyRequest companyRequest);
    Void createCompany(CompanyRequest companyRequest);
    boolean deleteCompany(Long id);
    CompanyResponse getCompanyById(Long id);
    public void updateCompanyRating(ReviewMessage message);
}

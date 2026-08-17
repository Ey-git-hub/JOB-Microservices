package com.app.jobapplication.Company.service.Impl;

import org.springframework.stereotype.Service;
import com.app.jobapplication.Company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import com.app.jobapplication.Company.service.CompanyService;
import java.util.List;

// import com.app.jobapplication.Company.entity.Company;
import com.app.jobapplication.Company.entity.CompanyEntity;
import com.app.jobapplication.Company.dto.CompanyRequest;
import com.app.jobapplication.Company.dto.CompanyResponse;
// import com.app.jobapplication.Job.dto.JobRequest;
// import com.app.jobapplication.Job.entity.JobEntity;
// import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
     
    @Override
    public List<CompanyResponse> getAllCompanies() {
        return companyRepository.findAll().stream().map(CompanyResponse::fromEntity).collect(Collectors.toList());
    }
    @Override
    public boolean updateCompany(Long id,CompanyRequest companyRequest) {
        Optional<CompanyEntity> companyOptional= companyRepository.findById(id);
        if(companyOptional.isPresent()){
            CompanyEntity existingCompany = companyOptional.get();
        existingCompany.setName(companyRequest.getName());
        existingCompany.setLocation(companyRequest.getLocation());
        existingCompany.setDescription(companyRequest.getDescription());
        // existingCompany.setJobs(companyRequest.getJobs());

       companyRepository.save(existingCompany);
        return true;
        }
        return false;
        
    }
    @Override
    public Void createCompany(CompanyRequest companyRequest) {
        CompanyEntity companyEntity = new CompanyEntity();
                companyEntity.setName(companyRequest.getName());
                companyEntity.setLocation(companyRequest.getLocation());
                companyEntity.setDescription(companyRequest.getDescription());
        companyRepository.save(companyEntity);
        return null;
    }
    @Override
    public CompanyResponse getCompanyById(Long id) {
        return companyRepository.findById(id).map(CompanyResponse::fromEntity).orElse(null);
    }
    @Override
    public boolean deleteCompany(Long id) {
        if(companyRepository.existsById(id))
        {
            companyRepository.deleteById(id);
            return true;
        }
        return false;
    }}


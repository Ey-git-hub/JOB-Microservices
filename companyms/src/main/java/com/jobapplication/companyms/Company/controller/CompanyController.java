package com.jobapplication.companyms.Company.controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobapplication.companyms.Company.dto.CompanyRequest;
import com.jobapplication.companyms.Company.dto.CompanyResponse;
import com.jobapplication.companyms.Company.service.Impl.CompanyServiceImpl;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
// import com.app.jobapplication.Company.dto.CompanyRequest;
// import com.app.jobapplication.Company.service.Impl.CompanyServiceImpl;
// import com.app.jobapplication.Company.dto.CompanyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
 private final CompanyServiceImpl companyServiceImpl;
  @GetMapping
  public ResponseEntity<List<CompanyResponse>> getAllComapnies() {
    return ResponseEntity.ok(companyServiceImpl.getAllCompanies());
  }
  @PutMapping("/update/{id}")
  public ResponseEntity<String> updateCompany(@PathVariable Long id, @RequestBody CompanyRequest companyRequest) {
    boolean isUpdated = companyServiceImpl.updateCompany(id, companyRequest);
    if (isUpdated) {
        return ResponseEntity.ok("Company updated successfully.");
    } else {
        return ResponseEntity.notFound().build();
    }
  }
  @PostMapping("/create")
  public ResponseEntity<String> createCompany(@RequestBody CompanyRequest companyRequest) {
    companyServiceImpl.createCompany(companyRequest);
    return ResponseEntity.ok("Company created successfully.");
}
@DeleteMapping("/delete/{id}")
public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
    boolean isDeleted = companyServiceImpl.deleteCompany(id);
    if (isDeleted) {
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}
@GetMapping("/{id}")
public ResponseEntity<CompanyResponse> getCompanyById(@PathVariable Long id) {
    CompanyResponse companyResponse = companyServiceImpl.getCompanyById(id);
    if (companyResponse != null) {
        return ResponseEntity.ok(companyResponse);
    } else {
        return ResponseEntity.notFound().build();
    }
}}
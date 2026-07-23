package org.posthumanlab.network.membership.service;

import org.posthumanlab.network.membership.dto.MembershipInterestRequest;
import org.posthumanlab.network.membership.dto.MembershipInterestResponse;
import org.posthumanlab.network.membership.entity.MembershipInterest;
import org.posthumanlab.network.membership.entity.MembershipInterestStatus;
import org.posthumanlab.network.membership.repository.MembershipInterestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MembershipInterestService {

    private final MembershipInterestRepository interestRepository;

    public MembershipInterestService(MembershipInterestRepository interestRepository) {
        this.interestRepository = interestRepository;
    }

    public MembershipInterestResponse saveInterest(MembershipInterestRequest request) {
        MembershipInterest mi = new MembershipInterest();
        mi.setName(request.getName());
        mi.setEmail(request.getEmail());
        mi.setAreaOfInterest(request.getAreaOfInterest());
        mi.setMessage(request.getMessage());
        mi.setStatus(MembershipInterestStatus.NEW);

        MembershipInterest saved = interestRepository.save(mi);
        return new MembershipInterestResponse(saved);
    }

    @Transactional(readOnly = true)
    public java.util.List<MembershipInterestResponse> getAllInterests() {
        return interestRepository.findAll().stream()
                .map(MembershipInterestResponse::new)
                .collect(java.util.stream.Collectors.toList());
    }

    public MembershipInterestResponse updateInterestStatus(Long id, String statusStr) {
        MembershipInterest mi = interestRepository.findById(id)
                .orElseThrow(() -> new org.posthumanlab.network.common.exception.ResourceNotFoundException("Membership interest not found with ID: " + id));
        mi.setStatus(MembershipInterestStatus.valueOf(statusStr.toUpperCase()));
        return new MembershipInterestResponse(interestRepository.save(mi));
    }
}

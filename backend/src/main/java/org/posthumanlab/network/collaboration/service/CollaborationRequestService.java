package org.posthumanlab.network.collaboration.service;

import org.posthumanlab.network.collaboration.dto.CollaborationRequestDto;
import org.posthumanlab.network.collaboration.entity.CollaborationRequest;
import org.posthumanlab.network.collaboration.entity.CollaborationRequestStatus;
import org.posthumanlab.network.collaboration.repository.CollaborationRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CollaborationRequestService {

    private final CollaborationRequestRepository collaborationRequestRepository;

    public CollaborationRequestService(CollaborationRequestRepository collaborationRequestRepository) {
        this.collaborationRequestRepository = collaborationRequestRepository;
    }

    @Transactional
    public CollaborationRequestDto saveRequest(CollaborationRequestDto dto) {
        CollaborationRequest request = new CollaborationRequest();
        request.setName(dto.getName());
        request.setEmail(dto.getEmail());
        request.setOrganization(dto.getOrganization());
        request.setCollaborationType(dto.getCollaborationType());
        request.setMessage(dto.getMessage());
        request.setStatus(CollaborationRequestStatus.NEW);

        CollaborationRequest saved = collaborationRequestRepository.save(request);

        CollaborationRequestDto response = new CollaborationRequestDto();
        response.setId(saved.getId());
        response.setName(saved.getName());
        response.setEmail(saved.getEmail());
        response.setOrganization(saved.getOrganization());
        response.setCollaborationType(saved.getCollaborationType());
        response.setMessage(saved.getMessage());
        response.setStatus(saved.getStatus().name());
        response.setCreatedAt(saved.getCreatedAt());
        return response;
    }
}

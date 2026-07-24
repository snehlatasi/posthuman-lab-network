package org.posthumanlab.network.collaboration.service;

import org.posthumanlab.network.collaboration.dto.CollaborationRequestDto;
import org.posthumanlab.network.collaboration.entity.CollaborationRequest;
import org.posthumanlab.network.collaboration.entity.CollaborationRequestStatus;
import org.posthumanlab.network.collaboration.repository.CollaborationRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<CollaborationRequestDto> getAllRequests() {
        return collaborationRequestRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteRequest(Long id) {
        if (!collaborationRequestRepository.existsById(id)) {
            throw new org.posthumanlab.network.common.exception.ResourceNotFoundException("Collaboration request not found with ID: " + id);
        }
        collaborationRequestRepository.deleteById(id);
    }

    private CollaborationRequestDto mapToDto(CollaborationRequest entity) {
        CollaborationRequestDto dto = new CollaborationRequestDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setOrganization(entity.getOrganization());
        dto.setCollaborationType(entity.getCollaborationType());
        dto.setMessage(entity.getMessage());
        dto.setStatus(entity.getStatus() != null ? entity.getStatus().name() : "NEW");
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}


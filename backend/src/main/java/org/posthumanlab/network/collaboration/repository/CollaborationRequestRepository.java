package org.posthumanlab.network.collaboration.repository;

import org.posthumanlab.network.collaboration.entity.CollaborationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaborationRequestRepository extends JpaRepository<CollaborationRequest, Long> {
}

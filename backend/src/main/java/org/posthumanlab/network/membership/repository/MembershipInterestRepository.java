package org.posthumanlab.network.membership.repository;

import org.posthumanlab.network.membership.entity.MembershipInterest;
import org.posthumanlab.network.membership.entity.MembershipInterestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembershipInterestRepository extends JpaRepository<MembershipInterest, Long> {
    List<MembershipInterest> findByStatusOrderByCreatedAtDesc(MembershipInterestStatus status);
}

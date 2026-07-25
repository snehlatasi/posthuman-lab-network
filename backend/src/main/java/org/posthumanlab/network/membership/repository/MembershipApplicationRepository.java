package org.posthumanlab.network.membership.repository;

import org.posthumanlab.network.membership.entity.MembershipApplication;
import org.posthumanlab.network.membership.entity.MembershipApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MembershipApplicationRepository extends JpaRepository<MembershipApplication, Long> {
    Optional<MembershipApplication> findByGoogleSubjectId(String googleSubjectId);
    Optional<MembershipApplication> findByEmail(String email);
    List<MembershipApplication> findByStatusOrderBySubmittedAtDesc(MembershipApplicationStatus status);
    List<MembershipApplication> findAllByOrderBySubmittedAtDesc();
}

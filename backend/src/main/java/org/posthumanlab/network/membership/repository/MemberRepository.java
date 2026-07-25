package org.posthumanlab.network.membership.repository;

import org.posthumanlab.network.membership.entity.Member;
import org.posthumanlab.network.membership.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByGoogleSubjectId(String googleSubjectId);
    Optional<Member> findByEmail(String email);
    List<Member> findByStatusOrderByJoinedAtDesc(MemberStatus status);
    List<Member> findAllByOrderByJoinedAtDesc();
}

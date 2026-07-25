package org.posthumanlab.network.membership.repository;

import org.posthumanlab.network.membership.entity.MemberAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberAccountRepository extends JpaRepository<MemberAccount, Long> {
    Optional<MemberAccount> findByEmail(String email);
    boolean existsByEmail(String email);
}

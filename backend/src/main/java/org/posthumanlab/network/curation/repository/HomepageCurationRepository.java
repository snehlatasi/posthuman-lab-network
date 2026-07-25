package org.posthumanlab.network.curation.repository;

import org.posthumanlab.network.curation.entity.HomepageCuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomepageCurationRepository extends JpaRepository<HomepageCuration, Long> {
}

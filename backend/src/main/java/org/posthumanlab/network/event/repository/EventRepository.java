package org.posthumanlab.network.event.repository;

import org.posthumanlab.network.event.entity.Event;
import org.posthumanlab.network.event.entity.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findBySlug(String slug);
    List<Event> findByStatusOrderByStartDateTimeAsc(EventStatus status);
}

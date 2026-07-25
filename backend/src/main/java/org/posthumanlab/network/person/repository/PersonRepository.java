package org.posthumanlab.network.person.repository;

import org.posthumanlab.network.person.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findBySlug(String slug);
    List<Person> findByFeaturedTrueOrderByCreatedAtDesc();
    List<Person> findAllByOrderByCreatedAtDesc();
}

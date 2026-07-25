package org.posthumanlab.network.person.controller;

import org.posthumanlab.network.person.entity.Person;
import org.posthumanlab.network.person.repository.PersonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/people")
public class PersonController {

    private final PersonRepository personRepository;

    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping
    public ResponseEntity<List<Person>> getAllPeople() {
        return ResponseEntity.ok(personRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Person>> getFeaturedPeople() {
        return ResponseEntity.ok(personRepository.findByFeaturedTrueOrderByCreatedAtDesc());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Person> getPersonBySlug(@PathVariable("slug") String slug) {
        return personRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

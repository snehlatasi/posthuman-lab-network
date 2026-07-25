package org.posthumanlab.network.person.controller;

import org.posthumanlab.network.person.entity.Person;
import org.posthumanlab.network.person.repository.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/people")
public class AdminPersonController {

    private final PersonRepository personRepository;

    public AdminPersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping
    public ResponseEntity<List<Person>> getAllPeopleAdmin() {
        return ResponseEntity.ok(personRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        if (person.getSlug() == null || person.getSlug().isBlank()) {
            person.setSlug(person.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-+|-+$", ""));
        }
        Person saved = personRepository.save(person);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable("id") Long id, @RequestBody Person person) {
        person.setId(id);
        Person updated = personRepository.save(person);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable("id") Long id) {
        personRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

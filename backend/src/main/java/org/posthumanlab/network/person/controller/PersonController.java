package org.posthumanlab.network.person.controller;

import org.posthumanlab.network.person.entity.Person;
import org.posthumanlab.network.person.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/people")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public ResponseEntity<List<Person>> getAllPeople() {
        return ResponseEntity.ok(personService.getAll());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Person>> getFeaturedPeople() {
        return ResponseEntity.ok(personService.getFeatured());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<Person> getPersonBySlug(@PathVariable("slug") String slug) {
        return personService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

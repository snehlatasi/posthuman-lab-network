package org.posthumanlab.network.person.service;

import org.posthumanlab.network.common.util.SlugUtils;
import org.posthumanlab.network.person.entity.Person;
import org.posthumanlab.network.person.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getAll() {
        return personRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Person> getFeatured() {
        return personRepository.findByFeaturedTrueOrderByCreatedAtDesc();
    }

    public Optional<Person> getBySlug(String slug) {
        return personRepository.findBySlug(slug);
    }

    public Person create(Person person) {
        normalizeSlug(person);
        return personRepository.save(person);
    }

    public Optional<Person> update(Long id, Person request) {
        return personRepository.findById(id).map(existing -> {
            existing.setName(request.getName());
            existing.setSlug(SlugUtils.resolve(request.getSlug(), request.getName()));
            existing.setRole(request.getRole());
            existing.setAffiliation(request.getAffiliation());
            existing.setShortBio(request.getShortBio());
            existing.setFullBio(request.getFullBio());
            existing.setPortraitUrl(request.getPortraitUrl());
            existing.setWebsite(request.getWebsite());
            existing.setOrcid(request.getOrcid());
            existing.setFeatured(request.isFeatured());
            return personRepository.save(existing);
        });
    }

    public void delete(Long id) {
        personRepository.deleteById(id);
    }

    private void normalizeSlug(Person person) {
        person.setSlug(SlugUtils.resolve(person.getSlug(), person.getName()));
    }
}

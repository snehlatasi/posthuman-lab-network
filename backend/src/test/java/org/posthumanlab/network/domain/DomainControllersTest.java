package org.posthumanlab.network.domain;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.posthumanlab.network.contact.dto.ContactRequest;
import org.posthumanlab.network.event.entity.Event;
import org.posthumanlab.network.event.entity.EventStatus;
import org.posthumanlab.network.event.repository.EventRepository;
import org.posthumanlab.network.membership.dto.MembershipInterestRequest;
import org.posthumanlab.network.newsletter.repository.NewsletterSubscriberRepository;
import org.posthumanlab.network.publication.entity.Publication;
import org.posthumanlab.network.publication.entity.PublicationStatus;
import org.posthumanlab.network.publication.entity.PublicationType;
import org.posthumanlab.network.publication.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "app.member-auth.expose-otp=true")
@AutoConfigureMockMvc
@Transactional
public class DomainControllersTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private NewsletterSubscriberRepository newsletterSubscriberRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        eventRepository.deleteAll();
        publicationRepository.deleteAll();
        newsletterSubscriberRepository.deleteAll();
    }

    // ----------------------------------------------------
    // EVENTS TESTS
    // ----------------------------------------------------
    @Test
    public void testEventsWorkflow() throws Exception {
        // Seed and save an upcoming event
        Event e1 = new Event();
        e1.setTitle("Woodland Telemetry");
        e1.setSlug("woodland-telemetry");
        e1.setDescription("Testing bio-sensor schemas");
        e1.setEventType("Workshop");
        e1.setStartDateTime(LocalDateTime.now().plusDays(2));
        e1.setEndDateTime(LocalDateTime.now().plusDays(2).plusHours(2));
        e1.setLocation("Black Forest");
        e1.setOnline(false);
        e1.setStatus(EventStatus.UPCOMING);
        eventRepository.save(e1);

        // Seed and save a draft event (which shouldn't appear in upcoming)
        Event e2 = new Event();
        e2.setTitle("Draft Seminar");
        e2.setSlug("draft-seminar");
        e2.setEventType("Lecture");
        e2.setStartDateTime(LocalDateTime.now().plusDays(10));
        e2.setEndDateTime(LocalDateTime.now().plusDays(10).plusHours(1));
        e2.setStatus(EventStatus.DRAFT);
        eventRepository.save(e2);

        // 1. GET all events
        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));

        // 2. GET upcoming events only (should return 1)
        mockMvc.perform(get("/api/events/upcoming"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].slug", is("woodland-telemetry")));

        // 3. GET event by slug
        mockMvc.perform(get("/api/events/slug/woodland-telemetry"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Woodland Telemetry")));

        // 4. GET event not found
        mockMvc.perform(get("/api/events/slug/nonexistent-event"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error", is("Not Found")));
    }

    // ----------------------------------------------------
    // PUBLICATIONS TESTS
    // ----------------------------------------------------
    @Test
    public void testPublicationsWorkflow() throws Exception {
        // Seed published article
        Publication p1 = new Publication();
        p1.setTitle("Agential Realism Intro");
        p1.setSlug("agential-realism-intro");
        p1.setSummary("An intro guide");
        p1.setContent("Deep research detail...");
        p1.setAuthorDisplayName("Elena Rostova");
        p1.setPublicationType(PublicationType.ARTICLE);
        p1.setPublishedAt(LocalDateTime.now());
        p1.setStatus(PublicationStatus.PUBLISHED);
        publicationRepository.save(p1);

        // Seed draft essay
        Publication p2 = new Publication();
        p2.setTitle("Speculative Lichens");
        p2.setSlug("speculative-lichens");
        p2.setAuthorDisplayName("Marcus Vance");
        p2.setPublicationType(PublicationType.ESSAY);
        p2.setStatus(PublicationStatus.DRAFT);
        publicationRepository.save(p2);

        // 1. GET all published (should only return published p1)
        mockMvc.perform(get("/api/publications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].slug", is("agential-realism-intro")));

        // 2. GET publications filtered by type (should be empty for ESSAY since p2 is DRAFT)
        mockMvc.perform(get("/api/publications?type=ESSAY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        // 3. GET publication not found
        mockMvc.perform(get("/api/publications/slug/speculative-lichens"))
                .andExpect(status().isNotFound());
    }

    // ----------------------------------------------------
    // CONTACT MESSAGE TESTS
    // ----------------------------------------------------
    @Test
    public void testContactSubmission() throws Exception {
        ContactRequest req = new ContactRequest();
        req.setName("Dr. Anya Chen");
        req.setEmail("anya@posthuman.net");
        req.setSubject("Research Venture proposal");
        req.setMessage("Proposal details mapping sensor arrays.");

        // Valid Submission
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.status", is("NEW")));

        // Invalid Email Validation
        req.setEmail("invalid-email-address");
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", containsString("Validation")));

        // Missing Required Fields
        req.setEmail("anya@posthuman.net");
        req.setName(""); // Blank name
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    // ----------------------------------------------------
    // MEMBERSHIP INTEREST TESTS
    // ----------------------------------------------------
    @Test
    public void testMembershipInterestSubmission() throws Exception {
        MembershipInterestRequest req = new MembershipInterestRequest();
        req.setName("Marcus Vance");
        req.setEmail("marcus@lichen.org");
        req.setAreaOfInterest("creative");
        req.setMessage("I want to build Lichen synth nodes.");

        // Valid Interest Submission
        mockMvc.perform(post("/api/membership/interests")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.areaOfInterest", is("creative")));

        // Invalid Input (Blank Area)
        req.setAreaOfInterest("");
        mockMvc.perform(post("/api/membership/interests")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testNewsletterSubscriptionWorkflow() throws Exception {
        String subscribePayload = """
                {
                  "name": "Asha Reader",
                  "email": "ASHA@example.com",
                  "interests": "all-updates",
                  "termsAccepted": true,
                  "source": "footer"
                }
                """;

        mockMvc.perform(post("/api/newsletter/subscribe")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(subscribePayload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email", is("asha@example.com")))
                .andExpect(jsonPath("$.status", is("ACTIVE")));

        String updatedPayload = """
                {
                  "name": "Asha Updated",
                  "email": "asha@example.com",
                  "interests": "events-media",
                  "termsAccepted": true,
                  "source": "footer"
                }
                """;

        mockMvc.perform(post("/api/newsletter/subscribe")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedPayload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status", is("ACTIVE")));

        org.assertj.core.api.Assertions.assertThat(newsletterSubscriberRepository.count()).isEqualTo(1);

        mockMvc.perform(get("/api/newsletter/subscribers"))
                .andExpect(status().isForbidden());

        mockMvc.perform(post("/api/newsletter/subscribe")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "No Terms",
                                  "email": "no-terms@example.com",
                                  "termsAccepted": false
                                }
                                """))
                .andExpect(status().isBadRequest());

        String token = newsletterSubscriberRepository.findByEmailIgnoreCase("asha@example.com")
                .orElseThrow()
                .getUnsubscribeToken();

        mockMvc.perform(post("/api/newsletter/unsubscribe/{token}", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("UNSUBSCRIBED")));
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void testAdminCanListNewsletterSubscribers() throws Exception {
        mockMvc.perform(post("/api/newsletter/subscribe")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Editorial Reader",
                                  "email": "reader@example.com",
                                  "termsAccepted": true
                                }
                                """))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/newsletter/subscribers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].email", is("reader@example.com")))
                .andExpect(jsonPath("$[0].status", is("ACTIVE")));
    }

    @Test
    public void testMemberSignupOtpAndApplicationSubmission() throws Exception {
        String signupPayload = """
                {
                  "fullName": "Priya Sen",
                  "email": "priya@example.com",
                  "password": "MemberPass123!"
                }
                """;

        String challengeJson = mockMvc.perform(post("/api/members/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(signupPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", is("priya@example.com")))
                .andExpect(jsonPath("$.devOtp", matchesPattern("\\d{6}")))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode challenge = objectMapper.readTree(challengeJson);
        String otp = challenge.get("devOtp").asText();

        String verifyPayload = """
                {
                  "email": "priya@example.com",
                  "otp": "%s"
                }
                """.formatted(otp);

        String authJson = mockMvc.perform(post("/api/members/auth/verify-otp")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(verifyPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("NOT_APPLIED")))
                .andExpect(jsonPath("$.accountSubjectId", startsWith("member-account-")))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode auth = objectMapper.readTree(authJson);
        String accountSubjectId = auth.get("accountSubjectId").asText();

        String applicationPayload = """
                {
                  "googleSubjectId": "%s",
                  "email": "priya@example.com",
                  "fullName": "Priya Sen",
                  "role": "Researcher",
                  "country": "India",
                  "areasOfInterest": "technology ethics"
                }
                """.formatted(accountSubjectId);

        mockMvc.perform(post("/api/members/apply")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(applicationPayload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email", is("priya@example.com")))
                .andExpect(jsonPath("$.status", is("PENDING")));
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void testAdminCanDeactivateWronglyApprovedMember() throws Exception {
        String signupPayload = """
                {
                  "fullName": "Wrong Approval",
                  "email": "wrong-approval@example.com",
                  "password": "MemberPass123!"
                }
                """;

        String challengeJson = mockMvc.perform(post("/api/members/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(signupPayload))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String otp = objectMapper.readTree(challengeJson).get("devOtp").asText();
        String verifyPayload = """
                {
                  "email": "wrong-approval@example.com",
                  "otp": "%s"
                }
                """.formatted(otp);

        String authJson = mockMvc.perform(post("/api/members/auth/verify-otp")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(verifyPayload))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String accountSubjectId = objectMapper.readTree(authJson).get("accountSubjectId").asText();
        String applicationPayload = """
                {
                  "googleSubjectId": "%s",
                  "email": "wrong-approval@example.com",
                  "fullName": "Wrong Approval",
                  "areasOfInterest": "review correction"
                }
                """.formatted(accountSubjectId);

        String applicationJson = mockMvc.perform(post("/api/members/apply")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(applicationPayload))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        long applicationId = objectMapper.readTree(applicationJson).get("id").asLong();
        mockMvc.perform(put("/api/admin/members/applications/{id}/approve", applicationId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("APPROVED")));

        String membersJson = mockMvc.perform(get("/api/admin/members/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status", is("ACTIVE")))
                .andReturn()
                .getResponse()
                .getContentAsString();

        long memberId = objectMapper.readTree(membersJson).get(0).get("id").asLong();
        mockMvc.perform(put("/api/admin/members/list/{id}/deactivate", memberId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("SUSPENDED")));

        mockMvc.perform(get("/api/members/directory"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void testMemberApplicationRequiresVerifiedAccount() throws Exception {
        String applicationPayload = """
                {
                  "googleSubjectId": "member-account-9999",
                  "email": "intruder@example.com",
                  "fullName": "Intruder",
                  "areasOfInterest": "unauthorized access"
                }
                """;

        mockMvc.perform(post("/api/members/apply")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(applicationPayload))
                .andExpect(status().isUnauthorized());
    }

    // ----------------------------------------------------
    // BLOG POST TESTS
    // ----------------------------------------------------
    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void testBlogWorkflow() throws Exception {
        // 1. GET all published blog posts (should return empty list initially)
        mockMvc.perform(get("/api/blog"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        // 2. Create a new blog post
        org.posthumanlab.network.blog.dto.BlogPostDto req = new org.posthumanlab.network.blog.dto.BlogPostDto();
        req.setTitle("Speculative Soil Mapping");
        req.setSlug("speculative-soil-mapping");
        req.setExcerpt("Forest bio-telemetry research");
        req.setContent("Detailed exploration of bio-telemetry...");
        req.setAuthor("Dr. Anya Chen");

        mockMvc.perform(post("/api/blog")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.slug", is("speculative-soil-mapping")));

        // 3. GET published posts (should return 1)
        mockMvc.perform(get("/api/blog"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("Speculative Soil Mapping")));

        // 4. GET post by slug
        mockMvc.perform(get("/api/blog/speculative-soil-mapping"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.author", is("Dr. Anya Chen")));
    }

    // ----------------------------------------------------
    // COLLABORATION REQUEST TESTS
    // ----------------------------------------------------
    @Test
    public void testCollaborationSubmission() throws Exception {
        org.posthumanlab.network.collaboration.dto.CollaborationRequestDto req = new org.posthumanlab.network.collaboration.dto.CollaborationRequestDto();
        req.setName("Elena Rostova");
        req.setEmail("elena@posthuman.org");
        req.setOrganization("Ecological Futures Lab");
        req.setCollaborationType("Research Project");
        req.setMessage("Proposal for transdisciplinary research collaboration.");

        mockMvc.perform(post("/api/collaboration")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.status", is("NEW")));
    }
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Homepage Sections
import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { VisionSection } from "@/components/home/VisionSection";
import { ConversationsSection } from "@/components/home/ConversationsSection";
import { LabsSection } from "@/components/home/LabsSection";
import { Virtual360LabViewer } from "@/components/home/Virtual360LabViewer";
import { FeaturedLectureSection } from "@/components/home/FeaturedLectureSection";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { LearningHubSection } from "@/components/home/LearningHubSection";
import { PublicationsSection } from "@/components/home/PublicationsSection";
import { GlobalVoicesSection } from "@/components/home/GlobalVoicesSection";
import { JoinNetworkSection } from "@/components/home/JoinNetworkSection";
import { SupportSection } from "@/components/home/SupportSection";

export default function HomePage() {
  return (
    <>
      {/* Sticky Global Navigation */}
      <Header />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* 1. Immersive Interactive Node-Network Hero */}
        <HeroSection />

        {/* 2. Who We Are Section */}
        <ManifestoSection />

        {/* 3. Our Pillars Section */}
        <VisionSection />

        {/* 4. Interactive Conversation Themes */}
        <ConversationsSection />

        {/* 5. Exploration Research Cards */}
        <LabsSection />

        {/* 5.5 Interactive 360 Virtual Lab Tour */}
        <Virtual360LabViewer />

        {/* 6. Cinematic Video Placeholder Lecture */}
        <FeaturedLectureSection />

        {/* 7. Cultural Agenda Schedule Meetings */}
        <UpcomingEventsSection />

        {/* 8. Open Access Learning pathways */}
        <LearningHubSection />

        {/* 9. High-Contrast Publications index */}
        <PublicationsSection />

        {/* 10. Digital-Grid Chapter chapters map */}
        <GlobalVoicesSection />

        {/* 11. Immersive CTA Registration Banner */}
        <JoinNetworkSection />

        {/* 12. Supporting Ethics Callout */}
        <SupportSection />
      </main>

      {/* Reusable Footer Component */}
      <Footer />
    </>
  );
}

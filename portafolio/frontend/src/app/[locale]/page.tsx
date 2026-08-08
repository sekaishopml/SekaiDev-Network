"use client";

import { useBonsaiLoad } from "@/hooks/useBonsaiLoad";
import dynamic from "next/dynamic";
import LoadingController from "@/components/loading/LoadingController";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import LookSection from "@/components/LookSection";
import OfferSection from "@/components/OfferSection";
import FeaturedCase from "@/components/FeaturedCase";
import MethodSection from "@/components/MethodSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
  loading: () => (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-background"
      aria-label="SekaiDev introduction"
      aria-busy="true"
    />
  ),
});

/**
 * Conversion funnel:
 * Hero → Look → Offer+capabilities (01) → Featured (02) → Method (03)
 * → Pricing (04) → Contact → About → FAQ (05).
 */
export default function Home() {
  const { loaded, setBonsaiLoaded, progress } = useBonsaiLoad();

  return (
    <>
      <LoadingController loaded={loaded} progress={progress} />
      <Navigation />
      <StickyCta />
      <SmoothScroll>
        <main className="relative">
          <HeroSection
            loaded={loaded}
            onBonsaiLoaded={() => setBonsaiLoaded(true)}
          />
          <LookSection />
          <OfferSection />
          <FeaturedCase />
          <MethodSection />
          <PricingSection />
          <Contact />
          <About />
          <FaqSection />
          <div className="bg-background">
            <Footer />
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}

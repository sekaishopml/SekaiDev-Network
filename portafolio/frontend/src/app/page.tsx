"use client";

import { useBonsaiLoad } from "@/hooks/useBonsaiLoad";
import dynamic from "next/dynamic";
import LoadingController from "@/components/loading/LoadingController";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import LookSection from "@/components/LookSection";
import OfferSection from "@/components/OfferSection";
import FeaturedCase from "@/components/FeaturedCase";
import ProofBand from "@/components/ProofBand";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Process from "@/components/Process";
import About from "@/components/About";
import Works from "@/components/Works";
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
 * Funnel (Phase A):
 * Hero → Look (craft / bonsai handoff) → Offer → Featured → Proof → Process
 * → Pricing → FAQ → Contact (early) → Works → About.
 * Services merged into Offer — removed as duplicate.
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
          <ProofBand />
          <Process />
          <PricingSection />
          <FaqSection />
          <Contact />
          <Works />
          <About />
          <div className="bg-background">
            <Footer />
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}

"use client";

import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { SoundProvider } from "@/components/providers/SoundProvider";
import { ModelLoadProvider } from "@/components/providers/ModelLoadProvider";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { Hero } from "@/components/sections/Hero";
import { HardwareFeatures } from "@/components/sections/HardwareFeatures";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { Timeline } from "@/components/sections/Timeline";
import { Specs } from "@/components/sections/Specs";
import { ExplodedSection } from "@/components/sections/ExplodedSection";
import { Community } from "@/components/sections/Community";
import { CTA } from "@/components/sections/CTA";

export function HomePage() {
  return (
    <ModelLoadProvider>
      <SoundProvider>
        <SmoothScrollProvider>
          <LoadingScreen />
          <CursorGlow />
          <AmbientBackground />
          <Navbar />
          <main>
            <Hero />
            <HardwareFeatures />
            <FeatureCards />
            <Timeline />
            <Specs />
            <ExplodedSection />
            <Community />
            <CTA />
          </main>
          <Footer />
        </SmoothScrollProvider>
      </SoundProvider>
    </ModelLoadProvider>
  );
}

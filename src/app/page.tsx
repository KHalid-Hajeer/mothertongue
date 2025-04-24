// src/app/page.tsx (No Initial Pins)
"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { GlobeMethods } from "react-globe.gl";
import {
  TestTubes,
  Users,
  Film,
  Gamepad2,
  MessageCircle,
  BarChart3,
  CheckCircle,
} from "lucide-react";

// --- Helper: Basic Country to Coords Lookup ---
const countryCoords: { [key: string]: { lat: number; lng: number } } = {
  usa: { lat: 39.8, lng: -98.5 },
  canada: { lat: 56.1, lng: -106.3 },
  mexico: { lat: 23.6, lng: -102.5 },
  uk: { lat: 55.3, lng: -3.4 },
  france: { lat: 46.2, lng: 2.2 },
  germany: { lat: 51.1, lng: 10.4 },
  spain: { lat: 40.4, lng: -3.7 },
  italy: { lat: 41.8, lng: 12.5 },
  japan: { lat: 36.2, lng: 138.2 },
  australia: { lat: -25.2, lng: 133.7 },
  brazil: { lat: -14.2, lng: -51.9 },
  india: { lat: 20.5, lng: 78.9 },
};

function getCoordsForCountry(countryName: string): { lat: number; lng: number } {
  const lookupName = countryName.toLowerCase().trim();
  return countryCoords[lookupName] || { lat: Math.random() * 60 - 30, lng: Math.random() * 180 - 90 };
}

// --- Dynamically import the Globe component ---
const DynamicGlobe = dynamic(
  () => import('react-globe.gl'),
  {
    ssr: false,
    loading: () => <div className="w-full h-[75vh] flex items-center justify-center bg-gray-200/50"><p className="text-gray-500">Loading Globe...</p></div>
  }
);

// --- Types ---
type Pin = { lat: number; lng: number; size: number; color: string; label?: string; };
type Feature = { title: string; desc: string; icon: React.ReactNode; };

// --- Component ---
export default function LandingPage() {
  // --- State ---
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pins, setPins] = useState<Pin[]>([]); // Starts empty

  // --- Refs ---
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const globeSectionRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---
  // (handleSubmit remains the same as the previous version)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !country || !language) {
        setSubmitError("Please fill in all required fields.");
        setTimeout(() => setSubmitError(null), 3000);
        return;
    }
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);
    console.log("Waitlist Entry:", { email, country, language });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Successfully submitted to waitlist!");
      const { lat, lng } = getCoordsForCountry(country);
      console.log(`Approx coords for ${country}: lat=${lat}, lng=${lng}`);
      const newPin: Pin = {
          lat, lng, size: 0.6, color: "#FF5C5C", label: `Signup from ${country}!`
      };
      setPins((prev) => [...prev, newPin]);
      globeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (globeEl.current) {
        globeEl.current.pointOfView({ lat: newPin.lat, lng: newPin.lng, altitude: 1.5 }, 1500);
      }
      setEmail(""); setCountry(""); setLanguage("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError("Submission failed. Please try again.");
      setTimeout(() => setSubmitError(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Effects ---
  useEffect(() => {
    // Initial globe setup
    const timerId = setTimeout(() => {
        if (globeEl.current) {
            const controls = globeEl.current.controls();
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableRotate = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.4;
            globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 2000);
        }
    }, 100);

    // --- REMOVED INITIAL PINS GENERATION ---
    // const initialPins: Pin[] = Array.from({ length: 15 }).map(() => ({ ... }));
    // setPins(initialPins);
    // --- END REMOVAL ---

    return () => clearTimeout(timerId);
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Data ---
   const features: Feature[] = [
     { title: "Adaptive Test", desc: "Smart placement using ELO and IRT-style scaling.", icon: <TestTubes className="w-6 h-6 text-[#2E5A60] mb-2" /> },
     { title: "Pod System", desc: "Weekly group rotations based on your level.", icon: <Users className="w-6 h-6 text-[#2E5A60] mb-2" /> },
     { title: "Immersive Media", desc: "Curated texts and YouTube playlists that spark real learning.", icon: <Film className="w-6 h-6 text-[#2E5A60] mb-2" /> },
     { title: "Gamified Challenges", desc: "Daily writing prompts, peer-reviewed scoring, and rewards.", icon: <Gamepad2 className="w-6 h-6 text-[#2E5A60] mb-2" /> },
     { title: "Live Chat", desc: "Simple group chats to practice, connect, and stay consistent.", icon: <MessageCircle className="w-6 h-6 text-[#2E5A60] mb-2" /> },
     { title: "Track Your Growth", desc: "Progress bars, ELO trends, and personalized insights.", icon: <BarChart3 className="w-6 h-6 text-[#2E5A60] mb-2" /> },
   ];

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E6] via-[#C6E2DD] to-[#B0D1D4] text-gray-900 flex flex-col items-center px-4">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full text-center max-w-3xl pt-20 md:pt-24 z-10"
      >
          {/* ... h1, p, form ... */}
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-[#1F3C42]">mothertongue</h1>
          <p className="text-xl mb-6 font-light italic text-[#2E5A60]">"Not just learn. Live the language."</p>
          <p className="mb-8 text-lg text-[#385C61]">Join the immersive platform for real-world fluency. Start with French, English, Spanish, or Italian.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center w-full max-w-md mx-auto">
              <Input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-400 bg-white/90 text-black placeholder:text-gray-500 focus:ring-1 focus:ring-[#2E5A60] focus:border-[#2E5A60] backdrop-blur-sm" aria-label="Email Address"/>
              <Input type="text" required placeholder="Which country are you from?" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-400 bg-white/90 text-black placeholder:text-gray-500 focus:ring-1 focus:ring-[#2E5A60] focus:border-[#2E5A60] backdrop-blur-sm" aria-label="Country"/>
              <Input type="text" required placeholder="What language(s) do you want to learn?" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-gray-400 bg-white/90 text-black placeholder:text-gray-500 focus:ring-1 focus:ring-[#2E5A60] focus:border-[#2E5A60] backdrop-blur-sm" aria-label="Target Language"/>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#2E5A60] text-white hover:bg-[#24484D] focus:ring-2 focus:ring-offset-2 focus:ring-[#2E5A60] disabled:opacity-60 transition-opacity">
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
              <div className="h-6 mt-1 text-center">
                  {submitSuccess && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-700 font-medium flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4"/> Success! Thanks for joining.</motion.div>)}
                  {submitError && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 font-medium">{submitError}</motion.div>)}
              </div>
          </form>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-20 mb-16 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 z-10"
      >
         {/* ... features.map ... */}
         {features.map(({ title, desc, icon }) => (
             <Card key={title} className="bg-white shadow-lg border border-gray-200/50 rounded-2xl transition-transform hover:scale-[1.02]">
                 <CardContent className="p-6">
                     <div className="flex flex-col items-start">{icon}<h3 className="text-xl font-semibold mb-2 text-[#1F3C42]">{title}</h3><p className="text-sm text-gray-700">{desc}</p></div>
                 </CardContent>
             </Card>
         ))}
      </motion.div>

      {/* === Globe Section === */}
      <div ref={globeSectionRef} className="w-full h-[75vh] mt-16 mb-10 z-0 relative cursor-grab">
        <DynamicGlobe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={pins} // Will be empty initially, populated on submit
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.01}
          pointRadius="size"
          pointsMerge={true}
          pointsTransitionDuration={500}
          pointLabel="label"
          width={typeof window !== 'undefined' ? window.innerWidth : undefined}
          height={typeof window !== 'undefined' ? window.innerHeight * 0.75 : undefined}
        />
      </div>

       {/* Footer */}
       <footer className="w-full text-center p-6 text-gray-600 text-xs mt-auto z-10">
         © {new Date().getFullYear()} MotherTongue. All rights reserved.
      </footer>
    </div>
  );
}
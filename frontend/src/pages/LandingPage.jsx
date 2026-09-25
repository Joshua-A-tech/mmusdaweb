import React from "react";
import Hero from "../components/hero/Hero";
import Welcome from "../components/welcome/Welcome";
import MissionBanner from "../components/mission/MissionBanner";
import SabbathProgramme from "../components/programme/SabbathProgramme";
import PhotoBanner from "../components/photobanner/PhotoBanner";
import MinistriesShowcase from "../components/ministries/MinistriesShowcase";
import StatsBar from "../components/stats/StatsBar";
import MusicShowcase from "../components/music/MusicShowcase";
import Sermons from "../components/sermons/Sermons";
import PrayerRequest from "../components/prayerRequest/PrayerRequest";
import Contact from "../components/contact/Contact";

function LandingPage() {
  return (
    <div className="landing-page-content">
      <Hero />
      <Welcome />
      <MissionBanner />
      <SabbathProgramme />
      <PhotoBanner />
      <MinistriesShowcase />
      <StatsBar />
      <MusicShowcase />
      <Sermons />
      <PrayerRequest />
      <Contact />
    </div>
  );
}

export default LandingPage;

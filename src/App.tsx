/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Artists } from './components/Artists';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { Packages } from './components/Packages';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { InstagramGrid } from './components/InstagramGrid';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('');
  const [selectedArtistForModal, setSelectedArtistForModal] = useState<string>('');

  const handleOpenBooking = (service?: string, artist?: string) => {
    if (service) setSelectedServiceForModal(service);
    if (artist) setSelectedArtistForModal(artist);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedServiceForModal('');
    setSelectedArtistForModal('');
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#fbf8f3] relative selection:bg-[#d4af37]/30 selection:text-white">
      {/* Luxury Loading Screen with percentage loader */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Luxury Magnetic Cursor */}
      <CustomCursor />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Area */}
      <main>
        {/* Fullscreen Cinematic Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Editorial About Section with Animated Counters */}
        <About />

        {/* 12 Luxury Services Cards */}
        <Services onBookService={(serviceName) => handleOpenBooking(serviceName)} />

        {/* Master Beauty Artists Carousel & Profiles */}
        <Artists onBookWithArtist={(artistName) => handleOpenBooking(undefined, artistName)} />

        {/* Draggable Before & After Comparison Slider */}
        <BeforeAfterSlider onBookService={(serviceName) => handleOpenBooking(serviceName)} />

        {/* Premium Packages with 3D Hover & Feature Matrix */}
        <Packages onBookPackage={(packageName) => handleOpenBooking(packageName)} />

        {/* Cinematic Masonry Gallery & Lightbox */}
        <Gallery />

        {/* Client Reviews Carousel */}
        <Reviews />

        {/* Follow The Glow Instagram Feed */}
        <InstagramGrid />

        {/* Dedicated Appointment Booking Section */}
        <BookingSection />

        {/* Contact, Concierge WhatsApp & Dark Luxury Map */}
        <ContactSection />
      </main>

      {/* Luxury Dark Footer */}
      <Footer />

      {/* Quick Booking Modal from cards */}
      <BookingModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        presetService={selectedServiceForModal}
        presetArtist={selectedArtistForModal}
      />
    </div>
  );
}

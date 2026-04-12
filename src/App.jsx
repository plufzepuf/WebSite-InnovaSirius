import React from 'react';
import Hero from './components/HeroSection';
import Problems from './components/Problems';
import Possible from './components/Possible';
import Monitoring from './components/Monitoring';
import Principle from './components/Principle';
import Benefits from './components/Benefits';
import Achievements from './components/Achievements';
import ContactForm from './components/ContactForm';
import Confidence from './components/Confidence';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OfflineScreen from './components/OfflineScreen';

import { useNetwork } from './hooks/useNetwork'; 

export default function App() {
  const isOnline = useNetwork();
  
  return (
      <div className="app-wrapper">
      {!isOnline && <OfflineScreen />}
      <Hero />
      <main>
        <Problems />
        <Possible />
        <Principle />
        <Monitoring />
        <Benefits />
        <Achievements />
        <ContactForm />
        <Confidence />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
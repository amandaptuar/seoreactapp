import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import Services from '../components/Services';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Reviews />
      <Services />
      <About />
      <HowItWorks />
      <FAQ />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;

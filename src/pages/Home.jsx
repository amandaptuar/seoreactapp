import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <HowItWorks />
      <Reviews />
      <Pricing />
      <Footer />
    </>
  );
};

export default Home;

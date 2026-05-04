import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';
import Stats from '../components/Stats';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Team />
      <Services />
      <Reviews />
      <FAQ />
      <Pricing />
      <Stats />
      <Footer />
    </>
  );
};

export default Home;

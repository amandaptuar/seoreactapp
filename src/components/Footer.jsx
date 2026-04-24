import React from 'react';
import limitlessLogo from '../assets/limitless-logo.webp';

const Footer = () => {
  return (
    <>
      <section className="gap no-top section-client">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="count-style">
                <h2 data-max="20"><sup>+</sup></h2>
                <h4>Elite Protocols Delivered</h4>
                <p>Executives, founders, and high performers are using Limitless to redefine their baseline.</p> 
              </div>
            </div>
            <div className="col-lg-6">
              <div className="count-style two">
                <h2 data-max="100"><sup>%</sup></h2>
                <h4>Science-Backed Execution</h4>
                <p>Every protocol is derived from clinical neurobiology and human performance research.</p> 
              </div>
            </div>
          </div>
        </div>
        <ul className="shaps-img"> 
          <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
          <li><img src="/assets/img/shaps-6.png" alt="img" /></li> 
        </ul>
      </section>
      <footer className="gap no-bottom text-white" style={{ backgroundImage: "url('/assets/img/footer_bg.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#18191d' }}>
        <div className="container">
          <div className="footer-try">
            <div>
              <h2 className="text-white">Ready to optimize your biology?</h2> 
              <p className="text-white">Start your Cognitive Audit today and receive your custom protocol.</p>
            </div>
              <a href="#pricing" className="button btn"><span><span>Start Audit</span></span></a> 
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="footer-logo">
                <img src={limitlessLogo} alt="img" style={{ maxWidth: '250px', maxHeight: '90px', objectFit: 'contain' }} />
                <p className="text-white">Limitless is a holistic cognitive performance system delivered directly to your phone. We eliminate the friction between data and execution.</p>
                <ul className="social-media">
                  <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="flaticon-twitter"></i></a></li>
                  <li><a href="#"><i className="flaticon-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="widget-title">
                <h3 className="text-white">Useful Links</h3>
                <ul>
                  <li><i className="fa-solid fa-angles-right"></i><a href="#about" className="text-white">The Problem</a></li>
                  <li><i className="fa-solid fa-angles-right"></i><a href="#services" className="text-white">The Process</a></li>
                  <li><i className="fa-solid fa-angles-right"></i><a href="#pillars" className="text-white">Pillars</a></li>
                  <li><i className="fa-solid fa-angles-right"></i><a href="#pricing" className="text-white">Pricing</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="widget-title">
                <h3 className="text-white">Contact Us</h3>
                <div className="get-in-touch">
                  <div><i className="flaticon-map-location"></i></div>
                  <div>
                    <span>Phone No:</span>
                    <h6><a href="callto:+1234567890" className="text-white">+1 234 567 890</a></h6>
                  </div>
                </div>
                <div className="get-in-touch">
                  <div><i className="flaticon-iphone"></i></div>
                  <div>
                    <span>Email Address:</span>
                    <h6><a href="mailto:info@limitlessworld.net" className="text-white">info@limitlessworld.net</a></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="all-rights d-flex justify-content-between align-items-center flex-wrap">
            <p className="text-white mb-0">Limitless Holistic Cognition © 2026. All Rights Reserved.</p>
            <ul className="social-media d-flex mb-0" style={{ gap: '15px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#" className="text-white" style={{ fontSize: '18px' }}><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="#" className="text-white" style={{ fontSize: '18px' }}><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="#" className="text-white" style={{ fontSize: '18px' }}><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#" className="text-white" style={{ fontSize: '18px' }}><i className="fa-brands fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
        <ul className="shaps-img">
          <li><img src="/assets/img/shaps-4.png" alt="img" /></li> 
          <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
          <li><img src="/assets/img/shaps-2.png" alt="img" /></li> 
        </ul>
      </footer>
    </>
  );
};

export default Footer;

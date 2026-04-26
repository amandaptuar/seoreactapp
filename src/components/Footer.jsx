import React from 'react';
import { Link } from 'react-router-dom';
import limitlessLogo from '../assets/limitless-logo.webp';

const Footer = () => {
  return (
    <>

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
                  <li><a href="https://www.facebook.com/limitlessworldnet" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="https://x.com/limitless1964" target="_blank" rel="noopener noreferrer"><i className="flaticon-twitter"></i></a></li>
                  <li><a href="#"><i className="flaticon-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="widget-title">
                <h3 className="text-white">Useful Links</h3>
                <ul>
                  <li><i className="fa-solid fa-angles-right"></i><a href="/#about" className="text-white">The Problem</a></li>
                  <li><i className="fa-solid fa-angles-right"></i><a href="/#services" className="text-white">The Process</a></li>
                  <li><i className="fa-solid fa-angles-right"></i><a href="/#pillars" className="text-white">Pillars</a></li>
                  <li><i className="fa-solid fa-angles-right"></i><a href="/#pricing" className="text-white">Pricing</a></li>
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
        </div>
        <ul className="shaps-img">
          <li><img src="/assets/img/shaps-4.png" alt="img" /></li> 
          <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
          <li><img src="/assets/img/shaps-2.png" alt="img" /></li> 
        </ul>
      </footer>
      <div className="bottom-bar" style={{ backgroundColor: '#0d0d0d', padding: '20px 0' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <p className="text-white mb-0" style={{ fontSize: '14px' }}>Limitless Holistic Cognition © 2026. All Rights Reserved.</p>
            <div className="d-flex align-items-center gap-3">
              <Link to="/privacy-policy" className="text-white" style={{ fontSize: '14px', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color='#ccc'} onMouseOut={(e) => e.target.style.color='#fff'}>Privacy Policy</Link>
              <span className="text-white" style={{ fontSize: '14px' }}>|</span>
              <Link to="/terms-conditions" className="text-white" style={{ fontSize: '14px', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color='#ccc'} onMouseOut={(e) => e.target.style.color='#fff'}>Terms of Condition</Link>
            </div>
            <ul className="social-media d-flex mb-0" style={{ gap: '15px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="https://www.facebook.com/limitlessworldnet" target="_blank" rel="noopener noreferrer" className="text-white" style={{ fontSize: '16px', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color='#ccc'} onMouseOut={(e) => e.target.style.color='#fff'}><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="https://x.com/limitless1964" target="_blank" rel="noopener noreferrer" className="text-white" style={{ fontSize: '16px', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color='#ccc'} onMouseOut={(e) => e.target.style.color='#fff'}><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="#" className="text-white" style={{ fontSize: '16px', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color='#ccc'} onMouseOut={(e) => e.target.style.color='#fff'}><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#" className="text-white" style={{ fontSize: '16px', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color='#ccc'} onMouseOut={(e) => e.target.style.color='#fff'}><i className="fa-brands fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

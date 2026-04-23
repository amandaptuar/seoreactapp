import React from 'react';

const FAQ = () => {
  return (
    <section id="pillars" className="gap accordion-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="heading two sec-title-animation animation-style2">
              <span className="title-animation">Pillars of Performance</span>
              <h2 className="title-animation">A Unified System for Human Performance</h2> 
            </div>
            <div className="accordion">
                <div className="accordion-item">
                    <a href="#" className="heading">
                        <div className="icon"></div>
                        <div className="title">Cognitive Mastery</div>
                    </a>
                    <div className="content">
                        <p>We train your brain to enter deep focus on command, eliminate brain fog, and sustain high output without burning out.</p>
                    </div>
                </div> 
                <div className="accordion-item active">
                    <a href="#" className="heading">
                        <div className="icon"></div>
                        <div className="title">Foundational Energy</div>
                    </a>
                    <div className="content" style={{ display: 'block' }}>
                        <p>Optimize your sleep architecture, align with your circadian rhythm, and properly fuel your body to ensure you have the energy required for elite execution.</p>
                    </div>
                </div>
                <div className="accordion-item">
                    <a href="#" className="heading">
                        <div className="icon"></div>
                        <div className="title">Resilience & Recovery</div>
                    </a>
                    <div className="content">
                        <p>Build the physiological and psychological capacity to handle high-stress environments and bounce back faster from setbacks.</p>
                    </div>
                </div>
              </div>
          </div>
          <div className="col-lg-4">
            <div className="accordion-contact">
              <h4>Phone No: <a href="callto:+1234567890">+1 234 567 890</a></h4>
              <h4>Email: <a href="mailto:info@limitlessworld.net">info@limitlessworld.net</a></h4>
              <a href="#pricing" className="button btn"><span><span>Get Started</span></span></a>
            </div>
            <div className="accordion-img">
              <img src="/assets/img/faq_bg.jpeg" alt="img" />
            </div>
          </div>
        </div>
      </div>
      <ul className="shaps-img">
        <li><img src="/assets/img/shaps-3.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default FAQ;

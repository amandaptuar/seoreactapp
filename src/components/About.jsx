import React from 'react';

const About = () => {
  return (
    <section id="about" className="gap">
      <div className="container">
        <div className="heading sec-title-animation animation-style2">
          <span className="title-animation">The Problem</span>
          <h2 className="title-animation">Your wearables are giving you data exhaust, not direction.</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="presenting two">
              <div>
                <i className="flaticon-maintenance"></i>
              </div>
              <div>
                <h3>Fragmented Systems</h3>
                <p>Your sleep data, your meditation app, your workout logs—they don't talk to each other. Limitless unifies your biology.</p>
              </div>
            </div>
            <div className="presenting">
              <div>
                <i className="flaticon-helpdesk"></i>
              </div>
              <div>
                <h3>Information Overload</h3>
                <p>Knowing your HRV dropped is useless without direction. We give you precise, actionable protocols, not just raw data.</p>
              </div>
            </div>
            <div className="presenting">
              <div>
                <i className="flaticon-cursor"></i>
              </div>
              <div>
                <h3>The App Trap</h3>
                <p className="mb-0">Managing your optimization stack shouldn't drain your mental energy. We eliminate friction with daily, SMS-based execution.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

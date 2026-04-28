import React from 'react';

const About = () => {
  return (
    <section id="about" className="gap">
      <div className="container">
        <div className="heading sec-title-animation animation-style2">
          <span className="title-animation">Assessment</span>
          <h2 className="title-animation">Cognitive Assessment for Adults USA</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="presenting two">
              <div>
                <i className="flaticon-maintenance"></i>
              </div>
              <div>
                <h3>Get Cognitive Health Report</h3>
                <p>Attention & Focus – concentration, distractions</p>
              </div>
            </div>
            <div className="presenting">
              <div>
                <i className="flaticon-helpdesk"></i>
              </div>
              <div>
                <h3>Online Report by AI Assessment</h3>
                <p>Executive Function – planning, decision-making, organization</p>
              </div>
            </div>
            <div className="presenting">
              <div>
                <i className="flaticon-cursor"></i>
              </div>
              <div>
                <h3>Relax & Go For Healthy Life</h3>
                <p className="mb-0">Go for Test Online to prove your health lifestyle with limitless</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

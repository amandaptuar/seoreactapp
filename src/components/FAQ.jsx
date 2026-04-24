import React from 'react';

const FAQ = () => {
  return (
    <section id="pillars" className="gap accordion-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="heading two sec-title-animation animation-style2">
              <span className="title-animation">Pillars of Performance</span>
              <h2 className="title-animation">Limitless Unified Specialised Assessment For Good Life</h2> 
            </div>
            <div className="accordion">
                <div className="accordion-item active">
                    <a href="#" className="heading">
                        <div className="icon"></div>
                        <div className="title">Mental Health Assessment</div>
                    </a>
                    <div className="content" style={{ display: 'block' }}>
                        <p>Understand your mind better with our science-based assessment. Identify stress, anxiety, mood patterns, and cognitive performance, and receive actionable recommendations tailored to your lifestyle.</p>
                    </div>
                </div> 
                <div className="accordion-item">
                    <a href="#" className="heading">
                        <div className="icon"></div>
                        <div className="title">Women’s Health Assessment</div>
                    </a>
                    <div className="content">
                        <p>Take control of your health with a science-based assessment that evaluates key areas such as hormonal health, nutrition, stress, sleep, and reproductive wellness—delivering tailored recommendations for a healthier life.</p>
                    </div>
                </div>
                <div className="accordion-item">
                    <a href="#" className="heading">
                        <div className="icon"></div>
                        <div className="title">Sexual Health Assessment</div>
                    </a>
                    <div className="content">
                        <p>Understand your sexual wellness with a private, judgment-free assessment. Evaluate key factors such as libido, performance, hormonal health, stress, and lifestyle—along with tailored recommendations for better health and confidence.</p>
                    </div>
                </div>
                <div className="accordion-item">
                    <a href="#" className="heading">
                        <div className="icon"></div>
                        <div className="title">Child Health Assessment</div>
                    </a>
                    <div className="content">
                        <p>Monitor your child’s health with a structured, science-based assessment. Evaluate key areas such as growth milestones, nutrition, sleep, immunity, and behavioral patterns—along with tailored recommendations for optimal development.</p>
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

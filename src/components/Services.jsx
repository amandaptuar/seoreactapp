import React from 'react';

const Services = () => {
  return (
    <section id="services" className="gap how-it-works" style={{ backgroundImage: "url('/assets/img/shaps-bg.png')" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="heading two sec-title-animation animation-style2">
              <span className="title-animation">The Process </span>
              <h2 className="title-animation">Start Assessment By One Go with Limitless</h2>
              <p>Limitless is your all-in-one digital wellness platform. Start with cognitive performance testing and access specialized services in mental health, women’s health, and sexual wellness</p>
            </div>
            <ul className="chek">
              <li><img src="/assets/img/chek.png" alt="img" /> Quick Assessment With Limitless</li>
              <li><img src="/assets/img/chek.png" alt="img" /> Questionnaire Segment For User</li>
              <li><img src="/assets/img/chek.png" alt="img" /> Quick Interaction focus and concentration</li>
              <li><img src="/assets/img/chek.png" alt="img" /> AI Report and Analyzing</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-6">
                <div className="how-do-stap">
                  <span>1</span>
                  <i className="fa-solid fa-brain" style={{ fontSize: '45px', marginBottom: '15px', color: '#14212b' }}></i>
                  <h4>Mental Health Assessment</h4>
                </div>
                <div className="how-do-stap two">
                  <span>2</span>
                  <i className="fa-solid fa-female" style={{ fontSize: '45px', marginBottom: '15px', color: '#fff' }}></i>
                  <h4>Woman Health Assessment</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="how-do-stap three">
                  <span>3</span>
                  <i className="fa-solid fa-venus-mars" style={{ fontSize: '45px', marginBottom: '15px', color: '#fff' }}></i>
                  <h4>Sexual Health Assessment</h4>
                </div>
                <div className="how-do-stap four" style={{ marginTop: '30px' }}>
                  <span>4</span>
                  <i className="fa-solid fa-child" style={{ fontSize: '45px', marginBottom: '15px', color: '#14212b' }}></i>
                  <h4>Kids Health Assessment</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

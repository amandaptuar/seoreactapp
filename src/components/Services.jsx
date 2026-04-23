import React from 'react';

const Services = () => {
  return (
    <section id="services" className="gap how-it-works" style={{ backgroundImage: "url('/assets/img/shaps-bg.png')" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="heading two sec-title-animation animation-style2">
              <span className="title-animation">The Process </span>
              <h2 className="title-animation">Elite Coaching, Zero Friction.</h2>
              <p>We've stripped away everything that slows you down. No more logging into five different dashboards. We manage the complexity, you execute the protocol.</p>
            </div>
            <ul className="chek">
              <li><img src="/assets/img/chek.png" alt="img" /> Clinical Assessment and Data Ingestion</li>
              <li><img src="/assets/img/chek.png" alt="img" /> Customized Execution Plan</li>
              <li><img src="/assets/img/chek.png" alt="img" /> Daily Text-Message Coaching Nudges</li>
              <li><img src="/assets/img/chek.png" alt="img" /> Continuous Expert Refinement</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-6">
                <div className="how-do-stap">
                  <span>1</span>
                  <i className="flaticon-mail"></i>
                  <h4>The Intake Audit (We analyze your biology)</h4>
                </div>
                <div className="how-do-stap two">
                  <span>2</span>
                  <i className="flaticon-team-building"></i>
                  <h4>The Protocol (We build your custom map)</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="how-do-stap three">
                  <span>3</span>
                  <i className="flaticon-security"></i>
                  <h4>Daily Delivery (You get simple daily texts)</h4>
                </div>
                <div className="video">
                  <img src="/assets/img/video_block.jpeg" alt="img" />
                  <a className="video-pop" data-fancybox="" href="https://www.youtube.com/watch?v=1La4QzGeaaQ"><i className="fa-solid fa-play"></i></a>
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

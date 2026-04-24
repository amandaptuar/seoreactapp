import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="hero-text sec-title-animation animation-style2">
              <span className="title-animation">Cognitive Performance System </span>
              <h2 className="title-animation">Your Health, Decoded Instantly</h2>
              <div className="d-flex listing">
                <p>Fast, accurate assessments for mental health, women’s wellness, sexual health, and more—powered by smart insights and personalized guidance.</p>
              </div>  
            </div>
            <div className="review">
              <a href="#pricing" className="button btn"><span><span>START YOUR COGNITIVE AUDIT</span></span></a>
            </div>
          </div>
          <div className="col-lg-5">
            <form role="form" className="get-a-quote" id="contact-form" method="post" onSubmit={(e) => { e.preventDefault(); window.location.href = 'https://limitlessworld.net'; }}>
              <img src="/assets/img/fom-img.png" alt="img" /> 
                <h3>Get Started Today</h3>
                <h6>Begin your $79 Cognitive Audit</h6> 
                <input type="text" name="Complete Name" placeholder="Complete Name" required /> 
                <input type="email" name="Email Address" placeholder="Email Address" required /> 
                <input type="number" name="Phone No" placeholder="Phone No" required />
                <button type="submit" className="button btn mt-3"><span><span>Start Assessment</span></span></button>
            </form> 
          </div>
        </div>
      </div>
      <ul className="shaps-img">
        <li><img src="/assets/img/shaps-4.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-4.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-2.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-3.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default Hero;

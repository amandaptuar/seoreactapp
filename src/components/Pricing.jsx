import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="gap no-top">
      <div className="container">
        <div className="heading sec-title-animation animation-style2">
          <span className="title-animation">Take the first step </span>
          <h2 className="title-animation">Baseline your biology. Take the Audit.</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="pricing">
              <div className="pricing-plans">
                <span>The Cognitive Audit</span>
                <h5>$79 <sub>/ one-time</sub></h5>
              </div>
              <div className="pricing-plans-text">
                <i className="flaticon-price-tag"></i>
                <p>A comprehensive assessment to baseline your focus, energy, and resilience.</p>
                   <ul className="chek">
                      <li><img src="/assets/img/chek.png" alt="img" /> Deep-dive clinical questionnaire </li>
                      <li><img src="/assets/img/chek.png" alt="img" /> Review of existing wearable data </li>
                      <li><img src="/assets/img/chek.png" alt="img" /> Identification of biological friction points </li>
                      <li><img src="/assets/img/chek.png" alt="img" /> Personalized baseline report</li>
                    </ul>
                    <a href="#" className="button btn"><span><span>Start Audit</span></span></a> 
              </div>
            </div>
          </div> 
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import React from 'react';

const Reviews = () => {
  return (
    <section className="gap clients-section">
      <div className="container">
        <div className="heading sec-title-animation animation-style2">
          <span className="title-animation">Client’s Reviews </span>
          <h2 className="title-animation">What our awesome clients say</h2>
        </div> 
      </div> 
      <div className="marquee-two">
        <div className="marquee-box-one">
          <div className="marquee-content-one"> 
           <div className="clients">
              <div className="clients-img">
                <img src="/assets/img/avatar_1.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>Luke Maccormick</h3>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                  </div>
                  <ul className="star">
                    <li><i className="fa-solid fa-star"></i></li>
                    <li><i className="fa-solid fa-star"></i></li>
                    <li><i className="fa-solid fa-star"></i></li>
                    <li><i className="fa-solid fa-star"></i></li>
                    <li><i className="fa-solid fa-star"></i></li>
                  </ul>
                </div>
              </div>
              <p>“This is one the most transparent referral programs I’ve ever used before. Besides, it’s double-sided and it lets me not only share a great service with my friends, but to earn and make them earn as well. I earned money by sharing referral link on Facebook.”</p>
           </div>
          </div>
        </div>
      </div>
      <ul className="shaps-img"> 
        <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-2.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default Reviews;

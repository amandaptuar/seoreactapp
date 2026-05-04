import React from 'react';

const Team = () => {
  return (
    <section id="team" className="gap team-section">
      <div className="container">
        <div className="heading sec-title-animation animation-style2">
          <span className="title-animation">Backed by Science</span>
          <h2 className="title-animation">Who Built This?</h2>
          <p>Our cognitive assessment system was developed by top experts in neuroscience, behavioral psychology, and high-performance coaching to bring you a trusted, science-backed tool.</p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="team">
              <figure>
                <img src="/assets/img/team_member_1.jpeg" alt="img" style={{ opacity: 0.8 }} />
              </figure>
              <span>Collaboration</span>
              <h4>Experts & Advisors</h4>
              <p style={{ marginTop: '15px', color: '#64748b', fontSize: '15px', lineHeight: 1.6 }}>Developed with clinical psychologists, neuroscientists, and performance coaches who understand the brain.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="team">
              <figure>
                <img src="/assets/img/team_member_2.jpeg" alt="img" style={{ opacity: 0.8 }} />
              </figure>
              <span>Analysis</span>
              <h4>Our Experience</h4>
              <p style={{ marginTop: '15px', color: '#64748b', fontSize: '15px', lineHeight: 1.6 }}>Years of analyzing behavioral patterns to create systems that optimize human performance and reduce burnout.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="team mb-0">
              <figure>
                <img src="/assets/img/team_member_3.jpeg" alt="img" style={{ opacity: 0.8 }} />
              </figure>
              <span>Security & Proof</span>
              <h4>Why Trust Us?</h4>
              <p style={{ marginTop: '15px', color: '#64748b', fontSize: '15px', lineHeight: 1.6 }}>Used by 5,000+ individuals across the US. We prioritize data privacy, objective metrics, and actionable protocols.</p>
            </div>
          </div>
        </div>
        <div className="center review"> 
            <img alt="img" src="/assets/img/google-w.png" />
             <ul className="star">
              <li><i className="fa-solid fa-star"></i></li>
              <li><i className="fa-solid fa-star"></i></li>
              <li><i className="fa-solid fa-star"></i></li>
              <li><i className="fa-solid fa-star"></i></li>
              <li><i className="fa-solid fa-star"></i></li>
            </ul>
            <h6>(5.0) </h6>
        </div>
      </div>
      <ul className="shaps-img">
        <li><img src="/assets/img/shaps-3.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-5.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default Team;

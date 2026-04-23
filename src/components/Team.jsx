import React from 'react';

const Team = () => {
  return (
    <section id="team" className="gap team-section">
      <div className="container">
        <div className="heading sec-title-animation animation-style2">
          <span className="title-animation">Website that brings leads </span>
          <h2 className="title-animation">Meet our awesome people </h2>
          <p>Increase your efficiencies, and create a better experience for everyone involved. Automate your workflows with tools you use every day.</p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="team">
              <div className="expert-icon">
                <a href="#">
                    <i className="fa-solid fa-share-nodes"></i>
                </a>
                <ul className="icon-share">
                  <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="flaticon-twitter"></i></a></li> 
                </ul>
             </div>
              <figure>
                <img src="/assets/img/team_member_1.jpeg" alt="img" />
              </figure>
              <span>Expert Consultant </span>
              <h4>Thomas Willimes</h4>
              <a href="callto:+12344502086"><i className="fa-solid fa-mobile-screen"></i><b> +1234 450 2086</b></a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="team">
              <div className="expert-icon">
                <a href="#">
                    <i className="fa-solid fa-share-nodes"></i>
                </a>
                <ul className="icon-share">
                  <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="flaticon-twitter"></i></a></li> 
                </ul>
             </div>
              <figure>
                <img src="/assets/img/team_member_2.jpeg" alt="img" />
              </figure>
              <span>Expert Consultant </span>
              <h4>Daniella Fermin</h4>
              <a href="callto:+12344502086"><i className="fa-solid fa-mobile-screen"></i><b> +1234 450 2086</b></a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="team mb-0">
              <div className="expert-icon">
                <a href="#">
                    <i className="fa-solid fa-share-nodes"></i>
                </a>
                <ul className="icon-share">
                  <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="flaticon-twitter"></i></a></li> 
                </ul>
             </div>
              <figure>
                <img src="/assets/img/team_member_3.jpeg" alt="img" />
              </figure>
              <span>Expert Consultant </span>
              <h4>Margie Sutton</h4>
              <a href="callto:+12344502086"><i className="fa-solid fa-mobile-screen"></i><b> +1234 450 2086</b></a>
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

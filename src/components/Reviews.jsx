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
            {/* Original Set */}
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_1.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>Sarah M.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“Helped me understand my burnout. I finally know exactly what's draining my energy and how to fix it.”</p>
            </div>
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_2.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>James T.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“Simple but powerful insights. The cognitive score was eye-opening, and the action plan is very doable.”</p>
            </div>
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_1.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>Michael R.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“The action plan was exactly what I needed. I've seen a 40% boost in my daily focus in just two weeks.”</p>
            </div>
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_2.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>Emily C.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“I used to rely on coffee all day. The stress and sleep insights completely changed my approach to energy.”</p>
            </div>
            
            {/* Duplicate Set for seamless marquee */}
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_1.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>Sarah M.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“Helped me understand my burnout. I finally know exactly what's draining my energy and how to fix it.”</p>
            </div>
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_2.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>James T.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“Simple but powerful insights. The cognitive score was eye-opening, and the action plan is very doable.”</p>
            </div>
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_1.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>Michael R.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“The action plan was exactly what I needed. I've seen a 40% boost in my daily focus in just two weeks.”</p>
            </div>
            <div className="clients">
              <div className="clients-img">
                <img src="./assets/img/avatar_2.png" alt="img" />
                <div>
                  <div className="d-flex">
                    <h3>Emily C.</h3>
                    <span style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '10px' }}>Verified</span>
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
              <p>“I used to rely on coffee all day. The stress and sleep insights completely changed my approach to energy.”</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="shaps-img"> 
        <li><img src="./assets/img/shaps-1.png" alt="img" /></li>
        <li><img src="./assets/img/shaps-2.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default Reviews;

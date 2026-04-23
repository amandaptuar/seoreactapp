import React from 'react';

const Blog = () => {
  return (
    <section className="gap" id="blog">
      <div className="container">
        <div className="heading sec-title-animation animation-style2">
          <span className="title-animation">Recent Articles</span>
          <h2 className="title-animation">Explore our featured news and insights</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="blog">
              <div className="blog-img">
                <figure>
                  <img src="/assets/img/post_1.jpeg" alt="img" />
                </figure>
                <div className="tag">
                  <span>Develoment</span>
                  <a href="#">Dec 24, 2024 <span><i className="flaticon-message"></i>26</span></a> 
                </div>
              </div>
              <a href="#">Components you need to create a professional</a>
              <p>component library to build your own components of UI. Reuse existing Hero, sections component lie your own components.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="blog">
              <div className="blog-img">
                <figure>
                  <img src="/assets/img/post_2.jpeg" alt="img" />
                </figure>
                <div className="tag">
                  <span>Develoment</span>
                  <a href="#">Dec 24, 2024 <span><i className="flaticon-message"></i>26</span></a> 
                </div>
              </div>
              <a href="#">Components you need to create a professional</a>
              <p>component library to build your own components of UI. Reuse existing Hero, sections component lie your own components.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="blog mb-0">
              <div className="blog-img">
                <figure>
                  <img src="/assets/img/post_3.jpeg" alt="img" />
                </figure>
                <div className="tag">
                  <span>Develoment</span>
                  <a href="#">Dec 24, 2024 <span><i className="flaticon-message"></i>26</span></a> 
                </div>
              </div>
              <a href="#">Components you need to create a professional</a>
              <p>component library to build your own components of UI. Reuse existing Hero, sections component lie your own components.</p>
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

export default Blog;

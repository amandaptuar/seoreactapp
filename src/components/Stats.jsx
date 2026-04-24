import React from 'react';

const Stats = () => {
  return (
    <section className="gap no-top section-client">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="count-style">
              <h2 data-max="20"><sup>+</sup></h2>
              <h4>Elite Protocols Delivered</h4>
              <p>Executives, founders, and high performers are using Limitless to redefine their baseline.</p> 
            </div>
          </div>
          <div className="col-lg-6">
            <div className="count-style two">
              <h2 data-max="100"><sup>%</sup></h2>
              <h4>Science-Backed Execution</h4>
              <p>Every protocol is derived from clinical neurobiology and human performance research.</p> 
            </div>
          </div>
        </div>
      </div>
      <ul className="shaps-img"> 
        <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-6.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default Stats;

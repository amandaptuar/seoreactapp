import React from 'react';

const About = () => {
  return (
    <section id="about" className="gap">
      <div className="container">
        <div className="heading sec-title-animation animation-style2" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="title-animation" style={{ color: 'var(--secondary)' }}>What You Get From Your Assessment</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="presenting two" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)' }}>
              <div>
                <i className="flaticon-maintenance" style={{ color: 'var(--primary)' }}></i>
              </div>
              <div>
                <h3 style={{ color: 'var(--secondary)' }}>Personalized Cognitive Health Report</h3>
                <p style={{ color: '#475569', margin: 0 }}>Understand your focus, memory, and mental clarity</p>
              </div>
            </div>
            <div className="presenting" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)' }}>
              <div>
                <i className="flaticon-helpdesk" style={{ color: 'var(--primary)' }}></i>
              </div>
              <div>
                <h3 style={{ color: 'var(--secondary)' }}>AI-Powered Analysis</h3>
                <p style={{ color: '#475569', margin: 0 }}>Get insights based on your responses and behavior patterns</p>
              </div>
            </div>
            <div className="presenting" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)' }}>
              <div>
                <i className="flaticon-cursor" style={{ color: 'var(--primary)' }}></i>
              </div>
              <div>
                <h3 style={{ color: 'var(--secondary)' }}>Actionable Recommendations</h3>
                <p className="mb-0" style={{ color: '#475569' }}>Simple steps to improve your daily performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';

const About = () => {
  return (
    <section id="about" className="gap">
      <div className="container">
        <div className="heading sec-title-animation animation-style2" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="title-animation" style={{ color: 'var(--secondary)' }}>What You'll Get Instantly</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="presenting two" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '16px', flexShrink: 0 }}>✔</div>
              <div>
                <h3 style={{ color: 'var(--secondary)', marginBottom: '5px' }}>Cognitive Score (0–100)</h3>
              </div>
            </div>
            <div className="presenting" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '16px', flexShrink: 0 }}>✔</div>
              <div>
                <h3 style={{ color: 'var(--secondary)', marginBottom: '5px' }}>Focus & Attention Analysis</h3>
              </div>
            </div>
            <div className="presenting" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '16px', flexShrink: 0 }}>✔</div>
              <div>
                <h3 style={{ color: 'var(--secondary)', marginBottom: '5px' }}>Stress & Mental Load Insights</h3>
              </div>
            </div>
            <div className="presenting" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '16px', flexShrink: 0 }}>✔</div>
              <div>
                <h3 style={{ color: 'var(--secondary)', marginBottom: '5px' }}>Sleep Impact on Performance</h3>
              </div>
            </div>
            <div className="presenting" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '16px', flexShrink: 0 }}>✔</div>
              <div>
                <h3 style={{ color: 'var(--secondary)', marginBottom: '5px' }}>Personalized Action Plan</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="pricing" className="pricing-section">
        <div className="pricing-background">
          {/* SVG waves representing the background lines */}
          <svg className="pricing-wave" viewBox="0 0 1440 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,200 C300,350 400,50 720,150 C1040,250 1140,-50 1440,150" stroke="url(#paint0_linear)" strokeWidth="1" opacity="0.4"/>
            <path d="M0,250 C200,100 400,350 720,200 C1040,50 1240,300 1440,200" stroke="url(#paint1_linear)" strokeWidth="1.5" opacity="0.3"/>
            <path d="M0,150 C250,50 500,300 720,250 C940,200 1150,100 1440,250" stroke="url(#paint2_linear)" strokeWidth="0.5" opacity="0.5"/>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="200" x2="1440" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0" y1="200" x2="1440" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="paint2_linear" x1="0" y1="200" x2="1440" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0EA5E9" />
                <stop offset="1" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div className="pricing-header">
            <span className="pricing-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="star-icon">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
              </svg>
              SIMPLE PRICING
            </span>
            <h2 className="pricing-title">
              One Assessment. <span className="text-blue">Real Results.</span>
            </h2>
            <p className="pricing-subtitle">
              Discover what's impacting your energy, focus, <br className="d-none d-md-block" />and performance — in <strong>under 2 minutes.</strong>
            </p>
          </div>

          <div className="pricing-layout">
            {/* Left Features */}
            <div className="pricing-features left-features">
              <div className="feature-item">
                <div className="feature-icon bg-blue-light text-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                </div>
                <span>Cognitive<br/>Clarity</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon bg-orange-light text-orange">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <span>Peak<br/>Energy</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon bg-purple-light text-purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <span>Better<br/>Focus</span>
              </div>
            </div>

            {/* Central Card */}
            <div className="pricing-card-wrapper">
              <div className="pricing-card">
                <div className="pricing-card-top">
                  <div className="limited-offer-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 0 1 8-8 8 8 0 0 1 8 8c0 4.42-3.58 8-8 8H4v-8z"/></svg>
                    LIMITED-TIME OFFER
                  </div>
                  <div className="price-display">
                    <span className="price-old">$149</span>
                    <span className="price-new">$79</span>
                    <span className="price-term">one-time</span>
                  </div>
                  <p className="price-description">Full Cognitive Performance Assessment</p>
                </div>
                
                <hr className="pricing-divider" />

                <div className="pricing-features-list">
                  <h4>What's Included:</h4>
                  <ul>
                    <li>
                      <div className="check-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      40+ point cognitive analysis
                    </li>
                    <li>
                      <div className="check-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      Personalized report
                    </li>
                    <li>
                      <div className="check-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      Risk indicators
                    </li>
                  </ul>
                </div>
                
                <div className="pricing-cta-container">
                  <button className="pricing-cta-button" onClick={() => setIsModalOpen(true)}>
                    Start Assessment Now
                  </button>
                </div>

                <hr className="pricing-divider" />

                <div className="pricing-footer-features">
                  <div className="footer-feature">
                    <div className="footer-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <div className="footer-feature-text">
                      <strong>100% Secure</strong>
                      <span>Your data is protected</span>
                    </div>
                  </div>
                  <div className="footer-feature">
                    <div className="footer-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div className="footer-feature-text">
                      <strong>Takes Less Than 2 Min</strong>
                      <span>Fast, simple, and effective</span>
                    </div>
                  </div>
                  <div className="footer-feature">
                    <div className="footer-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                    </div>
                    <div className="footer-feature-text">
                      <strong>Trusted by Performers</strong>
                      <span>Individuals & Professionals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Features */}
            <div className="pricing-features right-features">
              <div className="feature-item">
                <div className="feature-icon bg-green-light text-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <span>Improved<br/>Performance</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon bg-red-light text-red">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <span>Identify<br/>Risks</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon bg-blue-light text-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <span>Personalized<br/>Insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mt-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: '#0F172A', fontSize: '38px', fontWeight: '800' }}>Frequently Asked Questions</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { q: 'Is my data secure?', a: 'Yes. We follow strict privacy standards and secure data practices.' },
                  { q: 'How long does it take?', a: 'Less than 2 minutes to complete.' },
                  { q: 'When will I get results?', a: 'Instantly after completion.' },
                  { q: 'Is this medically approved?', a: 'Our assessment is based on cognitive science principles, but is not a medical diagnosis.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '22px 28px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                    <h5 style={{ color: '#0F172A', marginBottom: '8px', fontSize: '23px', fontWeight: '700' }}>Q: {item.q}</h5>
                    <p style={{ color: '#6B7280', margin: 0, fontSize: '21px' }}>A: {item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Pricing;

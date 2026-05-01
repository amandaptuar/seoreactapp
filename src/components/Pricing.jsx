import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return(
    <>
      <section id="pricing" className="gap no-top" style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #F8FAFC 100%)', padding: '80px 0' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '20px', marginBottom: '16px' }}>
            Simple Pricing
          </span>
          <h2 style={{ color: '#0F172A', fontSize: '36px', fontWeight: '800', marginBottom: '12px', lineHeight: 1.2 }}>
            One Assessment. Real Results.
          </h2>
          <p style={{ color: '#6B7280', fontSize: '17px', maxWidth: '480px', margin: '0 auto' }}>
            Discover what's impacting your energy, focus, and performance — in under 2 minutes.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="premium-pricing-card" style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>

              {/* Card Top */}
              <div style={{ padding: '36px 36px 28px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'inline-block', background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                  ⏳ Limited-Time Offer
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '60px', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>$79</span>
                  <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: '500', paddingBottom: '8px' }}>one-time</span>
                </div>
                <p style={{ color: '#6B7280', fontSize: '15px', margin: 0 }}>Full Cognitive Performance Assessment</p>
              </div>

              {/* Features List */}
              <div style={{ padding: '28px 36px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    'Personalized cognitive health report',
                    'AI-powered performance insights',
                    'Tailored action plan for your goals',
                    'Instant results — delivered in minutes',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0F172A', fontSize: '15px', fontWeight: '500' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '11px', flexShrink: 0 }}>✔</div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                    display: 'block'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.55)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(245, 158, 11, 0.4)';
                  }}
                >
                  Get My Report Now →
                </button>

                {/* Trust indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '18px', marginTop: '20px', fontSize: '12px', color: '#94a3b8' }}>
                  <span>🔒 Secure Checkout</span>
                  <span>📩 Instant Access</span>
                  <span>🇺🇸 USA Focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#0F172A', fontSize: '28px', fontWeight: '800' }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: 'Is my data secure?', a: 'Yes. We follow strict privacy standards and secure data practices.' },
                { q: 'How long does it take?', a: 'Less than 2 minutes to complete.' },
                { q: 'When will I get results?', a: 'Instantly after completion.' },
                { q: 'Is this medically approved?', a: 'Our assessment is based on cognitive science principles, but is not a medical diagnosis.' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '22px 28px', boxShadow: '0 4px 12px rgba(15,23,42,0.04)' }}>
                  <h5 style={{ color: '#0F172A', marginBottom: '8px', fontSize: '16px', fontWeight: '700' }}>Q: {item.q}</h5>
                  <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .premium-pricing-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12) !important;
        }
      `}</style>
      </section>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Pricing;

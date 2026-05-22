import React from 'react';

const Reviews = () => {
  return (
    <section id="reviews" style={{ background: '#020617', padding: '15px 0', fontFamily: "'Inter', sans-serif", color: '#FFF' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
            <i className="fa-solid fa-shield-alt" style={{ color: '#60A5FA', fontSize: '16px' }}></i>
            <span style={{ color: '#60A5FA', fontSize: '15px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>WHY TRUST LIMITLESS</span>
          </div>
          <h2 style={{ fontSize: '50px', fontWeight: '800', color: '#FFF', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-1px' }}>
            Real People. Real Results.<br/>
            <span style={{ color: '#3B82F6' }}>Real Transformation.</span>
          </h2>
          <p style={{ fontSize: '20px', color: '#94A3B8', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Join thousands of Americans who are improving their brain health, mental wellness, and overall performance with Limitless.
          </p>
        </div>

        {/* 5 Stats Row */}
        <div className="reviews-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px' }}>
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', fontSize: '22px', margin: '0 auto 16px' }}><i className="fa-solid fa-users"></i></div>
            <h4 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', margin: '0 0 8px 0' }}>2,300+</h4>
            <p style={{ fontSize: '16px', color: '#FFF', margin: 0, lineHeight: '1.4' }}>Assessments Completed<br/>Across the USA</p>
          </div>
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399', fontSize: '22px', margin: '0 auto 16px' }}><i className="fa-solid fa-shield-alt"></i></div>
            <h4 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', margin: '0 0 8px 0' }}>100%</h4>
            <p style={{ fontSize: '16px', color: '#FFF', margin: 0, lineHeight: '1.4' }}>Private & Secure<br/>Your Data is Protected</p>
          </div>
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C084FC', fontSize: '22px', margin: '0 auto 16px' }}><i className="fa-solid fa-flask"></i></div>
            <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#FFF', margin: '0 0 8px 0' }}>Science-Backed</h4>
            <p style={{ fontSize: '16px', color: '#FFF', margin: 0, lineHeight: '1.4' }}>Built by Psychologists,<br/>Researchers & Experts</p>
          </div>
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', fontSize: '22px', margin: '0 auto 16px' }}><i className="fa-solid fa-star"></i></div>
            <h4 style={{ fontSize: '26px', fontWeight: '800', color: '#FFF', margin: '0 0 8px 0' }}>4.8 / 5</h4>
            <p style={{ fontSize: '16px', color: '#FFF', margin: 0, lineHeight: '1.4' }}>Average Rating<br/>From Our Users</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FBBF24', fontSize: '22px', margin: '0 auto 16px' }}><i className="fa-solid fa-chart-bar"></i></div>
            <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#FFF', margin: '0 0 8px 0' }}>Proven Results</h4>
            <p style={{ fontSize: '16px', color: '#FFF', margin: 0, lineHeight: '1.4' }}>Measurable Improvements<br/>That Last</p>
          </div>
        </div>

        {/* 3 Reviews Row */}
        <div className="reviews-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          
          {/* Review 1 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#0F172A', fontWeight: '700', overflow: 'hidden' }}>
                <img src="https://ui-avatars.com/api/?name=James+T&background=cbd5e1&color=0f172a" alt="James T." style={{ width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: 0 }}>James T.</h5>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', fontSize: '12px', padding: '2px 6px', borderRadius: '4px', fontWeight: '600', textTransform: 'uppercase' }}><i className="fa-solid fa-check"></i> Verified</div>
                </div>
                <div style={{ fontSize: '16px', color: '#3B82F6', marginTop: '4px' }}>Austin, Texas</div>
              </div>
            </div>
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.6', flex: 1 }}>
              "Simple but powerful insights. The cognitive score was eye-opening, and the action plan is very doable. I feel more focused and in control every day."
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
              <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>Better Focus</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>Less Stress</span>
              <span style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#C084FC', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>More Energy</span>
            </div>
          </div>

          {/* Review 2 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#0F172A', fontWeight: '700', overflow: 'hidden' }}>
                <img src="https://ui-avatars.com/api/?name=Sarah+M&background=cbd5e1&color=0f172a" alt="Sarah M." style={{ width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: 0 }}>Sarah M.</h5>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', fontSize: '12px', padding: '2px 6px', borderRadius: '4px', fontWeight: '600', textTransform: 'uppercase' }}><i className="fa-solid fa-check"></i> Verified</div>
                </div>
                <div style={{ fontSize: '16px', color: '#3B82F6', marginTop: '4px' }}>Miami, Florida</div>
              </div>
            </div>
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.6', flex: 1 }}>
              "As a busy mom, I didn't realize how much mental load I was carrying. This assessment helped me understand my stress triggers and improve my sleep and mood."
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
              <span style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#C084FC', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>Better Sleep</span>
              <span style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#F472B6', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>Balanced Mood</span>
              <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>More Clarity</span>
            </div>
          </div>

          {/* Review 3 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: '#0F172A', fontWeight: '700', overflow: 'hidden' }}>
                <img src="https://ui-avatars.com/api/?name=Michael+R&background=cbd5e1&color=0f172a" alt="Michael R." style={{ width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: 0 }}>Michael R.</h5>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', fontSize: '12px', padding: '2px 6px', borderRadius: '4px', fontWeight: '600', textTransform: 'uppercase' }}><i className="fa-solid fa-check"></i> Verified</div>
                </div>
                <div style={{ fontSize: '16px', color: '#3B82F6', marginTop: '4px' }}>Denver, Colorado</div>
              </div>
            </div>
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.6', flex: 1 }}>
              "The action plan was exactly what I needed. I've seen a 40% boost in my daily focus in just two weeks. Highly recommended for anyone serious about personal growth."
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
              <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>Better Focus</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>Higher Performance</span>
              <span style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#C084FC', fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>More Drive</span>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '60px' }}>
          <div style={{ width: '24px', height: '8px', background: '#3B82F6', borderRadius: '4px' }}></div>
          <div style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
          <div style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
        </div>

        {/* Bottom Bar */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '300px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', fontSize: '20px', flexShrink: 0 }}><i className="fa-solid fa-shield-alt"></i></div>
            <p style={{ fontSize: '16px', color: '#94A3B8', margin: 0, lineHeight: '1.5' }}>Your trust is our priority. Limitless is committed to the highest<br/>standards of privacy, security, and scientific accuracy.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className="fa-solid fa-heart-pulse" style={{ color: '#94A3B8', fontSize: '26px' }}></i>
              <div>
                <div style={{ fontSize: '14px', color: '#FFF', fontWeight: '700' }}>HIPAA</div>
                <div style={{ fontSize: '14px', color: '#94A3B8' }}>Compliant</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className="fa-solid fa-lock" style={{ color: '#94A3B8', fontSize: '26px' }}></i>
              <div>
                <div style={{ fontSize: '14px', color: '#FFF', fontWeight: '700' }}>SOC 2</div>
                <div style={{ fontSize: '14px', color: '#94A3B8' }}>Certified</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <i className="fa-solid fa-check-circle" style={{ color: '#3B82F6', fontSize: '26px' }}></i>
              <div>
                <div style={{ fontSize: '14px', color: '#FFF', fontWeight: '700' }}>GDPR</div>
                <div style={{ fontSize: '14px', color: '#94A3B8' }}>Ready</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .reviews-stats-grid { grid-template-columns: repeat(3, 1fr) !important; border-bottom: none !important; }
          .reviews-stats-grid > div { border-right: none !important; margin-bottom: 24px; }
          .reviews-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .reviews-stats-grid { grid-template-columns: 1fr !important; }
          .reviews-cards-grid { grid-template-columns: 1fr !important; }
          #reviews { padding: 60px 0 !important; }
          #reviews h2 { font-size: 32px !important; line-height: 1.2 !important; }
          .container { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default Reviews;

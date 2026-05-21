import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      name: "James T.",
      location: "Austin, Texas",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "“Simple but powerful insights. The cognitive score was eye-opening, and the action plan is very doable. I feel more focused and in control every day.”",
      tags: [
        { label: "Better Focus", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
        { label: "Less Stress", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
        { label: "More Energy", color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" }
      ]
    },
    {
      name: "Sarah M.",
      location: "Miami, Florida",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "“As a busy mom, I didn't realize how much mental load I was carrying. This assessment helped me understand my stress triggers and improve my sleep and mood.”",
      tags: [
        { label: "Better Sleep", color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" },
        { label: "Balanced Mood", color: "#EC4899", bg: "rgba(236, 72, 153, 0.1)" },
        { label: "More Clarity", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" }
      ]
    },
    {
      name: "Michael R.",
      location: "Denver, Colorado",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      text: "“The action plan was exactly what I needed. I've seen a 40% boost in my daily focus in just two weeks. Highly recommended for anyone serious about personal growth.”",
      tags: [
        { label: "Better Focus", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
        { label: "Higher Performance", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
        { label: "More Drive", color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" }
      ]
    }
  ];

  return (
    <section className="reviews-section" style={{ background: '#020617', padding: '40px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '12px' }}>
            <img src="https://flagcdn.com/w20/us.png" alt="US" style={{ width: '16px', borderRadius: '2px' }}/>
            <span style={{ color: '#F59E0B', fontSize: '16px', fontWeight: '700' }}>Trusted by Thousands Across the USA</span>
          </div>

          <h2 style={{ fontSize: '58px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2', letterSpacing: '-1px' }}>
            Real People. Real Results. <br/>
            <span style={{ color: '#3B82F6' }}>Real Transformation.</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '19px', marginTop: '16px' }}>
            Join thousands of Americans who are improving their brain health,<br/>mental wellness, and overall performance with Limitless.
          </p>

          {/* Star Burst Badge (Absolute positioned on desktop, hide on mobile to keep it clean if needed, or adjust) */}
          <div className="star-burst" style={{ position: 'absolute', right: '0', top: '-20px', background: '#EF4444', color: '#FFF', width: '120px', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transform: 'rotate(15deg)', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}>
            <h4 style={{ fontSize: '34px', fontWeight: '800', margin: 0, color: '#FFF' }}>4.8/5</h4>
            <div style={{ display: 'flex', gap: '2px', color: '#FCD34D', fontSize: '14px', marginBottom: '4px' }}>
              <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
            </div>
            <p style={{ fontSize: '12px', textAlign: 'center', margin: 0, lineHeight: '1.2', fontWeight: '600' }}>From 2,300+<br/>Assessments</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="reviews-cards-grid">
          {reviews.map((review, idx) => (
            <div key={idx} style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={review.avatar} alt={review.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                    <img src="https://flagcdn.com/w20/us.png" alt="US" style={{ position: 'absolute', bottom: '0', right: '0', width: '16px', borderRadius: '50%', border: '2px solid #0F172A' }} />
                  </div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '19px', fontWeight: '700', margin: '0 0 4px 0' }}>{review.name}</h4>
                    <p style={{ color: '#60A5FA', fontSize: '16px', margin: 0 }}>{review.location}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '12px' }}>
                  <i className="fa-solid fa-check" style={{ color: '#10B981', fontSize: '12px' }}></i>
                  <span style={{ color: '#10B981', fontSize: '13px', fontWeight: '700' }}>Verified</span>
                </div>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '18px', lineHeight: '1.6', marginBottom: '12px', flex: 1 }}>{review.text}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {review.tags.map((tag, i) => (
                  <span key={i} style={{ background: tag.bg, color: tag.color, fontSize: '14px', fontWeight: '600', padding: '6px 12px', borderRadius: '20px' }}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '6px', borderRadius: '4px', background: '#3B82F6' }}></div>
          <div style={{ width: '16px', height: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)' }}></div>
          <div style={{ width: '16px', height: '6px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)' }}></div>
        </div>

        {/* Bottom Dark Dashboard Bar */}
        <div className="reviews-bottom-grid">
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex' }}>
              <img src="https://randomuser.me/api/portraits/men/1.jpg" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #0F172A' }} alt="user" />
              <img src="https://randomuser.me/api/portraits/women/2.jpg" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #0F172A', marginLeft: '-12px' }} alt="user" />
              <img src="https://randomuser.me/api/portraits/men/3.jpg" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #0F172A', marginLeft: '-12px' }} alt="user" />
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #0F172A', marginLeft: '-12px', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '12px', fontWeight: '700' }}>+</div>
            </div>
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Join 10,000+</h5>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Happy Users Across the United States</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px' }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>100% Private & Secure</h5>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Your data is encrypted and never shared.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px' }}>
              <i className="fa-solid fa-star"></i>
            </div>
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>4.8/5 Average Rating</h5>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Based on 2,300+ real assessments</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22C55E', fontSize: '24px' }}>
              <i className="fa-solid fa-brain"></i>
            </div>
            <div>
              <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Science-Backed AI</h5>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>Powered by advanced neuroscience & AI</p>
            </div>
          </div>

        </div>

        {/* Highlighted Quote */}
        <div className="reviews-quote-bar">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <i className="fa-solid fa-quote-left" style={{ color: '#3B82F6', fontSize: '29px' }}></i>
            <p style={{ color: '#FFFFFF', fontSize: '18px', margin: 0, fontWeight: '500' }}>
              "Limitless gave me the clarity I didn't know I needed. It's like a personal coach for my brain!"
            </p>
            <span style={{ color: '#60A5FA', fontSize: '17px', marginLeft: '8px' }}>– Jessica L., Seattle, WA</span>
          </div>
          <div style={{ display: 'flex', gap: '4px', color: '#F59E0B', fontSize: '14px' }}>
            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
          </div>
        </div>

      </div>

      {/* Decorative Lighting Background */}
      <div style={{ position: 'absolute', top: '-20%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }}></div>

      <style>{`
        /* Desktop Base */
        .reviews-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 20px; }
        .reviews-bottom-grid { background: #0F172A; border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 32px 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; align-items: center; margin-bottom: 12px; }
        .reviews-quote-bar { background: #0F172A; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 24px 40px; display: flex; align-items: center; justify-content: space-between; }

        /* Responsive Fixes */
        @media (max-width: 1024px) {
          .reviews-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .star-burst { display: none !important; }
          .reviews-bottom-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
          .reviews-bottom-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px; }
        }
        @media (max-width: 768px) {
          .reviews-section { padding: 60px 0 !important; }
          .reviews-cards-grid { grid-template-columns: 1fr; }
          .reviews-section h2 { font-size: 32px !important; }
          .reviews-bottom-grid { grid-template-columns: 1fr; padding: 24px !important; }
          .reviews-quote-bar { flex-direction: column; gap: 16px; text-align: center; justify-content: center; padding: 24px !important; }
          .reviews-quote-bar > div:first-child { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default Reviews;

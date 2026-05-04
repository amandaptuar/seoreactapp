import React from 'react';

const steps = [
  {
    num: '01',
    icon: '📋',
    title: 'Answer Smart Questions',
    desc: 'Scientifically structured to assess your mental performance.',
  },
  {
    num: '02',
    icon: '🧠',
    title: 'Get Your Cognitive Score',
    desc: 'Instant breakdown across key brain functions.',
  },
  {
    num: '03',
    icon: '📊',
    title: 'See What’s Holding You Back',
    desc: 'Identify stress, fatigue, and focus blockers.',
  },
  {
    num: '04',
    icon: '🚀',
    title: 'Follow Your Action Plan',
    desc: 'Simple steps to improve within days.',
  },
];

const assessments = [
  { icon: 'fa-solid fa-brain',      label: 'Cognitive / Mental Performance', dark: false },
  { icon: 'fa-solid fa-female',     label: "Women's Health Assessment",      dark: true  },
  { icon: 'fa-solid fa-child',      label: 'Kids Monitoring',                dark: false },
];

const CARD_STYLE = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 16px rgba(15,23,42,0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '100%',
};

const Services = () => {
  return (
    <section
      id="services"
      className="how-it-works"
      style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)', padding: '80px 0' }}
    >
      <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>

        {/* Two-column layout: How It Works | Choose Your Assessment */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>

          {/* ─── LEFT: HOW IT WORKS ─── */}
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#0F172A', fontSize: '30px', fontWeight: '800', marginBottom: '8px', lineHeight: 1.2 }}>
                How It Works
              </h2>
              <p style={{ color: '#6B7280', fontSize: '15px', margin: 0 }}>
                Simple 4-step process to improve your performance
              </p>
            </div>

            {/* Step cards — full-width column, equal size */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="services-step-card"
                  style={{ ...CARD_STYLE, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}
                >
                  {/* Step badge */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minWidth: '42px', height: '42px', borderRadius: '50%',
                    background: 'rgba(59,130,246,0.1)', color: '#3B82F6',
                    fontWeight: '800', fontSize: '13px', flexShrink: 0,
                  }}>
                    {step.num}
                  </div>
                  {/* Icon */}
                  <div style={{ fontSize: '20px', flexShrink: 0 }}>{step.icon}</div>
                  {/* Text */}
                  <div>
                    <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#0F172A' }}>{step.title}</p>
                    <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: CHOOSE YOUR ASSESSMENT ─── */}
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ color: '#0F172A', fontSize: '30px', fontWeight: '800', marginBottom: '8px', lineHeight: 1.2 }}>
                Choose Your Assessment
              </h2>
              <p style={{ color: '#6B7280', fontSize: '15px', margin: 0 }}>
                Each assessment is tailored to a specific performance area.
              </p>
            </div>

            {/* 2×2 grid — equal size cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {assessments.map((a, i) => (
                <div
                  key={i}
                  className="services-assessment-card"
                  style={{
                    ...CARD_STYLE,
                    background: a.dark ? '#0F172A' : '#ffffff',
                    border: a.dark ? 'none' : '1px solid #e2e8f0',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    justifyContent: 'center',
                  }}
                >
                  <i
                    className={a.icon}
                    style={{ fontSize: '32px', color: a.dark ? '#F59E0B' : '#3B82F6' }}
                  />
                  <h4 style={{ color: a.dark ? '#fff' : '#0F172A', fontSize: '15px', fontWeight: '700', margin: 0, lineHeight: 1.4 }}>
                    {a.label}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .services-step-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 24px rgba(15,23,42,0.08) !important;
        }
        .services-assessment-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 28px rgba(15,23,42,0.1) !important;
        }
        @media (max-width: 992px) {
          #services .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 576px) {
          #services .container > div > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

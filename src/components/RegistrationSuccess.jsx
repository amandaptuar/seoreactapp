import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const [credentials, setCredentials] = useState({ name: '', username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    setCredentials({
      name: sessionStorage.getItem('name') || 'Friend',
      username: sessionStorage.getItem('userEmail') || '',
      password: sessionStorage.getItem('generatedPassword') || '',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #040B16 0%, #0D1B2A 50%, #040B16 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      {/* Background decorative blobs */}
      <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Logo */}
      <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Link to="/">
          <img src="/img/limitless-logo.webp" alt="Limitless Logo" style={{ maxHeight: '55px', objectFit: 'contain' }} />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#FFF', fontSize: '26px', fontWeight: '800', letterSpacing: '1px', lineHeight: 1 }}>LIMITLESS</span>
          <span style={{ color: '#F97316', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>UNLOCK YOUR TRUE POTENTIAL</span>
        </div>
      </div>

      {/* Main Card */}
      <div style={{
        width: '100%',
        maxWidth: '580px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        position: 'relative',
        zIndex: 1
      }}>

        {/* Top gradient bar */}
        <div style={{ height: '5px', background: 'linear-gradient(90deg, #F97316, #FB923C, #FBBF24, #22C55E)' }} />

        <div style={{ padding: '52px 48px 56px' }}>

          {/* Success checkmark */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '90px', height: '90px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #16A34A, #22C55E)',
              boxShadow: '0 0 0 16px rgba(34,197,94,0.1), 0 0 0 32px rgba(34,197,94,0.04)',
              marginBottom: '24px',
              animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
            }}>
              <span style={{ fontSize: '40px', color: '#fff' }}>✓</span>
            </div>

            <h1 style={{
              color: '#FFFFFF', fontSize: '34px', fontWeight: '900',
              margin: '0 0 12px', letterSpacing: '-0.5px', lineHeight: 1.2
            }}>
              🎉 Registration Successful!
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '17px', margin: 0, lineHeight: '1.6' }}>
              Welcome aboard, <span style={{ color: '#F97316', fontWeight: '700' }}>{credentials.name}</span>!<br />
              Your account has been created successfully.
            </p>
          </div>

          {/* Credentials Box */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px',
            padding: '28px',
            marginBottom: '28px'
          }}>
            <p style={{
              color: '#64748B', fontSize: '11px', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '2px',
              margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              🔐 Your Login Credentials
            </p>

            {/* Username row */}
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '12px',
              padding: '16px 20px', marginBottom: '12px',
              border: '1px solid rgba(255,255,255,0.07)'
            }}>
              <p style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '0 0 6px' }}>
                👤 Username / Email
              </p>
              <p style={{ color: '#E2E8F0', fontSize: '17px', fontWeight: '600', margin: 0, wordBreak: 'break-all', letterSpacing: '0.2px' }}>
                {credentials.username}
              </p>
            </div>

            {/* Password row */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06))',
              borderRadius: '12px', padding: '16px 20px',
              border: '1px solid rgba(249,115,22,0.25)'
            }}>
              <p style={{ color: '#FB923C', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '0 0 6px' }}>
                🔑 Temporary Password
              </p>
              <p style={{
                color: '#FFFFFF', fontSize: '26px', fontWeight: '900',
                margin: 0, letterSpacing: '3px', fontFamily: "'Courier New', monospace"
              }}>
                {credentials.password}
              </p>
            </div>

            <div style={{
              marginTop: '16px', padding: '12px 16px',
              background: 'rgba(251,191,36,0.06)', borderRadius: '10px',
              border: '1px solid rgba(251,191,36,0.15)',
              display: 'flex', alignItems: 'flex-start', gap: '8px'
            }}>
              <span style={{ fontSize: '16px', marginTop: '1px' }}>⚠️</span>
              <p style={{ color: '#FCD34D', fontSize: '13px', margin: 0, lineHeight: '1.5', fontWeight: '500' }}>
                Please save these credentials carefully. You'll need them to log into your account.
              </p>
            </div>
          </div>

          {/* We'll contact you card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '18px',
            padding: '28px',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🚀</div>
            <h2 style={{ color: '#C7D2FE', fontSize: '20px', fontWeight: '800', margin: '0 0 14px', letterSpacing: '-0.3px' }}>
              We Will Contact You Soon!
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
              Thank you for your interest in <strong style={{ color: '#E2E8F0' }}>Limitless</strong>. Our team will reach out to you shortly on your registered email address.
            </p>
            <div style={{
              marginTop: '20px', padding: '16px',
              background: 'rgba(99,102,241,0.1)', borderRadius: '12px',
              border: '1px solid rgba(99,102,241,0.15)'
            }}>
              <span style={{ color: '#A5B4FC', fontWeight: '700', fontSize: '15px' }}>
                🌐 Our platform is currently in the development phase.
              </span>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: '8px 0 0', lineHeight: '1.6' }}>
                We're building something extraordinary for you. Exciting features are coming your way very soon — stay tuned!
              </p>
            </div>
          </div>

          {/* Back to home button */}
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              width: '100%', padding: '18px',
              background: 'linear-gradient(90deg, #6366F1, #3B82F6)',
              border: 'none', borderRadius: '14px',
              color: '#FFF', fontSize: '18px', fontWeight: '700',
              cursor: 'pointer', boxShadow: '0 6px 24px rgba(99,102,241,0.4)',
              transition: 'all 0.2s', letterSpacing: '0.3px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              marginBottom: '12px'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            🧠 View My Dashboard
          </button>
          <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
            <button style={{
              width: '100%', padding: '14px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px',
              color: '#94A3B8', fontSize: '16px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
            }}
            >
              ← Back to Home
            </button>
          </Link>

        </div>
      </div>

      {/* Footer note */}
      <p style={{ color: '#334155', fontSize: '13px', marginTop: '32px', textAlign: 'center' }}>
        © {new Date().getFullYear()} Limitless. All rights reserved.
      </p>

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RegistrationSuccess;

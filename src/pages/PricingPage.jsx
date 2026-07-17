import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AssessmentModal from '../components/AssessmentModal';
import { useCurrency } from '../hooks/useCurrency';
import './PricingPage.css';

const PricingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currency } = useCurrency();
  
  const getPrice = (basePrice) => {
    if (basePrice === 0) return 0;
    const converted = basePrice * currency.rate;
    if (currency.code === 'USD' || currency.code === 'EUR') return converted.toFixed(0);
    if (currency.code === 'INR') return Math.round(converted);
    return Math.round(converted).toLocaleString();
  };

  return (
    <div className="pricing-page-container">
      <Header />
      <div className="page">
        <section className="hero">
          <h1>Simple <span className="grad">Pricing.</span> Powerful Results.</h1>
          <p>Choose the plan that fits your goals. Start free and upgrade anytime to unlock deeper insights and track your progress.</p>
        </section>

        <section className="plans">
          {/* Free Plan */}
          <div className="card">
            <div className="plan-icon free">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12v9H4v-9M2 7h20v5H2V7zM12 22V7M12 7C10 2 4.5 2 4.5 5.5 4.5 7 6 7 12 7zM12 7c2-5 7.5-5 7.5-1.5C19.5 7 18 7 12 7z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="plan-name free">Free Plan</div>
            <div className="plan-sub">Perfect for first-time users</div>

            <div className="price-row">
              <span className="dollar">{currency.symbol}</span>
              <span className="amount">{getPrice(0)}</span>
            </div>
            <div className="price-caption free">Forever Free</div>

            <div className="divider"></div>

            <ul className="features">
              <li><span className="check green"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>One-Time AI Cognitive Assessment</li>
              <li><span className="check green"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Personalized AI Analysis Report</li>
              <li><span className="check green"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Online Dashboard Access</li>
              <li><span className="check green"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Online Support</li>
              <li><span className="check green"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Secure &amp; Private Data Protection</li>
            </ul>

            <div className="spacer"></div>

            <button className="btn free" onClick={() => setIsModalOpen(true)}>
              Start Free Assessment
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="fine-print">No Credit Card Required</div>
          </div>

          {/* Premium Plan */}
          <div className="card premium">
            <div className="badge">
              <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 7.2H22l-6.2 4.4 2.4 7.2L12 16.4 5.8 20.8l2.4-7.2L2 9.2h7.6z"/></svg>
              MOST POPULAR
            </div>

            <div className="plan-icon premium">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3h12l4 6-10 12L2 9z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M2 9h20M9 3l3 6 3-6M8 9l4 12 4-12" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="plan-name premium">Premium Plan</div>
            <div className="plan-sub">Unlock full potential of your mind</div>

            <div className="price-row">
              <span className="dollar">{currency.symbol}</span>
              <span className="amount">{getPrice(19)}</span>
            </div>
            <div className="price-caption premium">Per Month</div>

            <div className="divider"></div>

            <ul className="features">
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Unlimited AI Cognitive Assessments</li>
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Unlimited AI Analysis Reports</li>
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Personalized Online Dashboard</li>
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Progress Tracking &amp; History</li>
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>AI-Powered Cognitive Insights</li>
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Memory, Focus &amp; Stress Trend Analysis</li>
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Personalized Recommendations</li>
              <li><span className="check purple"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Priority Online Support</li>
            </ul>

            <div className="spacer"></div>

            <button className="btn premium" onClick={() => setIsModalOpen(true)}>
              Upgrade to Premium
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="fine-print">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="#818cf8" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              Cancel Anytime. 100% Secure.
            </div>
          </div>

        </section>

        <section className="trust-bar">
          <div className="trust-item">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
            </div>
            <div className="trust-text">
              <div className="title">100% Secure</div>
              <div className="sub">Your data is safe</div>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.6"/></svg>
            </div>
            <div className="trust-text">
              <div className="title">Privacy First</div>
              <div className="sub">We respect your privacy</div>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.6"/></svg>
            </div>
            <div className="trust-text">
              <div className="title">AI-Powered</div>
              <div className="sub">Advanced science-backed AI</div>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </div>
            <div className="trust-text">
              <div className="title">Always Here for You</div>
              <div className="sub">Reliable online support</div>
            </div>
          </div>
        </section>

        <section className="guarantee">
          <div className="g-icon">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h3>7-Day Happiness Guarantee</h3>
          <p>Not satisfied? Get a full refund within 7 days of your purchase.</p>
        </section>

      </div>
      <Footer />
      <AssessmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PricingPage;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <section className="page-banner" style={{ padding: '150px 0 80px', backgroundColor: 'var(--bgcolor)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="heading sec-title-animation animation-style2 mb-0">
            <h2 className="title-animation mb-2 text-white">Privacy Policy</h2>
            <p className="text-white" style={{ fontSize: '18px', opacity: 0.8 }}>Effective Date: [Insert Date]</p>
          </div>
        </div>
        <ul className="shaps-img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          <li><img src="/assets/img/shaps-4.png" alt="img" /></li>
          <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
        </ul>
      </section>

      <section className="gap" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '950px' }}>
          <div className="policy-content" style={{ backgroundColor: '#ffffff', padding: '60px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', color: '#444', lineHeight: '1.8', fontSize: '17px' }}>
            <p>Limitless ("we," "our," or "us") operates as a digital wellness platform providing online health assessments, including Mental Health Assessment, Women’s Health Assessment, Sexual Health Assessment, and related services (collectively, the "Services").</p>
            <p>We are committed to protecting your privacy and ensuring the security of your personal information in compliance with applicable laws in the United States.</p>
            
            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>1. Information We Collect</h4>
            <p>We may collect the following types of information:</p>
            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>a. Personal Information</h6>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>Name</li>
              <li>Email address</li>
              <li>Age and gender</li>
              <li>Contact details</li>
            </ul>
            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>b. Health & Assessment Information</h6>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>Responses to assessment questionnaires</li>
              <li>Mental, emotional, and lifestyle data</li>
              <li>Health-related information voluntarily provided by users</li>
            </ul>
            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>c. Technical Information</h6>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>IP address</li>
              <li>Device type</li>
              <li>Browser type</li>
              <li>Usage data and cookies</li>
            </ul>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>2. How We Use Your Information</h4>
            <p>We use the collected information to:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>Provide and improve our health assessment services</li>
              <li>Generate personalized reports and recommendations</li>
              <li>Communicate with users regarding their assessments</li>
              <li>Enhance user experience and platform performance</li>
              <li>Ensure platform security and prevent misuse</li>
            </ul>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>3. Data Sharing and Disclosure</h4>
            <p>We do not sell your personal or health information.</p>
            <p>We may share information in the following cases:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>With trusted service providers who assist in operating our platform</li>
              <li>To comply with legal obligations or government requests</li>
              <li>To protect rights, safety, and security of users and our platform</li>
            </ul>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>4. Data Security</h4>
            <p>We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse.</p>
            <p>However, no online platform can guarantee absolute security.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>5. HIPAA Positioning & Health Disclaimer</h4>
            <p>Limitless provides digital wellness assessments and informational insights and is not a healthcare provider, health plan, or healthcare clearinghouse.</p>
            
            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>HIPAA Applicability:</h6>
            <p>In general, the Health Insurance Portability and Accountability Act (HIPAA) applies to "covered entities" (such as healthcare providers, insurers, and clearinghouses) and their "business associates."</p>
            <p>Limitless does not operate as a covered entity and typically does not act as a business associate. Therefore, information you provide through our platform may not be considered Protected Health Information (PHI) under HIPAA.</p>

            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>Important Clarification:</h6>
            <p>While HIPAA may not apply, we treat your data with a high standard of privacy and security.</p>
            <p>We implement industry-standard safeguards to protect sensitive personal and health-related information.</p>

            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>No Medical Advice:</h6>
            <p>The Services are for informational and wellness purposes only and do not constitute medical advice, diagnosis, or treatment.</p>
            <p>Always seek the advice of a qualified healthcare professional for any medical condition or concern.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>6. Your Rights (U.S. Users)</h4>
            <p>Depending on your location, you may have rights including:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>Access to your personal data</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of communications</li>
            </ul>
            <p>To exercise your rights, contact us at: <a href="mailto:info@limitlessworld.net">info@limitlessworld.net</a></p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>7. Cookies Policy</h4>
            <p>We use cookies and similar technologies to enhance user experience, analyze traffic, and improve our services.</p>
            <p>Users can control cookie settings through their browser.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>8. Third-Party Links</h4>
            <p>Our platform may contain links to third-party websites. We are not responsible for their privacy practices.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>9. Children’s Privacy</h4>
            <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal data from children.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>10. Changes to This Policy</h4>
            <p>We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.</p>

            <h4 className="mt-4 mb-3">11. Contact Information</h4>
            <p>If you have any questions regarding this Privacy Policy, you may contact us at:</p>
            <p>
              Limitless Wellness<br/>
              7454 Old Alexandria Ferry Road<br/>
              Clinton, MD 20744, USA<br/>
              Email: <a href="mailto:info@limitlessworld.net">info@limitlessworld.net</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

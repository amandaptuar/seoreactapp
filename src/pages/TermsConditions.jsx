import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsConditions = () => {
  return (
    <>
      <Header />
      <section className="page-banner" style={{ padding: '150px 0 80px', background: 'linear-gradient(135deg, var(--secondary) 0%, var(--bg-dark) 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="heading sec-title-animation animation-style2 mb-0">
            <h2 className="title-animation mb-2 text-white">Terms and Conditions</h2>
    
          </div>
        </div>
        <ul className="shaps-img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          <li><img src="./assets/img/shaps-4.png" alt="img" /></li>
          <li><img src="./assets/img/shaps-1.png" alt="img" /></li>
        </ul>
      </section>

      <section className="gap" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container" style={{ maxWidth: '950px' }}>
          <div className="policy-content" style={{ backgroundColor: '#ffffff', padding: '60px', borderRadius: '30px', boxShadow: 'var(--shadow-lg)', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '17px' }}>
            <p>Welcome to Limitless ("Company," "we," "our," or "us"). By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions.</p>
            <p>If you do not agree with these terms, please do not use our platform.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>1. Services Overview</h4>
            <p>Limitless is a digital wellness platform that provides online assessments, including but not limited to:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>Mental Health Assessment</li>
              <li>Women’s Health Assessment</li>
              <li>Sexual Health Assessment</li>
              <li>Child/Pediatric Health Assessment</li>
            </ul>
            <p>Our services provide informational insights and are not a substitute for professional medical advice.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>2. Eligibility</h4>
            <p>You must be at least 18 years old to use our services. If you are under 18, use is permitted only under the supervision of a parent or legal guardian.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>3. User Responsibilities</h4>
            <p>By using our platform, you agree:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>To provide accurate and truthful information</li>
              <li>Not to misuse or attempt to disrupt the platform</li>
              <li>Not to use the platform for unlawful purposes</li>
            </ul>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>4. No Medical Advice</h4>
            <p>Limitless does not provide medical advice, diagnosis, or treatment. All content, assessments, and reports are for informational purposes only.</p>
            <p>Always consult a qualified healthcare professional for medical concerns.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>5. Data & Privacy</h4>
            <p>Your use of our platform is also governed by our Privacy Policy.</p>
            <p>We implement reasonable measures to protect your data, but you acknowledge that no system is completely secure.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>6. Intellectual Property</h4>
            <p>All content on this website, including text, graphics, logos, and software, is the property of Limitless and is protected by applicable intellectual property laws.</p>
            <p>You may not copy, reproduce, or distribute any content without prior written permission.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>7. Limitation of Liability</h4>
            <p>To the fullest extent permitted by law, Limitless shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
            <p>Use of the platform is at your own risk.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>8. Third-Party Services</h4>
            <p>Our platform may include links or integrations with third-party services. We are not responsible for their content or practices.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>9. Termination</h4>
            <p>We reserve the right to suspend or terminate access to our services at any time, without notice, for violations of these terms.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>10. Changes to Terms</h4>
            <p>We may update these Terms and Conditions at any time. Continued use of the platform constitutes acceptance of the updated terms.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>11. Governing Law</h4>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United States.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>12. Contact Information</h4>
            <p>If you have any questions regarding these Terms and Conditions, please contact us:</p>
            <p>
              Limitless Wellness<br/>
              7454 Old Alexandria Ferry Road<br/>
              Clinton, MD 20744, USA<br/>
              Email: <a href="mailto:info@limitless.com">info@limitless.com</a>
            </p>

            <p className="mt-4"><strong>By using our website, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</strong></p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TermsConditions;

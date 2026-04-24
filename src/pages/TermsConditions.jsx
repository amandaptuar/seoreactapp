import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsConditions = () => {
  return (
    <>
      <Header />
      <section className="gap">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="heading sec-title-animation animation-style2">
            <h2 className="title-animation">Terms and Conditions</h2>
            <p><strong>Effective Date:</strong> [Insert Date]</p>
          </div>
          <div className="policy-content" style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
            <p>Welcome to Limitless ("Company," "we," "our," or "us"). By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions.</p>
            <p>If you do not agree with these terms, please do not use our platform.</p>

            <h4 className="mt-4 mb-3">1. Services Overview</h4>
            <p>Limitless is a digital wellness platform that provides online assessments, including but not limited to:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>Mental Health Assessment</li>
              <li>Women’s Health Assessment</li>
              <li>Sexual Health Assessment</li>
              <li>Child/Pediatric Health Assessment</li>
            </ul>
            <p>Our services provide informational insights and are not a substitute for professional medical advice.</p>

            <h4 className="mt-4 mb-3">2. Eligibility</h4>
            <p>You must be at least 18 years old to use our services. If you are under 18, use is permitted only under the supervision of a parent or legal guardian.</p>

            <h4 className="mt-4 mb-3">3. User Responsibilities</h4>
            <p>By using our platform, you agree:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li>To provide accurate and truthful information</li>
              <li>Not to misuse or attempt to disrupt the platform</li>
              <li>Not to use the platform for unlawful purposes</li>
            </ul>

            <h4 className="mt-4 mb-3">4. No Medical Advice</h4>
            <p>Limitless does not provide medical advice, diagnosis, or treatment. All content, assessments, and reports are for informational purposes only.</p>
            <p>Always consult a qualified healthcare professional for medical concerns.</p>

            <h4 className="mt-4 mb-3">5. Data & Privacy</h4>
            <p>Your use of our platform is also governed by our Privacy Policy.</p>
            <p>We implement reasonable measures to protect your data, but you acknowledge that no system is completely secure.</p>

            <h4 className="mt-4 mb-3">6. Intellectual Property</h4>
            <p>All content on this website, including text, graphics, logos, and software, is the property of Limitless and is protected by applicable intellectual property laws.</p>
            <p>You may not copy, reproduce, or distribute any content without prior written permission.</p>

            <h4 className="mt-4 mb-3">7. Limitation of Liability</h4>
            <p>To the fullest extent permitted by law, Limitless shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
            <p>Use of the platform is at your own risk.</p>

            <h4 className="mt-4 mb-3">8. Third-Party Services</h4>
            <p>Our platform may include links or integrations with third-party services. We are not responsible for their content or practices.</p>

            <h4 className="mt-4 mb-3">9. Termination</h4>
            <p>We reserve the right to suspend or terminate access to our services at any time, without notice, for violations of these terms.</p>

            <h4 className="mt-4 mb-3">10. Changes to Terms</h4>
            <p>We may update these Terms and Conditions at any time. Continued use of the platform constitutes acceptance of the updated terms.</p>

            <h4 className="mt-4 mb-3">11. Governing Law</h4>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United States.</p>

            <h4 className="mt-4 mb-3">12. Contact Information</h4>
            <p>If you have any questions regarding these Terms and Conditions, please contact us:</p>
            <p>
              Limitless Wellness<br/>
              7454 Old Alexandria Ferry Road<br/>
              Clinton, MD 20744, USA<br/>
              Email: <a href="mailto:info@limitlessworld.net">info@limitlessworld.net</a>
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

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DeleteAccountPage = () => {
  return (
    <>
      <Header />
      <section className="gap" style={{ backgroundColor: 'var(--bg-light)', paddingTop: '180px' }}>
        <div className="container" style={{ maxWidth: '950px' }}>
          <h1 className="text-center mb-5" style={{ color: '#222', fontWeight: '800' }}>How to Delete Your Account</h1>
          <div className="policy-content" style={{ backgroundColor: '#ffffff', padding: '60px', borderRadius: '30px', boxShadow: 'var(--shadow-lg)', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '20px' }}>
            <p>At Limitless, we value your privacy and make it easy for you to manage your data. If you wish to delete your account and all associated data, please follow the steps below.</p>
            
            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Step-by-Step Guide</h4>
            
            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>1. Submit a Deletion Request</h6>
            <p>Send an email to our support team from the email address associated with your account.</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li><strong>To:</strong> <a href="mailto:info@limitlessworld.net">info@limitlessworld.net</a></li>
              <li><strong>Subject:</strong> Account Deletion Request</li>
              <li><strong>Body:</strong> Please include your full name and confirm that you want your account and all associated data permanently deleted.</li>
            </ul>

            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>2. Verification Process</h6>
            <p>For security purposes, our team may reply to your email to verify your identity before proceeding with the deletion process.</p>

            <h6 className="mt-3" style={{ color: '#222', fontWeight: '600' }}>3. Account Deletion</h6>
            <p>Once verified, your account and all associated personal and assessment data will be permanently removed from our active systems within 30 days.</p>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>What Happens When You Delete Your Account?</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
              <li><strong>Loss of Data:</strong> All your assessment results, reports, and personal information will be permanently deleted and cannot be recovered.</li>
              <li><strong>Loss of Access:</strong> You will no longer be able to log in or access the dashboard.</li>
              <li><strong>Active Subscriptions:</strong> Any active subscriptions will be cancelled immediately. Please note that past payments are non-refundable.</li>
            </ul>

            <h4 className="mt-4 mb-3" style={{ color: 'var(--main-color)', fontWeight: '700', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Need Help?</h4>
            <p>If you have any questions or encounter issues while trying to delete your account, please contact our support team at <a href="mailto:info@limitlessworld.net">info@limitlessworld.net</a>. We are here to help.</p>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DeleteAccountPage;

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

const ChangePasswordModal = ({ isOpen, userId, onSuccess }) => {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPwd.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (newPwd !== confirmPwd) { setError('Passwords do not match.'); return; }

    setIsLoading(true);
    try {
      // 1. Fetch the stored temp_password and password_hash for verification
      const { data: user, error: fetchErr } = await supabase
        .from('users')
        .select('temp_password, password_hash')
        .eq('id', userId)
        .single();

      if (fetchErr || !user) throw new Error('Could not verify your identity.');

      // 2. Verify current password against temp password (plain) OR existing hash
      const matchesTempPwd = currentPwd === user.temp_password;
      const matchesHash = user.password_hash
        ? await bcrypt.compare(currentPwd, user.password_hash)
        : false;

      if (!matchesTempPwd && !matchesHash) {
        throw new Error('Current password is incorrect.');
      }

      // 3. Hash the new password and save
      const newHash = await bcrypt.hash(newPwd, 10);
      const { error: updateErr } = await supabase
        .from('users')
        .update({
          temp_password: newPwd,
          password_hash: newHash,
          password_reset_required: false,
        })
        .eq('id', userId);

      if (updateErr) throw new Error('Failed to update password. Please try again.');

      // 4. Update sessionStorage
      sessionStorage.setItem('passwordResetRequired', 'false');
      setSuccess(true);
      setTimeout(() => { onSuccess(); }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, backdropFilter: 'blur(8px)' }}>
      <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '440px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#0F172A', fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>Password Updated!</h3>
            <p style={{ color: '#64748B', fontSize: '18px' }}>You can now use your new password to log in.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '28px' }}>
              <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '16px' }}>🔐</div>
              <h2 style={{ color: '#0F172A', fontSize: '26px', fontWeight: '800', margin: '0 0 6px' }}>Set Your Password</h2>
              <p style={{ color: '#64748B', fontSize: '16px', margin: 0 }}>
                Your account was created with a temporary password. Please set a new one to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Current / Temporary Password', value: currentPwd, setter: setCurrentPwd, placeholder: 'Enter your temporary password' },
                { label: 'New Password', value: newPwd, setter: setNewPwd, placeholder: 'Min. 6 characters' },
                { label: 'Confirm New Password', value: confirmPwd, setter: setConfirmPwd, placeholder: 'Repeat new password' },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
                  <input
                    type="password"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                    onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                    onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                  />
                </div>
              ))}

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#EF4444', fontSize: '15px' }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{ padding: '14px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '17px', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '4px', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', fontFamily: 'inherit' }}
              >
                {isLoading ? 'Updating…' : 'Set New Password →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;

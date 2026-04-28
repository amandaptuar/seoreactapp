import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the desired admin credentials
    if (username === 'admin' && password === 'limitlessadmin') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin');
    } else if (username === 'admin@limitless.com' && password === 'limitlessadmin') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setErrorMsg('Wrong credentials');
    }
  };

  return (
    <section className="dark-glass-panel" style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Admin Login</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label htmlFor="admin-username" style={styles.label}>Username or Email</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="Enter admin username"
                required
              />
            </div>
            <div style={styles.field}>
              <label htmlFor="admin-password" style={styles.label}>Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter password"
                required
              />
            </div>

            {errorMsg && (
              <p style={styles.errorMsg}>
                ⚠️ {errorMsg}
              </p>
            )}

            <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    padding: '20px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    background: '#141414',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#ccc',
    fontSize: '14px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.3)',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  },
  submitBtn: {
    marginTop: '10px',
    width: '100%',
    padding: '14px',
    fontSize: '16px',
  },
  errorMsg: {
    color: '#ff6b6b',
    fontSize: '14px',
    textAlign: 'center',
    background: 'rgba(255,107,107,0.08)',
    border: '1px solid rgba(255,107,107,0.2)',
    borderRadius: '8px',
    padding: '10px',
    margin: 0,
  }
};

export default AdminLogin;

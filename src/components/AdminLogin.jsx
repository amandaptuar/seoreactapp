import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../lib/backendApi';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      // Credentials are verified by the backend (from environment variables)
      // and an admin JWT is stored for the admin API calls.
      await adminLogin(username, password);
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.status === 401 ? 'Wrong credentials' : err.message);
    } finally {
      setIsLoading(false);
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
    fontSize: '38px',
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
    fontSize: '21px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.3)',
    color: '#fff',
    fontSize: '23px',
    outline: 'none',
  },
  submitBtn: {
    marginTop: '10px',
    width: '100%',
    padding: '14px',
    fontSize: '23px',
  },
  errorMsg: {
    color: '#ff6b6b',
    fontSize: '21px',
    textAlign: 'center',
    background: 'rgba(255,107,107,0.08)',
    border: '1px solid rgba(255,107,107,0.2)',
    borderRadius: '8px',
    padding: '10px',
    margin: 0,
  }
};

export default AdminLogin;

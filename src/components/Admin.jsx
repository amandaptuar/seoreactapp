import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedEmail, setExpandedEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (email) => {
    setExpandedEmail(expandedEmail === email ? null : email);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin-login');
  };

  const deleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Delete user ${userEmail}? This cannot be undone.`)) return;
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      if (error) throw error;
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      alert('Failed to delete user: ' + err.message);
    }
  };

  return (
    <section style={styles.section}>
      <div className="container" style={{ maxWidth: '1200px', width: '100%', padding: '0 15px' }}>
        <div style={styles.headerRow}>
          <h2 style={styles.title}>Limitless Internal Dashboard</h2>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={styles.refreshBtn} onClick={fetchUsers}>
              ↻ Refresh Data
            </button>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#ccc', padding: '40px' }}>Loading records...</div>
        ) : error ? (
          <div style={styles.errorBox}>Error fetching data: {error}</div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#ccc', padding: '40px' }}>No users registered yet.</div>
        ) : (
          <div style={styles.grid}>
            {users.map(user => (
              <div key={user.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={styles.name} title={user.name}>{user.name || 'Unknown User'}</h3>
                    <div style={styles.email} title={user.email}>{user.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                  <div style={{...styles.pill, background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6'}}>
                    @{user.username || 'No Username'}
                  </div>
                  <div style={{
                    ...styles.pill,
                    background: user.payment_status === 'yes' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                    color: user.payment_status === 'yes' ? '#2ecc71' : '#e74c3c',
                    fontWeight: '600'
                  }}>
                    Payment: {user.payment_status === 'yes' ? 'Done' : 'Not Done'}
                  </div>
                  {user.ai_insights && (
                    <div style={{...styles.pill, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6'}}>
                      AI Generated
                    </div>
                  )}
                </div>

                <div style={styles.actionRow}>
                  <button 
                    className="btn btn-outline" 
                    style={styles.viewMoreBtn}
                    onClick={() => toggleExpand(user.email)}
                  >
                    {expandedEmail === user.email ? 'Close Details' : 'View Full Audit'}
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteUser(user.id, user.email)}
                  >
                    🗑 Delete User
                  </button>
                </div>

                {/* Expanded Details Area */}
                {expandedEmail === user.email && (
                  <div style={styles.expandedDetails}>
                    
                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>1. Account Details</h4>
                      <p><strong>Username:</strong> {user.username || 'N/A'}</p>
                      <p><strong>Password:</strong> {user.password || 'N/A'}</p>
                      <p><strong>Payment Status:</strong> <span style={{ color: user.payment_status === 'yes' ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>{user.payment_status === 'yes' ? 'Done' : 'Not Done'}</span></p>
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>2. Questionnaire Data</h4>
                      {user.questions ? (
                        <>
                           <p><strong>Total Score:</strong> {user.questions.totalScore || 'N/A'} / 112</p>
                           <p style={{wordBreak: 'break-all'}}><strong>Raw Answers:</strong> <span style={{fontSize: '12px', color: '#888'}}>{JSON.stringify(user.questions)}</span></p>
                        </>
                      ) : (
                        <p>No questionnaire data available.</p>
                      )}
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>3. AI Analysis Report</h4>
                      {user.ai_insights ? (
                        <>
                          <p><strong>Overall Score:</strong> {user.ai_insights.overallScore?.score || 'N/A'}</p>
                          <p><strong>Rating Level:</strong> {user.ai_insights.overallScore?.ratingLevel || 'N/A'}</p>
                          
                          <p style={{marginTop: '10px', fontWeight: 'bold', color: '#fff'}}>Risk Indicators:</p>
                          <p><strong>Stress Overload:</strong> {user.ai_insights.riskIndicators?.stressOverload || 'N/A'}</p>
                          <p><strong>Burnout Probability:</strong> {user.ai_insights.riskIndicators?.burnoutProbability || 'N/A'}</p>
                          <p><strong>Cognitive Fatigue:</strong> {user.ai_insights.riskIndicators?.cognitiveFatigue || 'N/A'}</p>

                          <p style={{marginTop: '10px', fontWeight: 'bold', color: '#fff'}}>Key Insights:</p>
                          <ul style={{ margin: 0, paddingLeft: '20px', color: '#ccc' }}>
                            {user.ai_insights.keyInsights?.map((insight, idx) => (
                              <li key={idx}>{insight}</li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p>No AI analysis generated yet.</p>
                      )}
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const styles = {
  section: {
    paddingTop: '100px',
    paddingBottom: '80px',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    backgroundImage: 'none',
    fontFamily: '"Inter", sans-serif'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '50px',
    flexWrap: 'wrap',
    gap: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    paddingBottom: '20px'
  },
  title: {
    color: '#ffffff',
    fontSize: '36px',
    fontWeight: '600',
    letterSpacing: '-0.5px',
    margin: 0
  },
  refreshBtn: {
    padding: '10px 20px',
    background: 'var(--primary)',
    border: 'none',
    color: '#000',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  logoutBtn: {
    padding: '10px 20px',
    background: 'transparent',
    border: '1px solid #ff6b6b',
    color: '#ff6b6b',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    alignItems: 'start',
    gap: '30px'
  },
  card: {
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    background: '#141414',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '10px'
  },
  name: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  email: {
    color: 'var(--primary)',
    fontSize: '14px',
    opacity: 0.9,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  pill: {
    background: 'rgba(233, 161, 50, 0.15)',
    color: 'var(--primary)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    whiteSpace: 'nowrap'
  },
  actionRow: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  viewMoreBtn: {
    width: '100%',
    padding: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    background: 'transparent',
    border: '1px solid var(--primary)',
    color: 'var(--primary)',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  deleteBtn: {
    width: '100%',
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#ef4444',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '13px',
    marginTop: '8px',
    transition: 'all 0.2s ease'
  },
  expandedDetails: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px dashed rgba(255,255,255,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#ccc'
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailTitle: {
    color: '#fff',
    fontSize: '16px',
    margin: '0 0 8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '4px'
  },
  errorBox: {
    color: '#ff6b6b',
    background: 'rgba(255,107,107,0.1)',
    border: '1px solid rgba(255,107,107,0.2)',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center'
  }
};

export default Admin;

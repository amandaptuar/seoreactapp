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
                  <div>
                    <h3 style={styles.name}>{user.name || 'Unknown User'}</h3>
                    <div style={styles.email}>{user.email}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={styles.pill}>{user.occupation || 'No Occupation'}</div>
                    <div style={{
                      ...styles.pill,
                      background: user.payment === 'yes' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                      color: user.payment === 'yes' ? '#2ecc71' : '#e74c3c',
                      fontWeight: '600'
                    }}>
                      Payment: {user.payment === 'yes' ? 'Done' : 'Not Done'}
                    </div>
                  </div>
                </div>

                <div style={styles.actionRow}>
                  <button 
                    className="btn btn-outline" 
                    style={styles.viewMoreBtn}
                    onClick={() => toggleExpand(user.email)}
                  >
                    {expandedEmail === user.email ? 'Close Details' : 'View Full Audit'}
                  </button>
                </div>

                {/* Expanded Details Area */}
                {expandedEmail === user.email && (
                  <div style={styles.expandedDetails}>
                    
                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>1. Basic Info</h4>
                      <p><strong>Payment Status:</strong> <span style={{ color: user.payment === 'yes' ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>{user.payment === 'yes' ? 'Done' : 'Not Done'}</span></p>
                      <p><strong>Age:</strong> {user.age || 'N/A'}</p>
                      <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
                      <p><strong>Height:</strong> {user.height || 'N/A'}</p>
                      <p><strong>Weight:</strong> {user.weight || 'N/A'}</p>
                      <p><strong>Job Type:</strong> {user.occupation_type || 'N/A'}</p>
                      <p><strong>Lifestyle:</strong> {user.lifestyle || 'N/A'}</p>
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>2. Goal Identification</h4>
                      <p><strong>Primary Goal:</strong> {user.primary_goal || 'N/A'}</p>
                      <p><strong>Target:</strong> {user.target_goal || 'N/A'}</p>
                      <p><strong>Timeline:</strong> {user.timeline || 'N/A'}</p>
                      <p><strong>Past Attempts:</strong> {user.past_attempts || 'N/A'}</p>
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>3. Daily Routine</h4>
                      <p><strong>Sleep Schedule:</strong> {user.sleep_times || 'N/A'}</p>
                      <p><strong>Work Hours:</strong> {user.working_hours || 'N/A'}</p>
                      <p><strong>Activity Level:</strong> {user.physical_activity || 'N/A'}</p>
                      <p><strong>Screen Time:</strong> {user.screen_time ? `${user.screen_time} hrs` : 'N/A'}</p>
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>4. Nutrition</h4>
                      <p><strong>Meals/Day:</strong> {user.meals_per_day || 'N/A'}</p>
                      <p><strong>Outside Food:</strong> {user.outside_food || 'N/A'}</p>
                      <p><strong>Daily Diet:</strong> {user.daily_diet || 'N/A'}</p>
                      <p><strong>Water Intake:</strong> {user.water_intake ? `${user.water_intake} L` : 'N/A'}</p>
                      <p><strong>Sugars/Caffeine:</strong> {user.caffeine_sugar || 'N/A'}</p>
                      <p><strong>Late Night Eating:</strong> {user.latenight_eating || 'N/A'}</p>
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>5. Health & Medical</h4>
                      <p><strong>Exercise:</strong> {user.exercises === 'yes' ? `${user.exercise_type} (${user.exercise_frequency}x / week)` : 'None'}</p>
                      <p><strong>Injuries:</strong> {user.injuries || 'None'}</p>
                      <p><strong>Conditions:</strong> {user.diagnosed_conditions || 'None'}</p>
                      <p><strong>Medications:</strong> {user.medications || 'None'}</p>
                      <p><strong>Family Hist.:</strong> {user.family_history || 'None'}</p>
                      <p><strong>Digestive:</strong> {user.digestive_issues || 'None'}</p>
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>6. Wellbeing</h4>
                      <p><strong>Stress Level:</strong> {user.stress_level || 'N/A'} ({user.stress_reasons || 'No reason provided'})</p>
                      <p><strong>Sleep Quality:</strong> {user.sleep_quality || 'N/A'} ({user.sleep_duration ? `${user.sleep_duration} hrs` : 'N/A'})</p>
                      <p><strong>Fatigue:</strong> {user.fatigue || 'N/A'}</p>
                      <p><strong>Mood Swings:</strong> {user.mood_swings || 'N/A'}</p>
                    </div>

                    <div style={styles.detailGroup}>
                      <h4 style={styles.detailTitle}>7. Commitment</h4>
                      <p><strong>Ready for Plan:</strong> {user.is_ready || 'N/A'}</p>
                      <p><strong>Has 30-60mins:</strong> {user.time_commitment || 'N/A'}</p>
                      <p><strong>Support System:</strong> {user.support_system || 'N/A'}</p>
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
    margin: '0 0 6px 0'
  },
  email: {
    color: 'var(--primary)',
    fontSize: '14px',
    opacity: 0.9
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

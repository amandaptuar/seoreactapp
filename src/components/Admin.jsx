import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      const mappedUsers = usersData.map(user => ({
        ...user,
        ai_insights: user.report_json || null,
        pdf_url: user.pdf_url || null,
      }));

      setUsers(mappedUsers);
      setLoading(false);
    } catch (err) {
      setError(err.message);
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
    if (window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
      try {
        // We append .select() so Supabase returns the deleted row.
        // If it returns an empty array, it means RLS silently blocked the delete.
        const { data, error } = await supabase.from('users').delete().eq('id', userId).select();

        if (error) throw error;

        if (!data || data.length === 0) {
          alert('Could not delete user. This is usually because Row Level Security (RLS) is enabled on the "users" table but no DELETE policy exists. Please add a DELETE policy in your Supabase dashboard.');
        } else {
          setUsers(users.filter(u => u.id !== userId));
        }
      } catch (err) {
        alert('Error deleting user: ' + err.message);
      }
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
              <div
                key={user.id}
                style={{ ...styles.card, cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onClick={() => navigate(`/admin/user/${user.id}`)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'; }}
              >
                <div style={styles.cardHeader}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={styles.name} title={user.name}>{user.name || 'Unknown User'}</h3>
                    <div style={styles.email} title={user.email}>{user.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                  <div style={{ ...styles.pill, background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
                    @{user.email || 'No Email'}
                  </div>
                  <div style={{
                    ...styles.pill,
                    background: user.payment_status === 'paid' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                    color: user.payment_status === 'paid' ? '#2ecc71' : '#e74c3c',
                    fontWeight: '600'
                  }}>
                    Payment: {user.payment_status === 'paid' ? 'Done' : 'Not Done'}
                  </div>
                  {user.ai_insights && (
                    <div style={{ ...styles.pill, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                      AI Generated
                    </div>
                  )}
                  {user.pdf_url && (
                    <div style={{ ...styles.pill, background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
                      PDF Generated
                    </div>
                  )}
                </div>

                <div style={styles.actionRow}>
                  <button
                    className="btn btn-outline"
                    style={styles.viewMoreBtn}
                    onClick={e => { e.stopPropagation(); navigate(`/admin/user/${user.id}`); }}
                  >
                    View Full Profile →
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={e => { e.stopPropagation(); deleteUser(user.id, user.email); }}
                  >
                    🗑 Delete User
                  </button>
                </div>

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
    fontSize: '47px',
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
    fontSize: '33px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  email: {
    color: 'var(--primary)',
    fontSize: '21px',
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
    fontSize: '18px',
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
    fontSize: '20px',
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
    fontSize: '21px',
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
    fontSize: '23px',
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

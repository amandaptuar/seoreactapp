import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminGetUsers, adminGetEnquiries, adminDeleteUser, adminUpdateUserStatus } from '../lib/backendApi';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Backend returns users newest-first with assessments[] plus the latest
      // report_json / pdf_url already mirrored onto each user.
      const usersData = await adminGetUsers();

      try {
        setEnquiries(await adminGetEnquiries());
      } catch {
        console.warn('Could not fetch enquiries.');
      }

      const mappedUsers = usersData.map(user => ({
        ...user,
        ai_insights: user.report_json || null,
      }));

      setUsers(mappedUsers);
      setLoading(false);
    } catch (err) {
      // Expired/missing admin token → back to login
      if (err.status === 401 || err.status === 403) {
        sessionStorage.removeItem('adminLoggedIn');
        navigate('/admin-login');
        return;
      }
      setError(err.message);
      setLoading(false);
    }
  };

  const toggleExpand = (email) => {
    setExpandedEmail(expandedEmail === email ? null : email);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    navigate('/admin-login');
  };

  const deleteUser = async (userId, userEmail) => {
    if (window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
      try {
        // Backend cascades: assessments and stored PDFs are removed too.
        await adminDeleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      } catch (err) {
        alert('Error deleting user: ' + err.message);
      }
    }
  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} selected users?`)) return;
    try {
      await Promise.all(selectedUsers.map(id => adminDeleteUser(id)));
      setUsers(users.filter(u => !selectedUsers.includes(u.id)));
      setSelectedUsers([]);
    } catch (err) {
      alert('Error deleting users: ' + err.message);
      fetchData();
    }
  };

  const handleBulkSuspend = async () => {
    if (selectedUsers.length === 0) return;
    if (!window.confirm(`Are you sure you want to suspend ${selectedUsers.length} selected users?`)) return;
    try {
      await Promise.all(selectedUsers.map(id => adminUpdateUserStatus(id, 'suspended')));
      setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, payment_status: 'suspended' } : u));
      setSelectedUsers([]);
      alert('Users suspended successfully');
    } catch (err) {
      alert('Error suspending users: ' + err.message);
      fetchData();
    }
  };

  const handleBulkUnsuspend = async () => {
    if (selectedUsers.length === 0) return;
    if (!window.confirm(`Are you sure you want to unsuspend ${selectedUsers.length} selected users?`)) return;
    try {
      await Promise.all(selectedUsers.map(id => adminUpdateUserStatus(id, 'paid')));
      setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, payment_status: 'paid' } : u));
      setSelectedUsers([]);
      alert('Users unsuspended successfully');
    } catch (err) {
      alert('Error unsuspending users: ' + err.message);
      fetchData();
    }
  };

  return (
    <section style={styles.section}>
      <div className="container" style={{ maxWidth: '1200px', width: '100%', padding: '0 15px' }}>
        <div style={styles.headerRow}>
          <h2 style={styles.title}>Limitless Internal Dashboard</h2>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={styles.refreshBtn} onClick={fetchData}>
              ↻ Refresh Data
            </button>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Tabs for switching views */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              style={{ ...styles.tabBtn, background: activeTab === 'users' ? 'var(--primary)' : 'transparent', color: activeTab === 'users' ? '#000' : 'var(--primary)' }}
              onClick={() => setActiveTab('users')}
            >
              Registered Users ({users.length})
            </button>
            <button 
              style={{ ...styles.tabBtn, background: activeTab === 'enquiries' ? 'var(--primary)' : 'transparent', color: activeTab === 'enquiries' ? '#000' : 'var(--primary)' }}
              onClick={() => setActiveTab('enquiries')}
            >
              Feedback & Enquiries ({enquiries.length})
            </button>
          </div>
          {activeTab === 'users' && selectedUsers.length > 0 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={styles.bulkSuspendBtn} onClick={handleBulkSuspend}>
                Suspend Selected ({selectedUsers.length})
              </button>
              <button style={styles.bulkUnsuspendBtn} onClick={handleBulkUnsuspend}>
                Unsuspend Selected ({selectedUsers.length})
              </button>
              <button style={styles.bulkDeleteBtn} onClick={handleBulkDelete}>
                Delete Selected ({selectedUsers.length})
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#ccc', padding: '40px' }}>Loading records...</div>
        ) : error ? (
          <div style={styles.errorBox}>Error fetching data: {error}</div>
        ) : activeTab === 'users' ? (
          users.length === 0 ? (
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                    <input 
                      type="checkbox" 
                      style={{ width: '20px', height: '20px', cursor: 'pointer', flexShrink: 0 }}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={styles.name} title={user.name}>{user.name || 'Unknown User'}</h3>
                      <div style={styles.email} title={user.email}>{user.email}</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                  <div style={{ ...styles.pill, background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
                    @{user.email || 'No Email'}
                  </div>
                  <div style={{
                    ...styles.pill,
                    background: user.payment_status === 'suspended' ? 'rgba(245, 158, 11, 0.15)' : user.payment_status === 'paid' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                    color: user.payment_status === 'suspended' ? '#f59e0b' : user.payment_status === 'paid' ? '#2ecc71' : '#e74c3c',
                    fontWeight: '600'
                  }}>
                    {user.payment_status === 'suspended' ? 'Status: Suspended' : `Payment: ${user.payment_status === 'paid' ? 'Done' : 'Not Done'}`}
                  </div>
                  {user.ai_insights && (
                    <div style={{ ...styles.pill, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                      {user.assessments?.length > 1 ? `${user.assessments.length} Assessments` : 'AI Generated'}
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
          )
        ) : (
          <div style={styles.grid}>
            {enquiries.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#ccc', padding: '40px', gridColumn: '1 / -1' }}>No feedback or enquiries found.</div>
            ) : enquiries.map(enquiry => (
              <div key={enquiry.id} style={{ ...styles.card, transition: 'transform 0.2s ease', cursor: 'default' }}>
                <div style={styles.cardHeader}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={styles.name} title={enquiry.name}>{enquiry.name || 'Anonymous'}</h3>
                    <div style={styles.email} title={enquiry.email}>{enquiry.email}</div>
                  </div>
                </div>
                <div style={{ 
                  color: '#e2e8f0', 
                  fontSize: '17px', 
                  lineHeight: '1.6', 
                  marginTop: '15px', 
                  background: 'rgba(255,255,255,0.03)', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  whiteSpace: 'pre-wrap'
                }}>
                  {enquiry.message}
                </div>
                <div style={{ marginTop: '15px', fontSize: '15px', color: '#64748b', fontWeight: '500' }}>
                  Received: {new Date(enquiry.created_at).toLocaleString()}
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
  bulkDeleteBtn: {
    padding: '10px 20px',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#ef4444',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  bulkSuspendBtn: {
    padding: '10px 20px',
    background: 'rgba(245,158,11,0.1)',
    border: '1px solid rgba(245,158,11,0.3)',
    color: '#f59e0b',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  bulkUnsuspendBtn: {
    padding: '10px 20px',
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    color: '#10b981',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
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
    textAlign: 'center'
  },
  tabBtn: {
    padding: '12px 24px',
    border: '1px solid var(--primary)',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }
};

export default Admin;

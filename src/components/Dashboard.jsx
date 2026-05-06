import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      const email = localStorage.getItem('userEmail');
      
      if (!email) {
        navigate('/');
        return;
      }

      try {
        // Fetch ai_insights from Supabase
        const { data, error } = await supabase
          .from('users')
          .select('ai_insights')
          .eq('email', email)
          .single();

        if (data && data.ai_insights) {
          setReport(data.ai_insights);
          setPdfUrl(localStorage.getItem('pdfUrl')); // Local fallback for PDF
        } else {
          // Fallback to localStorage if db fetch fails or is empty
          const savedReport = localStorage.getItem('assessmentReport');
          if (savedReport) {
            setReport(JSON.parse(savedReport));
            setPdfUrl(localStorage.getItem('pdfUrl'));
          } else {
            navigate('/');
          }
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        navigate('/');
      }
    };

    loadDashboardData();
  }, [navigate]);

  if (!report) return null;

  return (
    <section style={styles.section}>
      <div className="container" style={styles.container}>
        
        {/* Header Section */}
        <div style={styles.headerPanel}>
          <div>
            <h1 style={styles.title}>Your Cognitive Analysis</h1>
            <p style={styles.subtitle}>Personalized insights based on your recent assessment.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/')} 
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: '#94A3B8',
                border: '1px solid #334155',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = '#94A3B8'; }}
              onMouseLeave={(e) => { e.target.style.color = '#94A3B8'; e.target.style.borderColor = '#334155'; }}
            >
              ← Back to Home
            </button>
            {pdfUrl && (
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={styles.downloadBtn}>
                Download Full PDF Report
              </a>
            )}
          </div>
        </div>

        {/* Top Stats */}
        <div style={styles.gridTop}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Cognitive Score</h3>
            <div style={styles.scoreCircle}>
              <span style={styles.scoreText}>{report.overallScore.score}</span>
              <span style={styles.scoreMax}>/ 100</span>
            </div>
            <p style={styles.ratingText(report.overallScore.ratingLevel)}>
              Level: {report.overallScore.ratingLevel}
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Risk Indicators</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <strong style={{ color: '#E2E8F0' }}>Stress Overload</strong>
                <p style={{ margin: '5px 0 0', color: '#94A3B8', fontSize: '14px' }}>{report.riskIndicators.stressOverload}</p>
              </div>
              <div>
                <strong style={{ color: '#E2E8F0' }}>Burnout Probability</strong>
                <p style={{ margin: '5px 0 0', color: '#94A3B8', fontSize: '14px' }}>{report.riskIndicators.burnoutProbability}</p>
              </div>
              <div>
                <strong style={{ color: '#E2E8F0' }}>Cognitive Fatigue</strong>
                <p style={{ margin: '5px 0 0', color: '#94A3B8', fontSize: '14px' }}>{report.riskIndicators.cognitiveFatigue}</p>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Key Insights</h3>
            <ul style={styles.list}>
              {report.keyInsights.map((insight, idx) => (
                <li key={idx} style={styles.listItem}>
                  <span style={styles.bullet}>•</span> {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts Section */}
        <div style={styles.chartPanel}>
          <h3 style={styles.cardTitle}>Cognitive Functions Profile</h3>
          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={report.chartData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569' }} />
                <Radar name="Score" dataKey="A" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={styles.gridBottom}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Personalized Recommendations</h3>
            <ul style={styles.list}>
              {report.personalizedRecommendations.map((rec, idx) => (
                <li key={idx} style={styles.listItem}>
                  <span style={styles.check}>✓</span> {rec}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Improvement Plan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ color: '#10B981', margin: '0 0 10px 0' }}>7-Day Action Plan</h4>
                <ul style={styles.list}>
                  {report.improvementPlan.day7.map((action, idx) => (
                    <li key={idx} style={styles.listItem}><span style={styles.bullet}>•</span> {action}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#3B82F6', margin: '0 0 10px 0' }}>30-Day Roadmap</h4>
                <ul style={styles.list}>
                  {report.improvementPlan.day30.map((action, idx) => (
                    <li key={idx} style={styles.listItem}><span style={styles.bullet}>•</span> {action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '120px 0 80px',
    minHeight: '100vh',
    background: '#020617', // Dark theme for premium feel
    color: '#fff',
    fontFamily: "'Inter', sans-serif"
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  headerPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    margin: '0 0 10px 0',
    background: 'linear-gradient(90deg, #fff, #94A3B8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    color: '#94A3B8',
    margin: 0,
    fontSize: '16px'
  },
  downloadBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '700',
    borderRadius: '12px',
    transition: 'transform 0.2s',
    display: 'inline-block'
  },
  gridTop: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  },
  gridBottom: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)'
  },
  chartPanel: {
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '30px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#F59E0B',
    margin: '0 0 20px 0',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  scoreCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '8px solid #F59E0B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  scoreText: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#fff'
  },
  scoreMax: {
    fontSize: '16px',
    color: '#94A3B8',
    marginLeft: '5px',
    marginTop: '10px'
  },
  ratingText: (level) => ({
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '600',
    color: level.includes('Excellent') || level.includes('Good') ? '#10B981' : 
           level.includes('Risk') || level.includes('Critical') ? '#EF4444' : '#F59E0B'
  }),
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  listItem: {
    color: '#E2E8F0',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    lineHeight: '1.5'
  },
  bullet: {
    color: '#F59E0B',
    fontWeight: 'bold'
  },
  check: {
    color: '#10B981',
    fontWeight: 'bold'
  }
};

export default Dashboard;

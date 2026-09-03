import React, { useState, useEffect, useMemo } from 'react';
import { fetchScenarioLevers, fetchScenarioSimulation } from '../lib/apiUtils';

// Standard calibrated levers
const DEFAULT_LEVERS = [
  {
    key: 'sleepHours',
    label: 'Sleep Duration',
    unit: 'hours / night',
    min: 3.0,
    max: 10.0,
    step: 0.5,
    higherIsBetter: true,
    icon: '😴',
    tip: 'Aim for 7.5 to 8.5 hours for optimal memory consolidation and glymphatic clearance.'
  },
  {
    key: 'sleepQuality',
    label: 'Sleep Quality',
    unit: '1 (poor) to 5 (restorative)',
    min: 1.0,
    max: 5.0,
    step: 1.0,
    higherIsBetter: true,
    icon: '✨',
    tip: 'Subjective feeling of refreshment upon waking. Deep rest lowers daytime cortisol.'
  },
  {
    key: 'sleepVariability',
    label: 'Sleep Irregularity',
    unit: 'hours variation',
    min: 0.0,
    max: 4.0,
    step: 0.5,
    higherIsBetter: false,
    icon: '📊',
    tip: 'Difference between your earliest and latest bedtimes. Circadian rhythm thrives on consistency.'
  },
  {
    key: 'afterHoursWork',
    label: 'Work After 20:00',
    unit: 'days out of 5',
    min: 0.0,
    max: 1.0,
    step: 0.05,
    higherIsBetter: false,
    icon: '🌙',
    tip: 'Working late keeps sympathetic arousal high and disrupts melatonin secretion.'
  },
  {
    key: 'exerciseDays',
    label: 'Cardio / Exercise',
    unit: 'days / week',
    min: 0.0,
    max: 7.0,
    step: 1.0,
    higherIsBetter: true,
    icon: '🏃',
    tip: 'At least 20 minutes that elevate heart rate, boosting BDNF (brain plasticity).'
  },
  {
    key: 'recoveryBreaks',
    label: 'Screen-Free Breaks',
    unit: 'breaks / work day',
    min: 0.0,
    max: 6.0,
    step: 1.0,
    higherIsBetter: true,
    icon: '☕',
    tip: 'Intentional breaks away from screens (walking, stretching, breathing).'
  }
];

// 1-Click Strategy Presets
const PRESETS = [
  {
    name: '🌟 Deep Recovery',
    subtitle: 'Max Rest & Rejuvenation',
    target: {
      sleepHours: 8.5,
      sleepQuality: 4.0,
      sleepVariability: 0.5,
      afterHoursWork: 0.1,
      exerciseDays: 4.0,
      recoveryBreaks: 3.0
    }
  },
  {
    name: '🛡️ Burnout Shield',
    subtitle: 'Strict Evening Boundary',
    target: {
      sleepHours: 7.5,
      sleepQuality: 4.0,
      sleepVariability: 1.0,
      afterHoursWork: 0.0,
      exerciseDays: 3.0,
      recoveryBreaks: 4.0
    }
  },
  {
    name: '⚡ Peak Performance',
    subtitle: 'Athletic Focus & Regularity',
    target: {
      sleepHours: 8.0,
      sleepQuality: 5.0,
      sleepVariability: 0.5,
      afterHoursWork: 0.05,
      exerciseDays: 5.0,
      recoveryBreaks: 3.0
    }
  }
];

export default function WhatIfScenarioDashboard({
  analysis,
  userAge,
  userGender,
  isPaid,
  onOpenCoach,
  onBackToOverview
}) {
  const [leversList, setLeversList] = useState(DEFAULT_LEVERS);
  const [horizonWeeks, setHorizonWeeks] = useState(4.0);
  const [activePreset, setActivePreset] = useState('🌟 Deep Recovery');
  const [activeTab, setActiveTab] = useState('attribution'); // 'attribution' | 'science' | 'coach'

  // Default Baseline values
  const [baseline, setBaseline] = useState({
    sleepHours: 6.5,
    sleepQuality: 3.0,
    sleepVariability: 1.5,
    afterHoursWork: 0.4,
    exerciseDays: 2.0,
    recoveryBreaks: 1.0
  });

  // Target Goal values
  const [target, setTarget] = useState({
    sleepHours: 8.5,
    sleepQuality: 4.0,
    sleepVariability: 0.5,
    afterHoursWork: 0.1,
    exerciseDays: 4.0,
    recoveryBreaks: 3.0
  });

  const [projection, setProjection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load official levers from backend
  useEffect(() => {
    let isMounted = true;
    const loadLevers = async () => {
      try {
        const data = await fetchScenarioLevers();
        if (isMounted && data?.levers?.length > 0) {
          const merged = data.levers.map(l => {
            const fallback = DEFAULT_LEVERS.find(d => d.key === l.key);
            return {
              ...fallback,
              ...l,
              icon: fallback?.icon || '⚙️',
              tip: fallback?.tip || l.help
            };
          });
          setLeversList(merged);
        }
      } catch (err) {
        console.warn('Could not fetch remote levers, using calibrated defaults:', err.message);
      }
    };
    loadLevers();
    return () => { isMounted = false; };
  }, []);

  // Format analysis payload for scenario service
  const safeAnalysis = useMemo(() => {
    if (!analysis) return null;
    return {
      assessmentId: analysis.assessmentId || 'asmt_user',
      overall: analysis.overall || { score: 70 },
      domains: analysis.domains || {
        sleepRecovery: 60,
        mentalEnergy: 60,
        stressLoad: 60
      },
      lifestyleImpacts: analysis.lifestyleImpacts || {}
    };
  }, [analysis]);

  // Debounced API call to compute simulation
  useEffect(() => {
    if (!safeAnalysis) return;

    let isCancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchScenarioSimulation(
          safeAnalysis,
          baseline,
          target,
          horizonWeeks
        );
        if (!isCancelled) {
          setProjection(res);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Scenario simulation error:', err);
          setError(err.message || 'Failed to simulate scenario');
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [safeAnalysis, baseline, target, horizonWeeks]);

  const handleTargetChange = (key, val) => {
    const num = Number(val);
    setTarget(prev => ({ ...prev, [key]: num }));
    setActivePreset(null);
  };

  const stepTarget = (key, direction) => {
    const lever = leversList.find(l => l.key === key);
    if (!lever) return;
    const currentVal = target[key] ?? baseline[key] ?? lever.min;
    const newVal = direction === 'up'
      ? Math.min(lever.max, Number((currentVal + lever.step).toFixed(2)))
      : Math.max(lever.min, Number((currentVal - lever.step).toFixed(2)));
    handleTargetChange(key, newVal);
  };

  const applyPreset = (preset) => {
    setTarget(preset.target);
    setActivePreset(preset.name);
  };

  const handleReset = () => {
    setTarget({ ...baseline });
    setActivePreset(null);
  };

  const formatDisplayVal = (key, val) => {
    if (key === 'afterHoursWork') {
      return `${Math.round(val * 100)}%`;
    }
    return val;
  };

  const userName = sessionStorage.getItem('name') || 'User';
  const baselineOverall = analysis?.overall?.score ?? 70;

  return (
    <div className="whatif-cockpit">
      
      {/* ===== HEADER HERO ===== */}
      <div className="cockpit-hero">
        <div className="cockpit-hero-left">
          <div className="cockpit-badge-pill">
            <span className="live-dot" />
            <span>AI Predictive Simulation</span>
            <span className="hero-sep">•</span>
            <span>{userName}</span>
          </div>
          <h1 className="cockpit-title">
            What-If Scenario Simulator
          </h1>
          <p className="cockpit-subtitle">
            Move the lifestyle levers below to simulate how habit changes project onto your cognitive capacity over <strong>{horizonWeeks} weeks</strong>.
          </p>
        </div>

        {/* 1-Click Strategy Presets */}
        <div className="cockpit-presets-panel">
          <div className="presets-label">
            Instant Strategy Presets:
          </div>
          <div className="presets-button-row">
            {PRESETS.map(p => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className={`preset-pill ${activePreset === p.name ? 'active' : ''}`}
              >
                <span className="preset-name">{p.name}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="preset-pill reset"
              title="Reset target sliders to baseline"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* ===== MAIN GRID: LEVERS ON LEFT, RESULTS ON RIGHT ===== */}
      <div className="cockpit-layout-grid">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: INTERACTIVE LEVERS & TIMELINE               */}
        {/* ========================================================= */}
        <div className="cockpit-levers-column">
          
          {/* Timeline Horizon Card */}
          <div className="card cockpit-card">
            <div className="card-header-clean">
              <div>
                <h3 className="clean-title">
                  <span>⏱️ Projection Horizon</span>
                </h3>
                <p className="clean-desc">How long you sustain these lifestyle habits</p>
              </div>
              <div className="clean-badge indigo">
                {horizonWeeks} Weeks (~{projection?.rampFactor ? Math.round(projection.rampFactor * 100) : 74}% ramp)
              </div>
            </div>

            <div className="horizon-chips-row">
              {[2, 4, 8, 12, 16, 26].map(w => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setHorizonWeeks(w)}
                  className={`horizon-chip ${horizonWeeks === w ? 'active' : ''}`}
                >
                  {w}w
                </button>
              ))}
            </div>

            <div className="horizon-explanation-box">
              <span>💡</span>
              <span>
                At <strong>{horizonWeeks} weeks</strong>, ~{projection?.rampFactor ? Math.round(projection.rampFactor * 100) : 74}% of the biological adaptation takes effect.
              </span>
            </div>
          </div>

          {/* Lifestyle Levers Group */}
          <div className="card cockpit-card">
            <div className="card-header-clean">
              <div>
                <h3 className="clean-title">
                  <span>🎛️ Adjust Lifestyle Habits</span>
                </h3>
                <p className="clean-desc">Slide or tap +/- to set your target daily goals</p>
              </div>
            </div>

            <div className="levers-interactive-list">
              {leversList.map(lever => {
                const baseVal = baseline[lever.key] ?? lever.min;
                const tgtVal = target[lever.key] ?? baseVal;
                const delta = tgtVal - baseVal;
                const isImproved = lever.higherIsBetter ? delta > 0 : delta < 0;
                const hasChanged = Math.abs(delta) > 0.001;

                return (
                  <div key={lever.key} className="lever-interactive-card">
                    {/* Top Row */}
                    <div className="lever-card-top">
                      <div className="lever-title-group">
                        <span className="lever-emoji">{lever.icon}</span>
                        <div>
                          <div className="lever-name">{lever.label}</div>
                          <div className="lever-unit-tag">{lever.unit}</div>
                        </div>
                      </div>

                      {/* Score Value & Delta */}
                      <div className="lever-reading-group">
                        <span className="lever-base-reading">
                          Base: {formatDisplayVal(lever.key, baseVal)}
                        </span>
                        <span className="reading-arrow">➔</span>
                        <span className={`lever-tgt-reading ${hasChanged ? (isImproved ? 'pos' : 'neg') : ''}`}>
                          {formatDisplayVal(lever.key, tgtVal)}
                        </span>
                        {hasChanged && (
                          <span className={`lever-delta-badge ${isImproved ? 'pos' : 'neg'}`}>
                            {delta > 0 ? `+${formatDisplayVal(lever.key, delta)}` : formatDisplayVal(lever.key, delta)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper + Slider Control Row */}
                    <div className="lever-control-row">
                      <button
                        type="button"
                        onClick={() => stepTarget(lever.key, 'down')}
                        className="stepper-btn"
                        aria-label={`Decrease ${lever.label}`}
                      >
                        −
                      </button>

                      <input
                        type="range"
                        min={lever.min}
                        max={lever.max}
                        step={lever.step}
                        value={tgtVal}
                        onChange={(e) => handleTargetChange(lever.key, e.target.value)}
                        className="lever-slider"
                      />

                      <button
                        type="button"
                        onClick={() => stepTarget(lever.key, 'up')}
                        className="stepper-btn"
                        aria-label={`Increase ${lever.label}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Tip / Guidance */}
                    <div className="lever-tip-row">
                      <span>{lever.tip}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: PROJECTION SCORECARD & IMPACT ANALYSIS     */}
        {/* ========================================================= */}
        <div className="cockpit-results-column">
          
          {/* Transformation Hero Card */}
          <div className="hero-transformation-card">
            <div className="hero-trans-top">
              <span className="hero-trans-tag">PROJECTED COGNITIVE CAPACITY</span>
              <span className="hero-trans-status">
                {loading ? 'Calculating...' : '✨ Model Projected'}
              </span>
            </div>

            {/* Score Big Display */}
            <div className="hero-trans-numbers">
              <div className="number-group">
                <span className="number-label">Current Index</span>
                <span className="number-val before">
                  {projection?.headline ? Math.round(projection.headline.before) : '--'}
                </span>
              </div>

              <span className="trans-arrow">➔</span>

              <div className="number-group">
                <span className="number-label">Projected Index</span>
                <span className="number-val after">
                  {projection?.headline ? Math.round(projection.headline.after) : '--'}
                </span>
              </div>

              {projection?.headline?.delta ? (
                <div className="delta-celebrate-pill">
                  {projection.headline.delta > 0 ? `+${projection.headline.delta.toFixed(1)}` : projection.headline.delta.toFixed(1)} pts
                </div>
              ) : null}
            </div>

            {/* Natural language summary */}
            <div className="hero-trans-summary">
              {projection?.summary ? (
                <p>"{projection.summary}"</p>
              ) : (
                <p>Adjust any slider on the left to see your projected transformation.</p>
              )}
            </div>
          </div>

          {/* Movable Domains Comparative Breakdown */}
          <div className="card cockpit-card">
            <div className="card-header-clean">
              <div>
                <h3 className="clean-title">
                  <span>📈 Responsive Cognitive Domains</span>
                </h3>
                <p className="clean-desc">These 3 areas directly respond to lifestyle changes</p>
              </div>
            </div>

            <div className="domains-meter-list">
              {(projection?.movements || [
                { displayName: 'Sleep & Recovery', key: 'sleepRecovery', before: 60, after: 68, delta: 8, direction: 'up' },
                { displayName: 'Mental Energy', key: 'mentalEnergy', before: 58, after: 65, delta: 7, direction: 'up' },
                { displayName: 'Stress & Emotional Load', key: 'stressLoad', before: 65, after: 71, delta: 6, direction: 'up' }
              ]).map(domain => {
                const iconMap = {
                  sleepRecovery: '🌙',
                  mentalEnergy: '⚡',
                  stressLoad: '🧘'
                };
                const icon = iconMap[domain.key] || '📊';
                const isPositive = domain.delta >= 0;

                return (
                  <div key={domain.key} className="domain-meter-card">
                    <div className="meter-header">
                      <div className="meter-info">
                        <span className="meter-icon">{icon}</span>
                        <span className="meter-title">{domain.displayName}</span>
                      </div>

                      <div className="meter-values">
                        <span className="meter-before">{Math.round(domain.before)}</span>
                        <span className="reading-arrow">➔</span>
                        <span className={`meter-after ${isPositive ? 'pos' : 'neg'}`}>
                          {Math.round(domain.after)}
                        </span>
                        <span className={`meter-delta-tag ${isPositive ? 'pos' : 'neg'}`}>
                          {isPositive ? `+${domain.delta.toFixed(1)}` : domain.delta.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Visual Comparison Progress Rail */}
                    <div className="meter-rail">
                      <div
                        className="meter-rail-before"
                        style={{ width: `${Math.min(100, Math.max(0, domain.before))}%` }}
                      />
                      {isPositive ? (
                        <div
                          className="meter-rail-projected"
                          style={{
                            left: `${Math.min(100, Math.max(0, domain.before))}%`,
                            width: `${Math.min(100 - domain.before, Math.max(0, domain.delta))}%`
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deep Insights Tabs Area (Clean, Tabbed, User-Accessible) */}
          <div className="card cockpit-card">
            <div className="insights-tab-nav">
              <button
                type="button"
                onClick={() => setActiveTab('attribution')}
                className={`insights-tab-btn ${activeTab === 'attribution' ? 'active' : ''}`}
              >
                🔬 Why This Works ({projection?.contributions?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('science')}
                className={`insights-tab-btn ${activeTab === 'science' ? 'active' : ''}`}
              >
                🛡️ Scientific Integrity
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('coach')}
                className={`insights-tab-btn ${activeTab === 'coach' ? 'active' : ''}`}
              >
                🤖 AI Coach Action Plan
              </button>
            </div>

            <div className="insights-tab-content">
              {activeTab === 'attribution' && (
                <div className="tab-pane-attribution">
                  <p className="tab-pane-desc">
                    Here is exactly how your selected habit adjustments generate points:
                  </p>
                  <div className="attribution-rows-list">
                    {projection?.contributions?.slice(0, 6).map((c, i) => {
                      const leverObj = leversList.find(l => l.key === c.lever);
                      const domainLabel = c.domain === 'sleepRecovery' ? 'Sleep & Recovery' : c.domain === 'mentalEnergy' ? 'Mental Energy' : 'Stress Load';
                      return (
                        <div key={i} className="attribution-row-item">
                          <div className="attribution-left">
                            <span>{leverObj?.icon || '✦'}</span>
                            <strong>{leverObj?.label || c.lever}</strong>
                            <span className="arrow-sep">➔</span>
                            <span>{domainLabel}</span>
                          </div>
                          <span className="attribution-points">
                            +{c.points.toFixed(2)} pts
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'science' && (
                <div className="tab-pane-science">
                  <div className="science-notice-banner">
                    <strong>Honest Science:</strong> A what-if engine that inflated every score on the page would be a fantasy generator. 3 domains move because lifestyle levers have documented causal evidence; 4 do not:
                  </div>
                  <div className="unchanged-clean-list">
                    {(projection?.unchanged || [
                      {
                        displayName: 'Memory & Recall',
                        reason: 'A reported memory score is not something a lifestyle change moves predictably. Retaking the assessment is what tells you whether it has shifted.'
                      },
                      {
                        displayName: 'Cognitive Complaint Index',
                        reason: 'Built from reported cognitive complaints, which require retaking the test to evaluate accurately.'
                      },
                      {
                        displayName: 'Overall Score',
                        reason: 'The overall score is your verified measurement. Re-deriving it here would create conflicting numbers, so it remains unchanged.'
                      }
                    ]).map((u, i) => (
                      <div key={i} className="unchanged-clean-item">
                        <div className="unchanged-clean-title">• {u.displayName}</div>
                        <div className="unchanged-clean-reason">{u.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'coach' && (
                <div className="tab-pane-coach">
                  <p className="tab-pane-desc">
                    Ready to turn this simulation into a realistic daily routine? Discuss this projection with your Limitless AI Coach.
                  </p>
                  <div className="coach-quick-prompt-box">
                    <div className="prompt-head">Suggested question for your Coach:</div>
                    <div className="prompt-text">
                      "I want to increase my sleep to {target.sleepHours} hours and take {target.recoveryBreaks} screen-free breaks daily to reach a {projection?.headline ? Math.round(projection.headline.after) : 75} load index. What is the best schedule for my week?"
                    </div>
                  </div>
                  {onOpenCoach && (
                    <button
                      type="button"
                      onClick={onOpenCoach}
                      className="coach-launch-btn"
                    >
                      <span>🤖 Ask AI Coach to Build My Plan →</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Scientific Disclaimer */}
          <div className="scientific-caveat-text">
            <strong>Caveat: </strong>
            {projection?.caveat || 'This is a projection, not a measurement. It displays what the model computes based on your chosen inputs using documented effect sizes. Your baseline assessment scores remain intact.'}
          </div>

        </div>

      </div>

      {/* ===== MOBILE STICKY PROJECTION BAR ===== */}
      <div className="mobile-sticky-projection-bar">
        <div className="sticky-bar-info">
          <span className="sticky-label">Projected Load:</span>
          <span className="sticky-score">
            {projection?.headline ? `${Math.round(projection.headline.before)} ➔ ${Math.round(projection.headline.after)}` : '--'}
          </span>
          {projection?.headline?.delta ? (
            <span className="sticky-delta">
              +{projection.headline.delta.toFixed(1)} pts
            </span>
          ) : null}
        </div>
        {onOpenCoach && (
          <button
            type="button"
            onClick={onOpenCoach}
            className="sticky-coach-btn"
          >
            Coach 🤖
          </button>
        )}
      </div>

      {/* ===== RESPONSIVE CSS STYLES ===== */}
      <style>{`
        .whatif-cockpit {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Hero */
        .cockpit-hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%);
          border-radius: 20px;
          padding: 28px 32px;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(15,23,42,0.15);
        }
        .cockpit-hero-left {
          max-width: 620px;
          flex: 1 1 320px;
        }
        .cockpit-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.2);
          color: #C7D2FE;
          border: 1px solid rgba(99,102,241,0.35);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 10px;
        }
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 8px #34D399;
        }
        .hero-sep {
          color: #6366F1;
        }
        .cockpit-title {
          margin: 0 0 8px;
          font-size: 28px;
          font-weight: 900;
          letter-spacing: -0.5px;
          line-height: 1.25;
          color: #fff;
        }
        .cockpit-subtitle {
          margin: 0;
          font-size: 14px;
          color: #94A3B8;
          line-height: 1.5;
        }
        .cockpit-presets-panel {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 0 0 auto;
        }
        .presets-label {
          font-size: 11.5px;
          font-weight: 700;
          color: #A5B4FC;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .presets-button-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .preset-pill {
          background: rgba(255,255,255,0.08);
          color: #E2E8F0;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .preset-pill:hover {
          background: rgba(255,255,255,0.15);
        }
        .preset-pill.active {
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(99,102,241,0.4);
        }
        .preset-pill.reset {
          background: transparent;
          color: #94A3B8;
        }

        /* Layout Grid */
        .cockpit-layout-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          width: 100%;
        }
        .cockpit-levers-column,
        .cockpit-results-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }

        /* Clean Card Defaults */
        .cockpit-card {
          padding: 20px;
          border-radius: 16px;
        }
        .card-header-clean {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .clean-title {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          color: var(--text-dark);
        }
        .clean-desc {
          margin: 2px 0 0;
          font-size: 12px;
          color: var(--text-grey);
        }
        .clean-badge.indigo {
          background: #EEF2FF;
          color: #4F46E5;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
        }

        /* Horizon Chips */
        .horizon-chips-row {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }
        .horizon-chip {
          padding: 9px 0;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          background: var(--bg);
          color: var(--text-dark);
          transition: all 0.15s;
          text-align: center;
        }
        .horizon-chip.active {
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #fff;
          box-shadow: 0 3px 8px rgba(99,102,241,0.3);
        }
        .horizon-explanation-box {
          background: #F8FAFC;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 12px;
          color: var(--text-grey);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Levers List */
        .levers-interactive-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .lever-interactive-card {
          background: var(--bg);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid var(--border);
          transition: border-color 0.2s;
        }
        .lever-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .lever-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lever-emoji {
          font-size: 22px;
        }
        .lever-name {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-dark);
        }
        .lever-unit-tag {
          font-size: 11px;
          color: var(--text-grey);
        }
        .lever-reading-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .lever-base-reading {
          font-size: 12px;
          color: var(--text-grey);
          font-weight: 600;
        }
        .reading-arrow {
          font-size: 12px;
          color: var(--text-grey);
        }
        .lever-tgt-reading {
          font-size: 15px;
          font-weight: 900;
          color: var(--text-dark);
        }
        .lever-tgt-reading.pos { color: #10B981; }
        .lever-tgt-reading.neg { color: #EF4444; }
        .lever-delta-badge {
          font-size: 11.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 8px;
        }
        .lever-delta-badge.pos {
          background: #D1FAE5;
          color: #065F46;
        }
        .lever-delta-badge.neg {
          background: #FEE2E2;
          color: #991B1B;
        }

        /* Stepper + Range Slider Row */
        .lever-control-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .stepper-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #fff;
          border: 1px solid var(--border);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-dark);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .stepper-btn:hover {
          background: #EEF2FF;
          color: #4F46E5;
          border-color: #C7D2FE;
        }
        .lever-slider {
          flex: 1;
          accent-color: #6366F1;
          cursor: pointer;
          height: 8px;
        }
        .lever-tip-row {
          font-size: 11.5px;
          color: var(--text-grey);
          line-height: 1.4;
          font-style: italic;
        }

        /* Transformation Scorecard */
        .hero-transformation-card {
          background: linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%);
          border-radius: 16px;
          padding: 24px;
          color: #fff;
          box-shadow: 0 8px 24px rgba(15,23,42,0.15);
        }
        .hero-trans-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .hero-trans-tag {
          font-size: 11px;
          color: #A5B4FC;
          font-weight: 800;
          letter-spacing: 0.8px;
        }
        .hero-trans-status {
          background: rgba(16,185,129,0.2);
          color: #34D399;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
        }
        .hero-trans-numbers {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .number-group {
          display: flex;
          flex-direction: column;
        }
        .number-label {
          font-size: 11px;
          color: #94A3B8;
        }
        .number-val.before {
          font-size: 24px;
          font-weight: 700;
          color: #CBD5E1;
        }
        .trans-arrow {
          font-size: 22px;
          color: #6366F1;
          align-self: center;
        }
        .number-val.after {
          font-size: 40px;
          font-weight: 900;
          color: #38BDF8;
          line-height: 1;
        }
        .delta-celebrate-pill {
          background: rgba(52,211,153,0.18);
          color: #34D399;
          font-size: 16px;
          font-weight: 900;
          padding: 4px 12px;
          border-radius: 12px;
          align-self: center;
        }
        .hero-trans-summary p {
          margin: 0;
          font-size: 14px;
          color: #E2E8F0;
          line-height: 1.5;
        }

        /* Movable Domains Meters */
        .domains-meter-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .domain-meter-card {
          background: var(--bg);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid var(--border);
        }
        .meter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .meter-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .meter-icon { font-size: 18px; }
        .meter-title { font-size: 14px; font-weight: 800; color: var(--text-dark); }
        .meter-values {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .meter-before { font-size: 13px; color: var(--text-grey); font-weight: 600; }
        .meter-after { font-size: 16px; font-weight: 900; }
        .meter-after.pos { color: #10B981; }
        .meter-after.neg { color: #EF4444; }
        .meter-delta-tag {
          font-size: 11.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 8px;
        }
        .meter-delta-tag.pos { background: #D1FAE5; color: #065F46; }
        .meter-delta-tag.neg { background: #FEE2E2; color: #991B1B; }
        .meter-rail {
          height: 8px;
          background: #E2E8F0;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .meter-rail-before {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #94A3B8;
          border-radius: 4px;
        }
        .meter-rail-projected {
          position: absolute;
          top: 0;
          height: 100%;
          background: linear-gradient(90deg, #10B981, #059669);
          border-radius: 0 4px 4px 0;
        }

        /* Insights Tabs */
        .insights-tab-nav {
          display: flex;
          border-bottom: 1px solid var(--border);
          gap: 4px;
          margin-bottom: 16px;
          overflow-x: auto;
        }
        .insights-tab-btn {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-grey);
          cursor: pointer;
          white-space: nowrap;
        }
        .insights-tab-btn.active {
          color: #6366F1;
          border-bottom-color: #6366F1;
        }
        .tab-pane-desc {
          margin: 0 0 12px;
          font-size: 12.5px;
          color: var(--text-grey);
        }
        .attribution-rows-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .attribution-row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg);
          border-radius: 8px;
          padding: 9px 12px;
          font-size: 12.5px;
        }
        .attribution-left {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-dark);
        }
        .arrow-sep { color: var(--text-grey); }
        .attribution-points {
          font-weight: 900;
          color: #10B981;
        }

        .science-notice-banner {
          background: #FFFBEB;
          border: 1px solid #FEF3C7;
          border-radius: 10px;
          padding: 12px;
          font-size: 12px;
          color: #92400E;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .unchanged-clean-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .unchanged-clean-item {
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }
        .unchanged-clean-title {
          font-size: 13px;
          font-weight: 800;
          color: var(--text-dark);
        }
        .unchanged-clean-reason {
          font-size: 11.5px;
          color: var(--text-grey);
          margin-top: 2px;
          line-height: 1.4;
        }

        .coach-quick-prompt-box {
          background: var(--bg);
          border-radius: 10px;
          padding: 14px;
          border: 1px solid var(--border);
          margin-bottom: 14px;
        }
        .prompt-head {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-grey);
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .prompt-text {
          font-size: 13px;
          color: var(--text-dark);
          font-style: italic;
          line-height: 1.4;
        }
        .coach-launch-btn {
          width: 100%;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 18px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(99,102,241,0.3);
        }

        .scientific-caveat-text {
          font-size: 11px;
          color: var(--text-grey);
          line-height: 1.5;
          padding: 0 4px;
        }

        /* Mobile Sticky Footer */
        .mobile-sticky-projection-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0F172A;
          color: #fff;
          padding: 12px 16px;
          z-index: 999;
          box-shadow: 0 -4px 16px rgba(0,0,0,0.25);
          justify-content: space-between;
          align-items: center;
        }
        .sticky-bar-info {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .sticky-label {
          font-size: 12px;
          color: #94A3B8;
        }
        .sticky-score {
          font-size: 16px;
          font-weight: 900;
          color: #38BDF8;
        }
        .sticky-delta {
          font-size: 12px;
          font-weight: 800;
          background: #065F46;
          color: #34D399;
          padding: 1px 6px;
          border-radius: 6px;
        }
        .sticky-coach-btn {
          background: #6366F1;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 700;
        }

        /* ========================================================= */
        /* RESPONSIVENESS BREAKPOINTS                                */
        /* ========================================================= */

        @media (max-width: 992px) {
          .cockpit-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .cockpit-hero {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .cockpit-presets-panel {
            width: 100% !important;
          }
          .presets-button-row {
            width: 100% !important;
          }
          .preset-pill {
            flex: 1 1 auto !important;
            text-align: center !important;
          }
        }

        @media (max-width: 768px) {
          .cockpit-hero {
            padding: 20px 16px !important;
            border-radius: 16px !important;
          }
          .cockpit-title {
            font-size: 22px !important;
          }
          .mobile-sticky-projection-bar {
            display: flex !important;
          }
          .cockpit-card {
            padding: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .horizon-chips-row {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 6px !important;
          }
          .lever-card-top {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
          .lever-reading-group {
            width: 100% !important;
            justify-content: space-between !important;
          }
          .meter-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
          .meter-values {
            width: 100% !important;
            justify-content: space-between !important;
          }
          .hero-trans-numbers {
            gap: 10px !important;
          }
          .number-val.after {
            font-size: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

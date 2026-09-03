import React, { useState, useEffect, useMemo } from 'react';
import { fetchScenarioLevers, fetchScenarioSimulation } from '../lib/apiUtils';

// Fallback levers if the levers endpoint is cold-starting
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
    help: 'Typical night over the last two weeks, not your best one.'
  },
  {
    key: 'sleepQuality',
    label: 'Sleep Quality',
    unit: '1 (poor) to 5 (excellent)',
    min: 1.0,
    max: 5.0,
    step: 1.0,
    higherIsBetter: true,
    icon: '✨',
    help: 'How rested you feel on waking, not how long you were in bed.'
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
    help: 'The spread between shortest and longest nights. Regularity is separate from duration.'
  },
  {
    key: 'afterHoursWork',
    label: 'Work After 20:00',
    unit: 'fraction of working days',
    min: 0.0,
    max: 1.0,
    step: 0.05,
    higherIsBetter: false,
    icon: '🌙',
    help: 'Days in five where you are still working after eight in the evening.'
  },
  {
    key: 'exerciseDays',
    label: 'Exercise Frequency',
    unit: 'days / week',
    min: 0.0,
    max: 7.0,
    step: 1.0,
    higherIsBetter: true,
    icon: '🏃',
    help: 'Days with 20+ minutes that raised your heart rate.'
  },
  {
    key: 'recoveryBreaks',
    label: 'Deliberate Breaks',
    unit: 'breaks / work day',
    min: 0.0,
    max: 6.0,
    step: 1.0,
    higherIsBetter: true,
    icon: '☕',
    help: 'Breaks taken on purpose and away from a screen (not desk lunch).'
  }
];

// Presets for quick delight
const PRESETS = [
  {
    name: '🌟 Optimal Recovery',
    desc: 'High sleep quality, consistent bedtimes, screen-free breaks',
    target: {
      sleepHours: 8.0,
      sleepQuality: 4.0,
      sleepVariability: 0.5,
      afterHoursWork: 0.1,
      exerciseDays: 4.0,
      recoveryBreaks: 3.0
    }
  },
  {
    name: '🛡️ Burnout Shield',
    desc: 'Strict evening boundary & deliberate daytime resets',
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
    name: '⚡ High Performance',
    desc: 'Deep physical conditioning, restorative focus & regularity',
    target: {
      sleepHours: 8.5,
      sleepQuality: 5.0,
      sleepVariability: 0.5,
      afterHoursWork: 0.05,
      exerciseDays: 5.0,
      recoveryBreaks: 3.0
    }
  }
];

export default function ScenarioSimulator({ analysis, onOpenCoach = null }) {
  const [leversList, setLeversList] = useState(DEFAULT_LEVERS);
  const [horizonWeeks, setHorizonWeeks] = useState(4.0);
  const [activePreset, setActivePreset] = useState('🌟 Optimal Recovery');
  const [showUnchanged, setShowUnchanged] = useState(false);
  const [showContributions, setShowContributions] = useState(false);

  // Baseline "Current" values
  const [current, setCurrent] = useState({
    sleepHours: 6.5,
    sleepQuality: 3.0,
    sleepVariability: 1.5,
    afterHoursWork: 0.4,
    exerciseDays: 2.0,
    recoveryBreaks: 1.0
  });

  // Target "Goal" values
  const [target, setTarget] = useState({
    sleepHours: 8.0,
    sleepQuality: 4.0,
    sleepVariability: 0.5,
    afterHoursWork: 0.1,
    exerciseDays: 4.0,
    recoveryBreaks: 3.0
  });

  const [projection, setProjection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load official levers from backend on mount
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
              icon: fallback?.icon || '⚙️'
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
          current,
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
    }, 250); // 250ms debounce for buttery slider performance

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [safeAnalysis, current, target, horizonWeeks]);

  const handleCurrentChange = (key, val) => {
    setCurrent(prev => ({ ...prev, [key]: Number(val) }));
    setActivePreset(null);
  };

  const handleTargetChange = (key, val) => {
    setTarget(prev => ({ ...prev, [key]: Number(val) }));
    setActivePreset(null);
  };

  const applyPreset = (preset) => {
    setTarget(preset.target);
    setActivePreset(preset.name);
  };

  const handleResetToCurrent = () => {
    setTarget({ ...current });
    setActivePreset(null);
  };

  const formatDisplayVal = (key, val) => {
    if (key === 'afterHoursWork') {
      return `${Math.round(val * 100)}%`;
    }
    return val;
  };

  return (
    <div className="card scenario-card" style={{ marginTop: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '22px',
            boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
            flexShrink: 0
          }}>
            🔮
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)' }}>
                What-If Scenario Simulator
              </h3>
              <span style={{
                background: 'rgba(99,102,241,0.1)',
                color: '#6366F1',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Stateless Scenario Engine
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: 'var(--text-grey)' }}>
              Model how targeted lifestyle adjustments move your cognitive load domains over time
            </p>
          </div>
        </div>

        {/* Preset Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {PRESETS.map(p => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              style={{
                background: activePreset === p.name ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : '#fff',
                color: activePreset === p.name ? '#fff' : 'var(--text-dark)',
                border: activePreset === p.name ? 'none' : '1px solid var(--border)',
                borderRadius: '10px',
                padding: '7px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                boxShadow: activePreset === p.name ? '0 4px 12px rgba(99,102,241,0.25)' : 'none'
              }}
              title={p.desc}
            >
              {p.name}
            </button>
          ))}
          <button
            type="button"
            onClick={handleResetToCurrent}
            style={{
              background: 'transparent',
              color: 'var(--text-grey)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '7px 12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Reset targets to match your current baseline"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Simulation Layout */}
      <div className="scenario-main-grid">
        
        {/* LEFT COLUMN: Horizon & Lever Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Horizon Selector Card */}
          <div style={{
            background: 'var(--bg)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '15px' }}>⏱️</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Time Horizon
                </span>
              </div>
              <div style={{
                background: '#fff',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 800,
                color: '#6366F1',
                border: '1px solid rgba(99,102,241,0.2)'
              }}>
                {horizonWeeks} Weeks {projection?.rampFactor && `(~${Math.round(projection.rampFactor * 100)}% effect)`}
              </div>
            </div>

            {/* Horizon Buttons */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              {[2, 4, 8, 12, 16, 26].map(w => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setHorizonWeeks(w)}
                  style={{
                    flex: 1,
                    padding: '6px 0',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: horizonWeeks === w ? '#6366F1' : '#fff',
                    color: horizonWeeks === w ? '#fff' : 'var(--text-dark)',
                    boxShadow: horizonWeeks === w ? '0 2px 6px rgba(99,102,241,0.3)' : 'none',
                    transition: 'all 0.15s'
                  }}
                >
                  {w}w
                </button>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-grey)' }}>
              Effects ramp gradually over weeks. Shorter horizons capture early adaptation; longer horizons show stabilized gains.
            </p>
          </div>

          {/* Levers List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-grey)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Lifestyle Levers
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>
                Baseline vs. Target
              </span>
            </div>

            {leversList.map(lever => {
              const curVal = current[lever.key] ?? lever.min;
              const tgtVal = target[lever.key] ?? curVal;
              const delta = tgtVal - curVal;
              const isImproved = lever.higherIsBetter ? delta > 0 : delta < 0;
              const hasChanged = Math.abs(delta) > 0.001;

              return (
                <div
                  key={lever.key}
                  style={{
                    background: '#fff',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'border-color 0.2s'
                  }}
                >
                  {/* Lever Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>{lever.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>
                          {lever.label}
                        </div>
                        <div style={{ fontSize: '10.5px', color: 'var(--text-grey)' }}>
                          {lever.unit}
                        </div>
                      </div>
                    </div>

                    {/* Diff Indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>
                        {formatDisplayVal(lever.key, curVal)}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>➔</span>
                      <span style={{
                        fontSize: '12.5px',
                        fontWeight: 800,
                        color: hasChanged ? (isImproved ? '#10B981' : '#EF4444') : 'var(--text-dark)'
                      }}>
                        {formatDisplayVal(lever.key, tgtVal)}
                      </span>
                      {hasChanged && (
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          background: isImproved ? '#ECFDF5' : '#FEF2F2',
                          color: isImproved ? '#059669' : '#DC2626',
                          padding: '1px 6px',
                          borderRadius: '6px'
                        }}>
                          {delta > 0 ? `+${formatDisplayVal(lever.key, delta)}` : formatDisplayVal(lever.key, delta)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Target Slider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="range"
                      min={lever.min}
                      max={lever.max}
                      step={lever.step}
                      value={tgtVal}
                      onChange={(e) => handleTargetChange(lever.key, e.target.value)}
                      style={{
                        flex: 1,
                        accentColor: '#6366F1',
                        cursor: 'pointer',
                        height: '6px'
                      }}
                    />
                  </div>

                  {/* Baseline Adjuster */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-grey)', fontStyle: 'italic' }}>
                      {lever.help}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: 'var(--text-grey)' }}>
                      <span>Base:</span>
                      <select
                        value={curVal}
                        onChange={(e) => handleCurrentChange(lever.key, e.target.value)}
                        style={{
                          fontSize: '10.5px',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          background: '#F8FAFC',
                          color: 'var(--text-dark)',
                          padding: '1px 4px',
                          cursor: 'pointer'
                        }}
                      >
                        {Array.from({ length: Math.round((lever.max - lever.min) / lever.step) + 1 }).map((_, idx) => {
                          const val = Number((lever.min + idx * lever.step).toFixed(2));
                          return (
                            <option key={val} value={val}>
                              {formatDisplayVal(lever.key, val)}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: Projection Visuals & Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Headline Summary Card */}
          <div style={{
            background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '22px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(15,23,42,0.15)'
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#A5B4FC', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Projected Load Capacity
                </span>
                <h4 style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                  Modifiable Load Index
                </h4>
              </div>

              {/* Status Badge */}
              <div style={{
                background: loading ? 'rgba(255,255,255,0.1)' : 'rgba(16,185,129,0.15)',
                color: loading ? '#E2E8F0' : '#34D399',
                border: loading ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(16,185,129,0.3)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {loading ? 'Calculating...' : '✨ Model Projected'}
              </div>
            </div>

            {/* Score Comparison Display */}
            {projection?.headline ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Current: </span>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#E2E8F0' }}>
                      {Math.round(projection.headline.before)}
                    </span>
                  </div>
                  <span style={{ fontSize: '20px', color: '#6366F1' }}>➔</span>
                  <div>
                    <span style={{ fontSize: '11px', color: '#A5B4FC' }}>Projected: </span>
                    <span style={{ fontSize: '36px', fontWeight: 900, color: '#38BDF8', lineHeight: 1 }}>
                      {Math.round(projection.headline.after)}
                    </span>
                  </div>
                  {projection.headline.delta !== 0 && (
                    <div style={{
                      background: projection.headline.delta > 0 ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)',
                      color: projection.headline.delta > 0 ? '#34D399' : '#F87171',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 800,
                      alignSelf: 'center'
                    }}>
                      {projection.headline.delta > 0 ? `+${projection.headline.delta.toFixed(1)}` : projection.headline.delta.toFixed(1)} pts
                    </div>
                  )}
                </div>

                <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                  {projection.summary}
                </p>
              </div>
            ) : (
              <div style={{ padding: '16px 0', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
                Adjust any lever to generate your customized what-if projection.
              </div>
            )}
          </div>

          {/* Movable Domains Breakdown */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dark)' }}>
                📈 Movable Domains Breakdown
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>
                Target vs Baseline
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                  <div
                    key={domain.key}
                    style={{
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 14px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{icon}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>
                          {domain.displayName}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                          {Math.round(domain.before)}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-grey)' }}>➔</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: isPositive ? '#10B981' : '#EF4444' }}>
                          {Math.round(domain.after)}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          background: isPositive ? '#D1FAE5' : '#FEE2E2',
                          color: isPositive ? '#065F46' : '#991B1B',
                          padding: '1px 6px',
                          borderRadius: '6px'
                        }}>
                          {isPositive ? `+${domain.delta.toFixed(1)}` : domain.delta.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Visual Comparison Progress Bar */}
                    <div style={{ height: '7px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                      {/* Before bar */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${Math.min(100, Math.max(0, domain.before))}%`,
                        background: '#94A3B8',
                        borderRadius: '4px'
                      }} />
                      {/* Projected extension bar */}
                      {isPositive ? (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: `${Math.min(100, Math.max(0, domain.before))}%`,
                          height: '100%',
                          width: `${Math.min(100 - domain.before, Math.max(0, domain.delta))}%`,
                          background: 'linear-gradient(90deg, #10B981, #059669)',
                          borderRadius: '0 4px 4px 0'
                        }} />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lever Contributions Accordion ("Show the Working") */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            overflow: 'hidden'
          }}>
            <button
              type="button"
              onClick={() => setShowContributions(!showContributions)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-dark)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🔍</span>
                <span>Contribution Breakdown ({projection?.contributions?.length || 0} pathways)</span>
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                {showContributions ? '▲ Hide' : '▼ Show Working'}
              </span>
            </button>

            {showContributions && (
              <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-grey)' }}>
                  Which lifestyle lever moves which cognitive domain, ranked by total points delivered:
                </p>
                {projection?.contributions?.slice(0, 6).map((c, i) => {
                  const leverObj = leversList.find(l => l.key === c.lever);
                  const domainLabel = c.domain === 'sleepRecovery' ? 'Sleep & Recovery' : c.domain === 'mentalEnergy' ? 'Mental Energy' : 'Stress Load';
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{leverObj?.icon || '✦'}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{leverObj?.label || c.lever}</span>
                        <span style={{ color: 'var(--text-grey)' }}>➔ {domainLabel}</span>
                      </div>
                      <span style={{ fontWeight: 800, color: '#10B981' }}>
                        +{c.points.toFixed(2)} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Unchanged Domains / Scientific Integrity Accordion */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            overflow: 'hidden'
          }}>
            <button
              type="button"
              onClick={() => setShowUnchanged(!showUnchanged)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-dark)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🛡️</span>
                <span>Scientific Integrity: Unchanged Domains ({projection?.unchanged?.length || 3})</span>
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-grey)' }}>
                {showUnchanged ? '▲ Hide' : '▼ Why not all move?'}
              </span>
            </button>

            {showUnchanged && (
              <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: '#FFFBEB', borderRadius: '8px', padding: '10px', border: '1px solid #FEF3C7', fontSize: '11.5px', color: '#92400E' }}>
                  <strong>Stateless Scientific Principle:</strong> A model that moved every number on the page would be a fantasy generator. Three domains move because lifestyle levers have direct evidence; four do not, and each explains why.
                </div>
                {(projection?.unchanged || [
                  {
                    displayName: 'Memory & Recall',
                    reason: 'A reported memory score is not something a lifestyle change moves predictably. Retaking the assessment is what tells you whether it has shifted.'
                  },
                  {
                    displayName: 'Cognitive Complaint Index',
                    reason: 'Built from reported cognitive sections which are not projected from lifestyle levers alone.'
                  },
                  {
                    displayName: 'Overall Score',
                    reason: 'The overall score is the assessment product’s own composite. Re-deriving it here would produce a second conflicting number, so it is reported unchanged.'
                  }
                ]).map((u, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)' }}>
                      • {u.displayName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-grey)', marginTop: '2px', lineHeight: 1.4 }}>
                      {u.reason}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Coach Action Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(99,102,241,0.05)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🤖</span>
              <span style={{ fontSize: '12.5px', color: 'var(--text-dark)', fontWeight: 600 }}>
                Have questions about how to reach these goals?
              </span>
            </div>
            {onOpenCoach && (
              <button
                type="button"
                onClick={onOpenCoach}
                style={{
                  background: '#6366F1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(99,102,241,0.25)'
                }}
              >
                Discuss with AI Coach →
              </button>
            )}
          </div>

          {/* Model Caveat & Provenance Notice */}
          <div style={{ fontSize: '11px', color: 'var(--text-grey)', lineHeight: 1.4, padding: '0 4px' }}>
            <span style={{ fontWeight: 600 }}>Caveat: </span>
            {projection?.caveat || 'This is a projection, not a measurement and not a prediction. It shows what the model does with the inputs you set, using effect sizes that are a documented judgement rather than a fitted result. Your assessment scores remain unchanged.'}
          </div>

        </div>

      </div>

      <style>{`
        .scenario-card input[type=range] {
          -webkit-appearance: none;
          background: #E2E8F0;
          border-radius: 4px;
        }
        .scenario-card input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #6366F1;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(99,102,241,0.4);
          transition: transform 0.1s;
        }
        .scenario-card input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .scenario-main-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          width: 100%;
        }
        @media (max-width: 900px) {
          .scenario-main-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

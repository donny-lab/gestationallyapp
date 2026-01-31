import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════
// GESTATIONAL.LY V15.1 - Bug Fixes
// Fixed: AI input, Journal input, Modal re-rendering
// ═══════════════════════════════════════════════════════════════

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BG = `radial-gradient(ellipse at 30% 20%, rgba(255, 180, 150, 0.4) 0%, transparent 50%),
  radial-gradient(ellipse at 70% 60%, rgba(200, 170, 255, 0.3) 0%, transparent 50%),
  radial-gradient(ellipse at 20% 80%, rgba(150, 200, 255, 0.25) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(255, 200, 230, 0.3) 0%, transparent 50%),
  linear-gradient(160deg, #fef5f0 0%, #f8f0ff 30%, #f0f5ff 60%, #fff5f8 100%)`;

const Orb = ({ size, top, left, color, blur = 60 }) => (
  <div style={{ position: 'absolute', width: size, height: size, top, left, background: color, borderRadius: '50%', filter: `blur(${blur}px)`, opacity: 0.6, pointerEvents: 'none', zIndex: 0 }} />
);

const C = {
  accent: '#c77d6e', accentDark: '#a86558', accentLight: 'rgba(199, 125, 110, 0.15)',
  success: '#6faf7a', successLight: 'rgba(111, 175, 122, 0.15)',
  warning: '#c9a066', warningLight: 'rgba(201, 160, 102, 0.15)',
  text: '#1a1a1a', textSecondary: '#4a4a4a', textMuted: '#7a7a7a', textLight: '#a0a0a0',
};

const Glass = ({ children, style, onClick, variant = 'default', intensity = 'normal', glow = false }) => {
  const intensities = { subtle: { bg: 'rgba(255,255,255,0.45)', blur: 16, border: 'rgba(255,255,255,0.5)' }, normal: { bg: 'rgba(255,255,255,0.6)', blur: 24, border: 'rgba(255,255,255,0.7)' }, strong: { bg: 'rgba(255,255,255,0.75)', blur: 32, border: 'rgba(255,255,255,0.85)' } };
  const variants = { default: { tint: 'transparent', glowColor: 'rgba(255,255,255,0.5)' }, accent: { tint: 'rgba(199, 125, 110, 0.1)', glowColor: 'rgba(199, 125, 110, 0.25)' }, success: { tint: 'rgba(111, 175, 122, 0.1)', glowColor: 'rgba(111, 175, 122, 0.25)' }, warning: { tint: 'rgba(201, 160, 102, 0.12)', glowColor: 'rgba(201, 160, 102, 0.25)' } };
  const i = intensities[intensity] || intensities.normal; const v = variants[variant] || variants.default;
  return (<div onClick={onClick} style={{ position: 'relative', background: i.bg, backdropFilter: `blur(${i.blur}px) saturate(180%)`, WebkitBackdropFilter: `blur(${i.blur}px) saturate(180%)`, borderRadius: 20, border: `1px solid ${i.border}`, boxShadow: `0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.9)${glow ? `, 0 0 30px ${v.glowColor}` : ''}`, padding: 20, cursor: onClick ? 'pointer' : 'default', transition: 'all 0.25s ease', ...style }}><div style={{ position: 'absolute', inset: 0, background: v.tint, borderRadius: 20, pointerEvents: 'none' }} /><div style={{ position: 'relative', zIndex: 1 }}>{children}</div></div>);
};

const GlassPill = ({ children, color = C.accent }) => (<span style={{ display: 'inline-block', padding: '5px 12px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, color }}>{children}</span>);

const GlassButton = ({ children, onClick, variant = 'primary', disabled, fullWidth, size = 'normal', style }) => {
  const sizes = { small: { p: '10px 16px', fs: 14 }, normal: { p: '14px 24px', fs: 15 }, large: { p: '18px 32px', fs: 16 } }; const s = sizes[size]; const isPrimary = variant === 'primary';
  return (<button onClick={disabled ? undefined : onClick} style={{ padding: s.p, fontSize: s.fs, fontWeight: 600, borderRadius: 16, background: isPrimary ? `linear-gradient(135deg, ${C.accent}, ${C.accentDark})` : 'rgba(255,255,255,0.7)', color: isPrimary ? 'white' : C.text, border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.7)', boxShadow: isPrimary ? '0 6px 20px rgba(199,125,110,0.35)' : '0 4px 12px rgba(0,0,0,0.06)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, width: fullWidth ? '100%' : 'auto', fontFamily: 'inherit', transition: 'all 0.2s', ...style }}>{children}</button>);
};

const GlassProgress = ({ value, size = 80 }) => {
  const stroke = 8, radius = (size - stroke) / 2, circ = radius * 2 * Math.PI, offset = circ - (value / 100) * circ;
  return (<div style={{ position: 'relative', width: size, height: size }}><div style={{ position: 'absolute', inset: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }} /><svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}><defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={C.accent}/><stop offset="100%" stopColor="#9070a0"/></linearGradient></defs><circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} /><circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="url(#pg)" strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} /></svg></div>);
};

// MODAL COMPONENT - Defined OUTSIDE App to prevent re-render issues
const ModalWrapper = ({ isOpen, title, onClose, children, container }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,252,250,0.92)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', zIndex: 100, overflowY: 'auto', padding: 20 }}>
      <div style={container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{title}</h2>
          <Glass onClick={onClose} intensity="subtle" style={{ padding: 8, borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </Glass>
        </div>
        {children}
      </div>
    </div>
  );
};

const Icons = {
  logo: () => <svg width="44" height="44" viewBox="0 0 44 44" fill="none"><defs><linearGradient id="lg1" x1="0" y1="0" x2="44" y2="44"><stop stopColor={C.accent}/><stop offset="1" stopColor="#9070a0"/></linearGradient></defs><circle cx="22" cy="22" r="20" stroke="url(#lg1)" strokeWidth="1.5" opacity="0.3"/><circle cx="22" cy="22" r="12" stroke="url(#lg1)" strokeWidth="2" opacity="0.6"/><circle cx="22" cy="22" r="5" fill="url(#lg1)"/></svg>,
  home: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 10.5V20a1 1 0 001 1h5v-6a1 1 0 011-1h4a1 1 0 011 1v6h5a1 1 0 001-1v-9.5" stroke={a ? C.accent : C.textMuted} strokeWidth="1.5" fill={a ? C.accentLight : 'none'}/><path d="M2 12l10-9 10 9" stroke={a ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  learn: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke={a ? C.accent : C.textMuted} strokeWidth="1.5" fill={a ? C.accentLight : 'none'}/><path d="M8 6h8M8 10h8M8 14h5" stroke={a ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  heart: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill={a ? C.accentLight : 'none'}><path d="M12 19s-6-4-6-9a4 4 0 018 0 4 4 0 018 0c0 5-6 9-6 9z" stroke={a ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  profile: (a) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={a ? C.accent : C.textMuted} strokeWidth="1.5" fill={a ? C.accentLight : 'none'}/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={a ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  check: (c='white') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"><path d="M4 12l6 6L20 6"/></svg>,
  chevron: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textLight} strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>,
  close: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill={C.warningLight} stroke={C.warning} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 7v5M12 16h.01" strokeLinecap="round"/></svg>,
  journal: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill={C.accentLight} stroke={C.textMuted} strokeWidth="1.5"/><path d="M14 2v6h6M12 18v-6M9 15h6" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  calculator: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" fill={C.successLight} stroke={C.textMuted} strokeWidth="1.5"/><rect x="7" y="5" width="10" height="4" rx="1" stroke={C.textMuted} strokeWidth="1.5"/><circle cx="8" cy="13" r="1" fill={C.textMuted}/><circle cx="12" cy="13" r="1" fill={C.textMuted}/><circle cx="16" cy="13" r="1" fill={C.textMuted}/><circle cx="8" cy="17" r="1" fill={C.textMuted}/><circle cx="12" cy="17" r="1" fill={C.textMuted}/><circle cx="16" cy="17" r="1" fill={C.textMuted}/></svg>,
  timeline: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.5" fill="rgba(160,130,200,0.2)" stroke={C.textMuted} strokeWidth="1.5"/><circle cx="6" cy="18" r="2.5" fill={C.accentLight} stroke={C.textMuted} strokeWidth="1.5"/><path d="M6 8.5v7M8.5 6h9a2 2 0 012 2v2M8.5 18h9a2 2 0 002-2v-2" stroke={C.textMuted} strokeWidth="1.5"/></svg>,
  support: () => <svg width="26" height="26" viewBox="0 0 24 24" fill={C.accentLight}><path d="M12 19s-6-4-6-9a4 4 0 018 0 4 4 0 018 0c0 5-6 9-6 9z" stroke={C.textMuted} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  medical: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" fill={C.accentLight}/><path d="M12 7v10M7 12h10" stroke={C.accent} strokeWidth="2" strokeLinecap="round"/></svg>,
  legal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(160,130,200,0.15)"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8070a0" strokeWidth="1.5"/></svg>,
  financial: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={C.successLight}/><path d="M12 6v12M8 9c0-1.5 1.5-2 4-2s4 .5 4 2-1.5 2-4 2-4 .5-4 2 1.5 2 4 2" stroke={C.success} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  wellness: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={C.warningLight}/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke={C.warning} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  ai: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={C.accentLight} stroke={C.accent} strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke={C.accent} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" fill={C.accent} opacity="0.3"/></svg>,
  target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={C.accent} strokeWidth="1.5" opacity="0.3"/><circle cx="12" cy="12" r="5" stroke={C.accent} strokeWidth="1.5" opacity="0.6"/><circle cx="12" cy="12" r="2" fill={C.accent}/></svg>,
  logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  email: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>,
  lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  sparkle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/></svg>,
  send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill={C.accent}><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>,
};

// ═══════════════════════════════════════════════════════════════
// SMART AI ASSISTANT - Comprehensive Knowledge Base
// ═══════════════════════════════════════════════════════════════
const STATE_INFO = {
  'California': { type: 'favorable', prebirth: true, notes: 'Gold standard for surrogacy. Pre-birth orders available. Both genetic and non-genetic parents recognized.' },
  'Nevada': { type: 'favorable', prebirth: true, notes: 'Very surrogacy-friendly. Pre-birth orders available. No genetic link required.' },
  'Washington': { type: 'favorable', prebirth: true, notes: 'Clear statutes since 2019. Pre-birth orders available.' },
  'Illinois': { type: 'favorable', prebirth: true, notes: 'Strong surrogacy law since 2005. Chicago is a major hub.' },
  'New York': { type: 'favorable', prebirth: true, notes: 'Legalized compensated surrogacy in 2021. Growing destination.' },
  'Connecticut': { type: 'favorable', prebirth: true, notes: 'Very favorable with clear legal pathways.' },
  'Oregon': { type: 'favorable', prebirth: true, notes: 'Surrogacy-friendly with pre-birth orders.' },
  'Texas': { type: 'moderate', prebirth: false, notes: 'Allows surrogacy but requires post-birth adoption for some parents.' },
  'Florida': { type: 'moderate', prebirth: false, notes: 'Legal but with restrictions. Married couples preferred.' },
  'Ohio': { type: 'moderate', prebirth: false, notes: 'No specific laws but generally permitted through contract law.' },
  'Michigan': { type: 'restrictive', prebirth: false, notes: 'Compensated surrogacy contracts unenforceable. Altruistic only.' },
  'Louisiana': { type: 'restrictive', prebirth: false, notes: 'Very restrictive. Only married heterosexual couples.' },
};

const buildAIResponse = (query, user) => {
  const q = query.toLowerCase();
  const isGC = user.type === 'gc';
  const stateInfo = STATE_INFO[user.state];
  
  // Compensation questions
  if (q.includes('compensation') || q.includes('pay') || q.includes('earn') || q.includes('money') || q.includes('how much')) {
    if (isGC) {
      return `💰 CARRIER COMPENSATION IN ${user.state.toUpperCase()}

BASE COMPENSATION
First-time carriers: $45,000 - $55,000
Experienced carriers: $55,000 - $75,000+
${user.state === 'California' || user.state === 'New York' ? '(Higher end due to your location)' : ''}

ADDITIONAL PAYMENTS
• Monthly allowance: $200 - $400/month
• Per embryo transfer: $1,000 - $1,500
• C-section delivery: $2,500 - $5,000
• Carrying twins: $5,000 - $10,000 additional
• Bed rest: $200 - $300 per week
• Maternity clothing: $500 - $1,000

IMPORTANT TAX INFO
⚠️ Surrogacy compensation IS taxable income
• Set aside 25-30% for taxes
• You may receive a 1099
• Consider quarterly estimated payments
• Consult a tax professional

SAMPLE JOURNEY TOTAL
Base: $50,000 + Allowances: $3,600 + Fees: ~$5,000
Gross Total: ~$58,600
After taxes (~28%): ~$42,000 net`;
    } else {
      return `💰 TOTAL SURROGACY COSTS

EXPECTED RANGE
Agency journey: $150,000 - $250,000+
Independent journey: $100,000 - $180,000

DETAILED BREAKDOWN

Carrier Costs: $55,000 - $95,000
• Base compensation: $45,000 - $75,000
• Monthly allowances: $3,000 - $5,000
• Transfer fees: $1,000 - $3,000
• Additional fees (C-section, etc.): $5,000 - $15,000

Agency Fees: $20,000 - $35,000
(Skip this with independent surrogacy)

Legal Fees: $8,000 - $15,000
• Your attorney: $6,000 - $13,000
• Carrier's attorney: $1,000 - $2,500

Medical/IVF: $15,000 - $35,000
• Egg retrieval: $10,000 - $15,000
• Embryo creation: $5,000 - $8,000
• PGT-A testing: $3,000 - $6,000
• Transfer: $3,000 - $5,000

Insurance: $15,000 - $40,000

💡 TIP: Independent surrogacy saves $20-35K in agency fees but requires more self-management.`;
    }
  }

  // State law questions
  if (q.includes('law') || q.includes('legal') || q.includes('state') || q.includes('allowed')) {
    const info = stateInfo || { type: 'varies', notes: 'Check with a local attorney.' };
    return `⚖️ SURROGACY LAWS IN ${user.state.toUpperCase()}

STATUS: ${info.type === 'favorable' ? '✅ FAVORABLE' : info.type === 'moderate' ? '⚠️ MODERATE' : '⛔ RESTRICTIVE'}
Pre-birth orders: ${info.prebirth ? 'Yes ✓' : 'No - post-birth required'}

${info.notes}

KEY LEGAL REQUIREMENTS
1. Find a reproductive law attorney (AAARTA.org)
2. Each party MUST have separate legal representation
3. Sign contract BEFORE any medical procedures
4. Verify escrow is fully funded
5. File parentage order at weeks 16-20 (if pre-birth available)

${info.type === 'restrictive' ? `\n⚠️ IMPORTANT: Given ${user.state}'s restrictions, many people work with carriers in more favorable states like California, Nevada, or Illinois.` : ''}

FAVORABLE STATES FOR SURROGACY
California, Nevada, Illinois, Washington, Connecticut, Oregon, New York, Delaware, Maine, New Hampshire`;
  }

  // Timeline questions
  if (q.includes('timeline') || q.includes('how long') || q.includes('time') || q.includes('duration')) {
    return `📅 SURROGACY TIMELINE: 12-18 MONTHS

YOUR CURRENT STAGE: ${user.stage ? user.stage.charAt(0).toUpperCase() + user.stage.slice(1) : 'Getting Started'}

DETAILED TIMELINE

1. RESEARCH & DECISION (2-8 weeks)
   Learning, family discussions, initial consultations

2. MATCHING (1-6 months)
   ${isGC ? 'Creating profile, meeting IPs, finding the right fit' : 'Reviewing profiles, video calls, confirming match'}

3. MEDICAL SCREENING (4-8 weeks)
   Blood work, uterine evaluation, psychological screening

4. LEGAL/CONTRACTS (2-4 weeks)
   Attorney review, contract negotiation, escrow setup

5. TRANSFER CYCLE (4-6 weeks)
   Medications, monitoring, embryo transfer

6. PREGNANCY (~40 weeks)
   Prenatal care, communication, parentage order

7. POST-BIRTH (4-8 weeks)
   Recovery, final payments, transition

💡 TIP: The matching and legal phases often take longer than expected. Build in buffer time.`;
  }

  // Screening/requirements questions  
  if (q.includes('screen') || q.includes('require') || q.includes('qualify') || q.includes('eligible')) {
    return `📋 CARRIER REQUIREMENTS (ASRM Guidelines)

BASIC REQUIREMENTS
✓ Age: 21-45 years old (most clinics prefer 21-40)
✓ BMI: Under 32-35 (varies by clinic)
✓ Prior pregnancy: At least one uncomplicated pregnancy carried to term
✓ Non-smoker: Smoke-free for at least 12 months
✓ Stable living situation and support system
✓ Reliable transportation to appointments
✓ No major pregnancy complications in history

MEDICAL TESTING INCLUDES
• Blood work: HIV, Hepatitis B & C, Syphilis, Gonorrhea, Chlamydia
• CMV (Cytomegalovirus) status
• Blood type and Rh factor
• Complete blood count & metabolic panel
• Drug screening
• Uterine evaluation (hysteroscopy or saline sonogram)

PSYCHOLOGICAL SCREENING
• MMPI-2 or PAI standardized test
• Clinical interview with licensed psychologist
• Evaluation of motivations, support system, mental health
• Partner/spouse may also be interviewed

TIMELINE & COSTS
• Full screening: 4-8 weeks
• Cost: $5,000 - $10,000 (paid by intended parents)`;
  }

  // Transfer questions
  if (q.includes('transfer') || q.includes('embryo')) {
    return `🔬 EMBRYO TRANSFER DAY GUIDE

BEFORE TRANSFER
Night Before:
• Get good sleep
• Lay out comfortable, loose clothing
• Confirm your ride

Morning Of:
• Light breakfast
• Take medications as scheduled
• No perfume or scented lotions
• Leave jewelry at home

FULL BLADDER REQUIREMENT
• Drink 16-32 oz water about 1 hour before
• A full bladder helps ultrasound visibility
• Yes, it's uncomfortable but important!

THE PROCEDURE (10-15 minutes)
1. Change into gown, lie on table
2. Ultrasound wand on abdomen
3. Speculum inserted (like a pap smear)
4. Thin catheter through cervix
5. Embryo deposited into uterus
6. Rest for 10-15 minutes

AFTER TRANSFER
• You can finally empty your bladder!
• Someone else drives you home
• Rest for remainder of day
• No heavy lifting or strenuous activity
• Continue ALL medications exactly as prescribed
• Light activity can resume next day

THE TWO-WEEK WAIT
• Beta HCG blood test: 9-12 days after transfer
• Avoid home pregnancy tests (can be inaccurate)
• Some spotting is normal
• Call clinic for severe pain or heavy bleeding`;
  }

  // Escrow questions
  if (q.includes('escrow') || q.includes('payment') || q.includes('fund')) {
    return `🏦 ESCROW: YOUR FINANCIAL PROTECTION

WHAT IS ESCROW?
A neutral third-party company that holds all journey funds and releases payments according to your contract.

HOW IT WORKS
1. IPs deposit funds before journey begins
2. Escrow company holds funds securely
3. Payments released on schedule per contract
4. Both parties receive accounting statements
5. Remaining funds returned at journey end

⭐ RECOMMENDED: SeedTrust (seedtrustescrow.com)
• Industry standard for surrogacy
• Setup fee: $700 - $1,000
• Professional, reliable, transparent

THE GOLDEN RULE
🚨 NEVER start medications until:
✓ Contract is fully signed
✓ Escrow account is established
✓ Escrow is funded with sufficient amounts

RED FLAGS - NEVER ACCEPT
❌ IPs wanting to pay you directly
❌ "We'll set up escrow later"
❌ "Escrow is too expensive"
❌ Pressure to start meds before funding

This protects EVERYONE. No exceptions.`;
  }

  // Contract questions
  if (q.includes('contract') || q.includes('agreement') || q.includes('attorney') || q.includes('lawyer')) {
    return `📝 SURROGACY CONTRACTS

WHY CONTRACTS MATTER
• Legally defines everyone's rights
• Protects both carrier and IPs
• Addresses "what if" scenarios
• Required before any medical procedures

KEY CONTRACT SECTIONS

COMPENSATION
• Base amount and payment schedule
• Monthly allowance, transfer fees
• C-section, multiples, bed rest fees
• Lost wages, life insurance

MEDICAL PROVISIONS
• Number of embryos to transfer
• Selective reduction clause (important!)
• Health decision rights
• Required prenatal care

TERMINATION PROVISIONS
• Under what circumstances
• Whose decision in various scenarios
• Compensation if termination occurs

CRITICAL RULES

1️⃣ SEPARATE ATTORNEYS
Each party MUST have independent representation.
• Carrier's attorney: $1,000-$2,500 (IPs pay)
• IPs' attorney: $6,000-$13,000

2️⃣ NEVER START WITHOUT SIGNED CONTRACT
No medications until fully executed.

3️⃣ ESCROW MUST BE FUNDED FIRST
Verify before signing.

FIND AN ATTORNEY
AAARTA.org - Academy of Adoption and ART Attorneys
(Searchable directory by state)`;
  }

  // Emotional/support questions
  if (q.includes('hard') || q.includes('difficult') || q.includes('stress') || q.includes('emotional') || q.includes('fail') || q.includes('didn\'t work')) {
    if (q.includes('fail') || q.includes('didn\'t work') || q.includes('negative')) {
      return isGC ? `💔 WHEN A TRANSFER DOESN'T WORK

First: IT'S NOT YOUR FAULT

Most transfer failures are due to embryo chromosomal issues - not your body. Even "perfect" transfers only have 40-60% success rates.

WHAT HAPPENS NEXT
• Take time to process your feelings
• Your IPs are grieving too - give each other grace
• Most contracts cover multiple transfer attempts
• Your medical team will review and adjust

WHAT YOU CAN SAY TO YOUR IPs
"I'm so sorry this didn't work. I want you to know I'm committed to this journey and I'm here for next steps whenever you're ready."

TAKE CARE OF YOURSELF
• It's okay to feel sad, disappointed, or frustrated
• Talk to your support person or therapist
• This doesn't reflect on you as a carrier` :

`💔 WHEN A TRANSFER DOESN'T WORK

This loss is real. Allow yourself to grieve.

WHY IT HAPPENED
Most transfer failures are due to embryo chromosomal issues. Your carrier did everything right.

YOUR CARRIER IS HURTING TOO
She invested emotionally in this. A simple message means everything:
"This isn't your fault. We're grateful for your commitment."

MOVING FORWARD
• Take time before deciding next steps
• Review options with your medical team
• Most journeys involve multiple transfers
• Consider if any protocol changes are needed`;
    }
    return `💚 EMOTIONAL SUPPORT RESOURCES

Surrogacy is emotionally complex. Getting support is a sign of strength.

WHEN TO SEEK HELP
• Processing the decision to pursue surrogacy
• During matching or screening
• Throughout pregnancy
• After delivery (yes, ${isGC ? 'carriers have' : 'IPs can have'} postpartum emotions too)
• If a transfer doesn't work
• Anytime you're struggling

FINDING A THERAPIST
• ASRM Mental Health Professional Group
• Psychology Today (filter by "reproductive")
• Your agency may provide referrals

CRISIS RESOURCES
📞 Postpartum Support International: 1-800-944-4773
📱 Crisis Text Line: Text HOME to 741741
📞 Suicide Prevention: 988

SELF-CARE PRACTICES
• Maintain routines and boundaries
• Stay connected with support people
• Journal your experiences
• Move your body
• Limit social media if it causes stress
• Celebrate milestones`;
  }

  // Default helpful response
  return `👋 Hi ${user.name}! I'm here to help with your surrogacy journey.

As ${isGC ? 'a gestational carrier' : 'an intended parent'} in ${user.state}, I can answer questions about:

💰 Compensation & Costs
⚖️ Laws in ${user.state}
📅 Timeline & Stages  
📋 Requirements & Screening
📝 Contracts & Escrow
🔬 Medical Process & Transfer
💚 Emotional Support
🤝 GC-IP Relationships

What would you like to know more about? Just type your question!

💡 TIP: Ask specific questions like "How much can I earn?" or "What are the laws in ${user.state}?" for detailed answers.`;
};

// ═══════════════════════════════════════════════════════════════
// COMPREHENSIVE RESOURCES - Full Educational Content
// ═══════════════════════════════════════════════════════════════
const RESOURCES = {
  screening: { 
    title: 'Medical Screening', 
    cat: 'Medical', 
    content: `GESTATIONAL CARRIER SCREENING REQUIREMENTS

The screening process ensures you're physically and emotionally ready to carry a pregnancy for someone else. Here's what to expect:

BASIC REQUIREMENTS (ASRM GUIDELINES)
• Age: 21-45 years old (most clinics prefer 21-40)
• BMI: Under 32-35 (varies by clinic)
• Prior pregnancy: At least one uncomplicated pregnancy carried to term
• Non-smoker: Smoke-free for at least 12 months
• No major pregnancy complications in history
• Stable living situation and support system
• Not currently receiving government assistance
• Reliable transportation to medical appointments

MEDICAL TESTING
Blood work and lab tests include:
• HIV 1 & 2
• Hepatitis B & C
• Syphilis, Gonorrhea, Chlamydia
• CMV (Cytomegalovirus)
• Blood type and Rh factor
• Complete blood count
• Comprehensive metabolic panel
• Drug screening

UTERINE EVALUATION
• Hysteroscopy or saline sonogram (SIS)
• Evaluates uterine cavity for abnormalities
• Checks for polyps, fibroids, or scarring
• Usually done in the first half of your cycle

PSYCHOLOGICAL SCREENING
• MMPI-2 or PAI (standardized psychological test)
• Clinical interview with licensed psychologist
• Evaluates mental health, motivations, support system
• Discussion of potential challenges
• Partner/spouse may also be interviewed

TIMELINE & COSTS
• Full screening takes 4-8 weeks
• Medical screening costs $5,000-$10,000
• All costs paid by intended parents
• Some tests may need to be repeated if expired

WHAT CAN DISQUALIFY YOU
• Certain medical conditions (diabetes, hypertension)
• History of pregnancy complications
• Certain medications
• Unstable mental health
• BMI outside acceptable range
• Recent tattoos or piercings
• History of certain STIs

If you don't pass screening, the clinic will explain why. Sometimes issues can be addressed and you can reapply later.` 
  },
  
  medications: { 
    title: 'Medication Protocol', 
    cat: 'Medical', 
    content: `FET (FROZEN EMBRYO TRANSFER) MEDICATION PROTOCOL

Medications prepare your uterus to receive an embryo. Here's the typical protocol:

PHASE 1: SUPPRESSION (1-2 weeks)
Medication: Lupron (leuprolide acetate)
• Small daily subcutaneous injection (tiny needle)
• Shuts down your natural hormone cycle
• Prevents ovulation during the transfer cycle
• May cause: hot flashes, headaches, mood swings
• Usually starts mid-cycle of the month before transfer

PHASE 2: ESTROGEN (2-3 weeks)
Medication: Estrace (estradiol) - pills, patches, or injections
• Builds your uterine lining
• Goal: Lining 7-8mm+ with "triple stripe" pattern
• Monitoring ultrasounds every few days
• May cause: bloating, breast tenderness, mood changes
• Dose increases gradually

PHASE 3: PROGESTERONE (starts 5 days before transfer)
Medication: PIO (Progesterone in Oil)
• Intramuscular injection in upper buttock
• Prepares lining for embryo implantation
• CRITICAL: Must be taken at same time daily
• Continues through week 10-12 if pregnant
• May cause: fatigue, soreness at injection site

PIO INJECTION TIPS
• Warm the oil before injecting (heating pad, under arm)
• Ice the injection area for a few minutes first
• Inject slowly (1-2 minutes for the full dose)
• Massage the area afterward
• Rotate injection sites (left buttock, right buttock)
• Walk around after to help disperse the oil
• Consider a heating pad on the area afterward
• GET HELP! These injections are difficult to do yourself

ADDITIONAL MEDICATIONS MAY INCLUDE
• Baby aspirin (blood flow)
• Prenatal vitamins
• Medrol (steroid for immune support)
• Doxycycline (antibiotic around transfer)
• Valium (relaxation on transfer day)

IMPORTANT REMINDERS
• Never miss a dose - set multiple alarms
• Carry medications when traveling
• Keep clinic's emergency number handy
• Report any unusual symptoms immediately` 
  },
  
  transfer: { 
    title: 'Transfer Day', 
    cat: 'Medical', 
    content: `EMBRYO TRANSFER DAY: WHAT TO EXPECT

Transfer day is exciting! Here's everything you need to know:

THE NIGHT BEFORE
• Get good sleep (easier said than done!)
• Lay out comfortable, loose clothing
• Confirm your ride to the clinic
• Take any medications as prescribed
• Avoid intercourse (usually restricted)

MORNING OF TRANSFER
• Light breakfast - nothing heavy
• Take medications as scheduled
• Don't wear perfume or scented lotions
• Leave jewelry at home
• Bring your ID and any required paperwork

FULL BLADDER REQUIREMENT
• Drink 16-32 oz of water about 1 hour before
• A full bladder helps the ultrasound
• It lifts the uterus for better catheter access
• Yes, it's uncomfortable - but important!
• The clinic will let you partially empty if too full

THE PROCEDURE (10-15 minutes)
1. You'll change into a gown and lie on the table
2. An ultrasound wand is placed on your abdomen
3. A speculum is inserted (like a pap smear)
4. The doctor threads a thin, flexible catheter through your cervix
5. The embryo is deposited into your uterus
6. You may see a small flash on the ultrasound screen
7. Catheter is removed; embryologist confirms it's empty
8. You rest for 10-15 minutes

DOES IT HURT?
• Most women describe it as similar to a pap smear
• Mild cramping is common
• The full bladder is usually the most uncomfortable part
• Some clinics offer Valium for relaxation

AFTER THE TRANSFER
• You can empty your bladder (finally!)
• Rest at the clinic for 15-30 minutes
• Someone else drives you home
• Rest for the remainder of the day
• No heavy lifting or strenuous activity
• Continue ALL medications as prescribed
• Light activity can resume the next day

THE TWO-WEEK WAIT
• Beta HCG blood test: 9-12 days after transfer
• Try to stay busy and distracted
• Avoid home pregnancy tests (can give false results)
• Some spotting is normal and doesn't indicate failure
• Call the clinic if you have severe pain or heavy bleeding

TIPS FOR SUCCESS
• Stay warm (wear socks!)
• Think positive thoughts
• Laugh - some studies suggest it helps!
• Avoid stress as much as possible
• Trust that you've done everything you can` 
  },
  
  contract: { 
    title: 'Surrogacy Contracts', 
    cat: 'Legal', 
    content: `THE GESTATIONAL SURROGACY AGREEMENT (GSA)

Your contract is your most important protection. Here's what you need to know:

WHY CONTRACTS MATTER
• Legally defines everyone's rights and responsibilities
• Protects both carrier and intended parents
• Addresses "what if" scenarios before they happen
• Required before any medical procedures begin

KEY SECTIONS OF THE CONTRACT

COMPENSATION & PAYMENTS
• Base compensation amount and payment schedule
• Monthly allowance for pregnancy expenses
• Transfer fee (per embryo transfer)
• Additional fees: C-section, multiples, bed rest
• Expense reimbursements (maternity clothes, travel, childcare)
• Lost wages policy
• Life insurance coverage

MEDICAL PROVISIONS
• Number of embryos to transfer
• Selective reduction clause (very important!)
• Carrier's right to make health decisions
• Required prenatal care
• Restrictions (travel, activities, diet)
• What happens if complications arise

TERMINATION PROVISIONS
• Under what circumstances pregnancy can be terminated
• Whose decision it is in various scenarios
• Compensation if termination occurs
• This is often the hardest part to discuss - but necessary

LEGAL & INSURANCE
• Who pays for what legal fees
• Health insurance requirements
• What if carrier loses insurance coverage
• Liability provisions

CRITICAL RULES

1. SEPARATE ATTORNEYS
Each party MUST have their own independent attorney. The same attorney cannot represent both sides.

Attorney costs:
• Carrier's attorney: $1,000-$2,500 (paid by IPs)
• IPs' attorney: $6,000-$13,000

2. NEVER START WITHOUT A SIGNED CONTRACT
Do not begin any medications until the contract is fully executed (signed by all parties).

3. ESCROW MUST BE FUNDED
Before signing, confirm escrow account is established and funded.

FINDING AN ATTORNEY
• AAARTA.org - Academy of Adoption and ART Attorneys
• Must be licensed in the relevant state(s)
• Should specialize in reproductive law
• Interview several before choosing

RED FLAGS
• Attorney trying to rush the process
• Pressure to skip provisions
• IPs unwilling to use escrow
• Anyone telling you "just trust us"

Take your time reviewing. This document protects you.` 
  },
  
  escrow: { 
    title: 'Escrow & Payments', 
    cat: 'Legal', 
    content: `UNDERSTANDING ESCROW IN SURROGACY

Escrow protects everyone's money. Here's how it works:

WHAT IS ESCROW?
A neutral third-party company holds all journey funds. They're not on anyone's "side" - they simply manage the money according to the contract.

HOW IT WORKS
1. IPs deposit funds into escrow account before journey begins
2. Escrow company holds the funds securely
3. Payments are released to carrier on schedule per contract
4. Escrow provides accounting to both parties
5. Remaining funds returned to IPs at journey end

WHAT'S HELD IN ESCROW
• Carrier's base compensation
• Monthly allowance
• Transfer fees
• Expected additional payments (C-section, etc.)
• Expense reimbursement fund
• Emergency reserve
• Attorney fees
• Agency fees (if applicable)

RECOMMENDED ESCROW COMPANY
SeedTrust (seedtrustescrow.com)
• Industry standard for surrogacy
• Established reputation
• Clear accounting and reporting
• Setup fee: $700-$1,000
• Handles all disbursements professionally

WHY ESCROW IS NON-NEGOTIABLE

For Carriers:
• Guarantees you'll be paid
• Don't have to chase IPs for money
• Protected if IPs' circumstances change
• Professional documentation for taxes

For IPs:
• Clear accounting of all payments
• Protection if journey doesn't proceed
• Professional management of large sums
• Demonstrates good faith to carrier

RED FLAGS - NEVER ACCEPT
• IPs who want to pay you directly
• "We'll set up escrow later"
• "Escrow is too expensive/unnecessary"
• Pressure to start meds before escrow is funded

THE GOLDEN RULE
NEVER start any medications until you have:
1. Signed contract
2. Confirmed escrow account exists
3. Verified escrow is funded with sufficient amounts

This protects you. No exceptions.` 
  },
  
  attorneys: { 
    title: 'Legal Representation', 
    cat: 'Legal', 
    content: `FINDING & WORKING WITH SURROGACY ATTORNEYS

Legal representation is essential. Here's what you need to know:

WHY YOU NEED YOUR OWN ATTORNEY
• The law requires independent representation
• Protects YOUR interests specifically
• Explains contract terms in plain language
• Negotiates on your behalf
• Cannot be the same attorney as the other party

WHAT A SURROGACY ATTORNEY DOES

For Carriers:
• Reviews contract and explains every provision
• Negotiates better terms if needed
• Ensures your rights are protected
• Advises on your state's laws
• Helps with parentage order process

For Intended Parents:
• Drafts the surrogacy contract
• Ensures legal compliance in all relevant states
• Handles parentage orders
• Navigates complex multi-state situations
• Advises on insurance and liability

FINDING AN ATTORNEY

AAARTA.org
Academy of Adoption and Assisted Reproduction Technology Attorneys
• Searchable directory by state
• Verified reproductive law specialists
• Ethical standards required

Questions to Ask:
• How many surrogacy cases have you handled?
• Are you licensed in my state? The other party's state?
• What's your fee structure?
• How quickly do you typically complete contracts?
• Will you personally handle my case?

COSTS

Carrier's Attorney: $1,000-$2,500
• Paid by intended parents
• Reviews and negotiates contract
• Typically flat fee

IPs' Attorney: $6,000-$13,000
• Drafts contract from scratch
• More complex work involved
• May include parentage order work

THE PROCESS

1. Engagement - Sign retainer, provide information
2. Contract Drafting (1-2 weeks) - 35-50 page document
3. Contract Review - Carrier's attorney reviews with carrier
4. Negotiation - Usually 1-3 rounds of revisions
5. Execution - All parties sign, escrow confirmed

TIMELINE: 2-4 weeks typically
Don't rush - this protects everyone.` 
  },
  
  parentage: { 
    title: 'Parentage Orders', 
    cat: 'Legal', 
    content: `ESTABLISHING LEGAL PARENTAGE

Parentage orders legally establish who the baby's parents are. This is crucial.

TWO TYPES OF PARENTAGE ORDERS

PRE-BIRTH ORDER
• Filed during pregnancy (usually weeks 16-20)
• Court order issued before birth
• IPs listed on original birth certificate
• Hospital knows IPs are parents upon arrival
• Smoothest process for everyone

POST-BIRTH ORDER
• Filed after baby is born
• Birth certificate may initially list carrier
• Amended after court order granted
• Takes 2-8 weeks after birth
• More paperwork and steps involved

STATES WITH PRE-BIRTH ORDERS
• California
• Connecticut
• Delaware
• Illinois
• Maine
• Nevada
• New Hampshire
• New Jersey
• New York
• Oregon
• Washington
• And others...

STATES REQUIRING POST-BIRTH ORDERS
• Florida (some counties)
• Ohio
• Pennsylvania
• Texas
• Virginia
• And others...

Each state is different. Some vary by county!

THE PRE-BIRTH ORDER PROCESS

1. Attorney files petition (weeks 16-20)
   • Surrogacy contract attached
   • Medical records confirming pregnancy
   • Affidavits from all parties

2. Court reviews (1-4 weeks)
   • Judge reviews documents
   • May or may not require hearing
   • Signs the order

3. Order issued
   • Sent to hospital
   • Birth certificate office notified
   • IPs' names will be on birth certificate

4. At birth
   • Hospital has order on file
   • IPs listed as parents immediately
   • IPs make all decisions for baby
   • Baby goes home with IPs

IMPORTANT TIMING
Don't wait until the third trimester!
• File at weeks 16-20
• Allows time for any complications
• Court schedules can be slow
• Baby could arrive early

Your attorney will guide you through the specific process for your state.` 
  },
  
  compensation: { 
    title: 'Carrier Compensation', 
    cat: 'Financial', 
    content: `GESTATIONAL CARRIER COMPENSATION GUIDE

Understanding what you'll earn and when you'll receive it.

BASE COMPENSATION
First-time carriers: $45,000 - $55,000
Experienced carriers: $55,000 - $75,000+

Higher rates in:
• California
• New York / Northeast
• Major metropolitan areas
• For proven carriers with successful journeys

ADDITIONAL COMPENSATION

Per Transfer: $1,000 - $1,500
• Paid for each embryo transfer attempt
• Received even if transfer doesn't result in pregnancy

C-Section: $2,500 - $5,000
• Additional payment if cesarean delivery

Multiples: $5,000 - $10,000
• Additional for carrying twins
• Higher for triplets (rare)

Bed Rest: $200 - $300 per week
• If ordered by doctor

Invasive Procedures: $500 - $1,500
• Amniocentesis, CVS testing, D&C if needed

Loss of Reproductive Organs: $2,500 - $5,000
• Hysterectomy required due to pregnancy

MONTHLY ALLOWANCE
$200 - $400 per month
• Covers pregnancy-related expenses
• Maternity clothes, vitamins, gas, misc needs

EXPENSE REIMBURSEMENTS
These are separate from compensation:
• Travel to clinic and appointments
• Childcare during appointments
• Lost wages for appointments
• Maternity clothing allowance ($500-$1,000)
• Housekeeping if on bed rest

PAYMENT SCHEDULE (TYPICAL)
• Start of medications: First monthly payment
• Each embryo transfer: Transfer fee
• Confirmed pregnancy: Regular monthly payments
• Milestones: Payments continue
• Delivery: Final base compensation payment
• Post-birth: Recovery payment

TAXES - VERY IMPORTANT!
• Surrogacy compensation IS taxable income
• You may receive a 1099
• Set aside 25-30% for taxes
• Make quarterly estimated payments
• Consult a tax professional

SAMPLE TOTAL JOURNEY
Base: $50,000
Monthly allowance (12 months): $3,600
Transfer fees (2 transfers): $2,500
Maternity clothes: $750
Travel reimbursement: $1,500
Total: ~$58,350

Minus taxes (~28%): ~$16,300
Net: ~$42,000

(These are estimates - your journey will vary)` 
  },
  
  budget: { 
    title: 'Intended Parent Costs', 
    cat: 'Financial', 
    content: `INTENDED PARENT BUDGET GUIDE

Surrogacy is a significant investment. Here's the full picture.

TOTAL COST RANGE
Agency surrogacy: $150,000 - $250,000+
Independent surrogacy: $100,000 - $180,000

DETAILED COST BREAKDOWN

CARRIER COSTS: $55,000 - $95,000
• Base compensation: $45,000 - $75,000
• Monthly allowance: $3,000 - $5,000 total
• Transfer fees: $1,000 - $3,000
• Potential additional fees: $5,000 - $15,000
  (C-section, multiples, bed rest, etc.)

AGENCY FEES: $20,000 - $35,000
• Matching services
• Journey coordination
• Support throughout process
• Skip this with independent surrogacy

LEGAL FEES: $8,000 - $15,000
• Your attorney: $6,000 - $13,000
• Carrier's attorney: $1,000 - $2,500
• Parentage order: Often included

IVF & MEDICAL: $15,000 - $35,000
• Egg retrieval (if needed): $10,000 - $15,000
• Embryo creation: $5,000 - $8,000
• PGT-A genetic testing: $3,000 - $6,000
• Carrier medical screening: $5,000 - $10,000
• Embryo transfer: $3,000 - $5,000

If using donor eggs, add: $25,000 - $40,000
If using donor sperm, add: $500 - $1,500

INSURANCE: $15,000 - $40,000
• Surrogacy-friendly policy for carrier
• OR cash reserves for medical bills
• Newborn insurance (usually under your policy)

ESCROW & ADMIN: $1,500 - $3,000
• Escrow setup and management
• Background checks
• Psychological evaluations

TRAVEL & MISC: $2,000 - $10,000
• Flights for transfer
• Hotel for birth
• Unexpected costs

WAYS TO MANAGE COSTS

Independent Surrogacy
• Skip agency fees ($20,000-$35,000 savings)
• More work but significant savings
• Still need attorney, escrow, clinic

Financing Options
• Some clinics offer payment plans
• Medical loans available
• Home equity options

Employer Benefits
• Some companies cover fertility treatments
• A few cover surrogacy

BUDGET TIPS
• Build a spreadsheet tracking all costs
• Add 10-15% buffer for unexpected expenses
• Plan for possibility of multiple transfers
• Costs can exceed estimates - be prepared` 
  },
  
  relationship: { 
    title: 'GC-IP Relationship', 
    cat: 'Wellness', 
    content: `BUILDING A STRONG CARRIER-IP RELATIONSHIP

This relationship is the heart of your surrogacy journey.

BEFORE MATCHING: KNOW WHAT YOU WANT

For Carriers - Consider:
• How much contact do I want during pregnancy?
• Do I want IPs at appointments? Delivery?
• What kind of post-birth relationship do I envision?

For IPs - Consider:
• How involved do we want to be?
• Can we respect carrier's autonomy?
• What are our communication expectations?

THE MATCHING PROCESS
• Video calls are essential - you're choosing a relationship
• Ask real questions, share genuine answers
• Trust your gut - chemistry matters
• It's okay to say no if it's not right

EARLY CONVERSATIONS - HAVE THEM
• Communication preferences (text, call, email?)
• Update frequency expectations
• Boundaries around social media sharing
• Appointment attendance wishes
• Delivery room preferences
• Post-birth relationship hopes

DURING PREGNANCY

For Carriers:
• Regular updates, even brief ones
• Share milestones but maintain boundaries
• Be honest about how you're feeling
• You're not obligated to be available 24/7

For IPs:
• Express gratitude genuinely
• Respect her autonomy - it's her body
• Don't comment on food, exercise, or lifestyle
• Manage your anxiety without burdening her
• She has her own life and family too

COMMUNICATION TIPS
• When in doubt, over-communicate
• Assume good intent before reacting
• Address small issues before they become big
• Use "I feel..." statements
• Schedule regular check-ins if helpful

NAVIGATING CONFLICT
It happens. Here's how to handle it:
1. Take a breath before responding
2. Is this a real issue or anxiety talking?
3. Address directly but kindly
4. Focus on the issue, not the person
5. Involve coordinator if stuck
6. Attorneys only for contract violations

AT DELIVERY
• Discuss preferences well in advance
• Who's in the delivery room?
• Who cuts the cord?
• Hospital room arrangements
• Be flexible - birth doesn't follow plans

AFTER BIRTH

For Carriers:
• It's okay to feel sad when journey ends
• The relationship may shift - that's normal
• You did something extraordinary

For IPs:
• Never forget what she did for you
• Honor whatever relationship was agreed upon
• She gave you your family` 
  },
  
  therapists: { 
    title: 'Mental Health Support', 
    cat: 'Wellness', 
    content: `MENTAL HEALTH & EMOTIONAL SUPPORT

Surrogacy is emotionally complex. Support helps.

WHEN TO SEEK SUPPORT

For Carriers:
• Processing the decision to become a carrier
• During screening and matching
• Throughout pregnancy
• After delivery (even if everything went well)
• If experiencing postpartum symptoms

For IPs:
• Processing grief from infertility journey
• Managing anxiety during pregnancy
• Preparing for parenthood
• If transfers fail
• Bonding concerns

FINDING A SURROGACY-INFORMED THERAPIST

ASRM Mental Health Professional Group
• Searchable directory
• Specialists in reproductive psychology

Psychology Today
• Filter by specialty
• Look for "infertility" or "reproductive"

Your Agency
• Many provide counseling services
• May have referral lists

Questions to Ask Potential Therapists:
• Have you worked with surrogates/IPs before?
• What's your approach to reproductive mental health?
• Do you offer telehealth appointments?
• What's your fee? Do you take insurance?

COMMON EMOTIONAL CHALLENGES

For Carriers:
• Explaining surrogacy to others
• Managing family's opinions
• Handling physical changes
• Processing the birth experience
• Post-journey identity shift

For IPs:
• Loss of control
• Previous infertility grief
• Fear of transfer failure
• Anxiety about carrier's choices
• Bonding concerns

POSTPARTUM CONSIDERATIONS

For Carriers (yes, you have postpartum too):
• Hormone crash affects everyone who gives birth
• Sadness is normal, even without parenting
• Milk may come in - physically uncomfortable
• Allow yourself to grieve the journey ending
• Seek help if symptoms are severe or lasting

Warning Signs (seek help immediately):
• Unable to get out of bed
• Not caring for yourself
• Severe mood swings
• Thoughts of self-harm
• Symptoms worsening after 2 weeks

CRISIS RESOURCES

Postpartum Support International
1-800-944-4773 (24/7)

Crisis Text Line
Text HOME to 741741

National Suicide Prevention
988 (call or text)

You deserve support. Asking for help is strength.` 
  },
  
  insurance: { 
    title: 'Insurance Guide', 
    cat: 'Financial', 
    content: `SURROGACY INSURANCE EXPLAINED

Insurance in surrogacy is complicated but crucial.

THE CHALLENGE
Many health insurance policies explicitly exclude surrogacy coverage. Even if pregnancy is covered, a claim can be denied if they learn it's a surrogacy pregnancy.

CARRIER'S INSURANCE OPTIONS

Option 1: Carrier's Existing Insurance
• Must be reviewed by a specialist
• Policy language matters enormously
• "Participating in a surrogacy" exclusion = denied
• Self-insured employer plans can deny anytime
• ACA plans generally cannot exclude, but verify

Insurance Review Services:
• ART Risk Solutions (artrisk.com)
• New Life Agency
• Cost: $250-$500 for review

Option 2: Purchase Surrogacy-Specific Policy
• Specifically designed for surrogacy
• No exclusions for surrogate pregnancy
• Cost: $15,000 - $40,000
• Purchased by intended parents
• Some have waiting periods

Where to Get Surrogacy Insurance:
• ART Risk Solutions
• New Life Agency
• Lloyd's of London underwriters

Option 3: Cash Pay with Reserves
• No insurance - pay medical bills directly
• Requires $50,000+ in reserve
• Risky if complications occur
• Usually last resort option

NEWBORN INSURANCE

The Baby's Coverage:
• Usually covered under IPs' insurance
• Add baby within 30 days of birth
• Baby is IPs' dependent, not carrier's
• Verify your policy covers newborns

WHAT INSURANCE MUST COVER

For Carrier:
• All prenatal care
• Labor and delivery
• Complications
• C-section if needed
• Postpartum care
• Emergency situations

KEY QUESTIONS FOR INSURANCE REVIEW
• Is surrogacy explicitly excluded?
• Is it a self-insured (ERISA) plan?
• What are the maternity benefits?
• What hospital network is covered?
• What's the deductible and out-of-pocket max?

TIMING
• Verify insurance BEFORE matching
• Purchase surrogacy policy early if needed
• Don't start medical process without coverage sorted

Insurance mistakes can be devastating. Take this seriously.` 
  },
  
  ivf: { 
    title: 'IVF & Embryos', 
    cat: 'Medical', 
    content: `IVF AND EMBRYO CREATION FOR SURROGACY

Understanding the process of creating embryos for your journey.

THE BASIC PROCESS
1. Eggs are retrieved from the egg source
2. Sperm is collected from the sperm source
3. Fertilization happens in the lab
4. Embryos grow for 5-6 days (blastocyst stage)
5. Best embryos are frozen for later transfer

EGG SOURCES

Your Own Eggs (Intended Mother):
• You undergo ovarian stimulation
• Eggs retrieved at your IVF clinic
• 2-3 week process
• 10-20 eggs typical retrieval

Donor Eggs:
• Anonymous or known donor
• Donor undergoes the stimulation/retrieval
• Cost: $25,000 - $40,000 additional

SPERM SOURCES

Intended Father:
• Sperm sample collected at clinic
• Fresh or frozen can be used

Donor Sperm:
• From sperm bank
• Extensive screening
• Cost: $500 - $1,500 per vial

FERTILIZATION

Conventional IVF:
• Sperm and eggs mixed together
• Sperm naturally penetrates egg

ICSI (Intracytoplasmic Sperm Injection):
• Single sperm injected directly into egg
• Used for low sperm count or quality
• Additional cost: $1,500 - $2,500

EMBRYO DEVELOPMENT
• Day 1: Fertilization confirmed
• Day 3: 8-cell embryo
• Day 5-6: Blastocyst (100+ cells)
• Best embryos selected for freezing
• Not all eggs become viable embryos

PGT-A GENETIC TESTING

What It Is:
• Pre-implantation Genetic Testing
• Checks embryos for chromosomal abnormalities

Benefits:
• Higher success rate per transfer
• Lower miscarriage risk
• Fewer wasted transfers
• Gender can be determined (if desired)

Process:
• Few cells removed from embryo
• Sent to genetics lab
• Results in 1-2 weeks
• Cost: $3,000 - $6,000

Should You Do PGT-A?
• Highly recommended for surrogacy
• Reduces failed transfers
• Especially important for older egg sources

HOW MANY EMBRYOS DO YOU NEED?

Rule of Thumb:
• Plan for 2-3 embryos per baby desired
• Success rate ~50-60% per PGT-normal embryo
• Some transfers fail
• Having backups reduces stress

EMBRYO STORAGE
• Can remain frozen indefinitely
• Annual storage: $500 - $1,000 per year
• Embryos can be shipped between clinics

Your reproductive endocrinologist will guide you through each step.` 
  }
};

// Calculate read times
Object.keys(RESOURCES).forEach(k => { 
  RESOURCES[k].time = `${Math.ceil(RESOURCES[k].content.split(/\s+/).length / 200)} min`; 
});

// ═══════════════════════════════════════════════════════════════
// DATA CONSTANTS
// ═══════════════════════════════════════════════════════════════
const DAILY_FOCUS = {
  gc: { 
    research: [{ t: "Learn about compensation", d: "Understand what you could earn", r: 'compensation' }, { t: "Review requirements", d: "See if you qualify", r: 'screening' }], 
    match: [{ t: "Prepare for video calls", d: "Questions to ask IPs" }, { t: "Trust your gut", d: "Chemistry matters" }], 
    medical: [{ t: "Prepare for screening", d: "What to expect", r: 'screening' }, { t: "Line up injection help", d: "PIO shots need a helper", r: 'medications' }], 
    legal: [{ t: "Review your contract", d: "Understand every clause", r: 'contract' }, { t: "Verify escrow funded", d: "Non-negotiable", r: 'escrow' }], 
    transfer: [{ t: "Transfer day prep", d: "Full bladder, comfy clothes", r: 'transfer' }], 
    pregnant: [{ t: "Update your IPs", d: "They're anxious too" }, { t: "Start parentage order", d: "Don't wait", r: 'parentage' }], 
    post: [{ t: "Schedule checkup", d: "6-week postpartum care", r: 'therapists' }] 
  },
  ip: { 
    research: [{ t: "Understand total costs", d: "Budget realistically", r: 'budget' }, { t: "Find an attorney", d: "Essential first step", r: 'attorneys' }], 
    match: [{ t: "Create your profile", d: "Be authentic" }, { t: "Prepare for calls", d: "Questions to ask", r: 'relationship' }], 
    medical: [{ t: "Support your carrier", d: "She's going through a lot" }, { t: "Create embryos", d: "Work with your clinic", r: 'ivf' }], 
    legal: [{ t: "Fund escrow TODAY", d: "Don't delay", r: 'escrow' }, { t: "Review contract", d: "Discuss tough scenarios", r: 'contract' }], 
    transfer: [{ t: "Support your carrier", d: "Be present", r: 'transfer' }, { t: "Practice patience", d: "Two-week wait is hard" }], 
    pregnant: [{ t: "Establish rhythm", d: "Communication plan", r: 'relationship' }, { t: "Parentage order", d: "File at weeks 16-20", r: 'parentage' }], 
    post: [{ t: "Honor your carrier", d: "She changed your life", r: 'relationship' }] 
  }
};

const HARD_MOMENTS = {
  gc: [
    { id: 'transfer-fail', title: "When a transfer doesn't work", content: `This is one of the hardest moments.\n\nIT'S NOT YOUR FAULT\nMost failures are embryo chromosomal issues—not your body. Even "perfect" transfers have only 40-60% success.\n\nWHAT HAPPENS NEXT\n• Take time to process\n• IPs are grieving too—give each other grace\n• Most contracts cover multiple attempts\n\nWHAT TO SAY\n"I'm so sorry this didn't work. I'm committed to this journey and here for next steps when you're ready."` },
    { id: 'ip-conflict', title: "Navigating conflict with IPs", content: `Disagreements happen in any relationship.\n\nCOMMON ISSUES\n• Communication frequency\n• Appointment expectations\n• Lifestyle opinions\n\nHOW TO ADDRESS IT\n"I've noticed ___ and want to talk before it becomes bigger."\n"I feel ___ when ___. Can we find a solution?"\n\nWHEN TO INVOLVE ATTORNEY\n• Pattern of disrespect\n• Contract violations\n• Feeling unsafe` },
    { id: 'complications', title: "Handling complications", content: `YOUR HEALTH COMES FIRST\nThis is in your contract. You are not failing anyone.\n\nWHAT TO DO\n1. Follow ALL medical advice\n2. Communicate with IPs promptly\n3. Document everything\n4. Contact your agency/attorney if needed\n\nYour health and safety are the priority.` },
    { id: 'postpartum', title: "Struggling after delivery", content: `Your body went through birth. Emotions are normal.\n\nWHAT YOU MIGHT FEEL\n• Sadness (even if happy for IPs)\n• Hormonal mood swings\n• Grief that the journey is over\n• Relief mixed with emptiness\n\nGET HELP IF\n• Symptoms worsen after 2 weeks\n• Unable to care for yourself\n• Thoughts of self-harm\n\nPostpartum Support: 1-800-944-4773 (24/7)\nCrisis Text: HOME to 741741` }
  ],
  ip: [
    { id: 'transfer-fail', title: "When a transfer doesn't work", content: `This loss is real. Allow yourself to grieve.\n\nWHY IT HAPPENED\nMost failures are embryo chromosomal issues. Your carrier did everything right.\n\nYOUR CARRIER IS HURTING TOO\nShe invested emotionally in this. A simple message means everything:\n"This isn't your fault. We're grateful for your commitment."\n\nMOVING FORWARD\n• Take time before deciding next steps\n• Review options with medical team\n• Most journeys involve multiple transfers` },
    { id: 'gc-conflict', title: "Conflict with your carrier", content: `CHECK YOURSELF FIRST\n• Are you projecting anxiety?\n• Is this about control?\n• Are your expectations reasonable?\n\nWHAT YOU CAN'T CONTROL\n• Her daily choices\n• Her body\n• Her other relationships\n\nWHAT TO DO\n• Take a breath before responding\n• Address specific behaviors, not character\n• Involve your coordinator if stuck\n• Remember: she's doing something amazing for you` },
    { id: 'waiting', title: "The waiting is unbearable", content: `The two-week wait. The nine months. All of it.\n\nSTRATEGIES\n• Start a project with a deadline\n• Designate "worry time" (15 min/day)\n• Exercise burns anxious energy\n• Connect with other IPs who understand\n\nMANTRA\n"I have done everything I can. The rest is not in my control."` },
    { id: 'money-stress', title: "Financial stress", content: `Surrogacy costs are significant. You're not alone in feeling this.\n\nWHAT HELPS\n• Break costs into smaller chunks\n• Review what's already in escrow\n• Talk to your clinic about payment plans\n• Check employer benefits\n\nIMPORTANT\nAlways pay your carrier on time. She's depending on you.` }
  ]
};

const REMINDERS = { 
  research: { title: "Review health insurance", desc: "Many policies exclude surrogacy. Get yours reviewed early." }, 
  match: { title: "Trust your instincts", desc: "If something feels off during matching, keep looking." }, 
  medical: { title: "Arrange injection help", desc: "PIO shots are hard to do alone. Line up your helper now.", urgent: true }, 
  legal: { title: "Verify escrow is funded", desc: "Never start medications without confirmed funding.", urgent: true }, 
  transfer: { title: "Transfer prep", desc: "Full bladder, comfortable clothes, arrange your ride." }, 
  pregnant: { title: "Start parentage order", desc: "Begin the process at weeks 16-20. Don't wait!", urgent: true }, 
  post: { title: "Don't skip postpartum care", desc: "Your 6-week checkup matters. Schedule it now." } 
};

const STAGES = {
  gc: [
    { id: 'research', name: 'Researching', duration: '2-4 weeks', weeks: 3, tasks: ['Research surrogacy agencies and options','Understand compensation structures','Learn medical and legal requirements','Discuss with family and get support'] },
    { id: 'match', name: 'Finding Match', duration: '1-3 months', weeks: 8, tasks: ['Create your carrier profile','Have video calls with potential IPs','Discuss expectations and values','Confirm your match'] },
    { id: 'medical', name: 'Screening', duration: '4-8 weeks', weeks: 6, tasks: ['Complete clinic appointment','Finish all medical testing','Complete psychological evaluation','Receive medical clearance'] },
    { id: 'legal', name: 'Contracts', duration: '2-4 weeks', weeks: 3, tasks: ['Hire your own attorney','Review contract thoroughly','Verify escrow is funded','Sign the agreement'] },
    { id: 'transfer', name: 'Transfer', duration: '4-6 weeks', weeks: 5, tasks: ['Start medication protocol','Attend monitoring appointments','Complete embryo transfer','Wait for beta test results'] },
    { id: 'pregnant', name: 'Pregnant', duration: '~40 weeks', weeks: 40, tasks: ['Attend regular ultrasounds','Continue OB prenatal care','Send updates to IPs','Begin parentage order process'] },
    { id: 'post', name: 'Post-Birth', duration: '4-8 weeks', weeks: 6, tasks: ['Focus on recovery','Receive final compensation','Attend postpartum checkup'] }
  ],
  ip: [
    { id: 'research', name: 'Researching', duration: '2-8 weeks', weeks: 5, tasks: ['Understand total costs and timeline','Consult with reproductive attorney','Choose your IVF clinic','Review surrogacy laws in your state'] },
    { id: 'match', name: 'Finding Match', duration: '1-6 months', weeks: 12, tasks: ['Create your IP profile','Review potential carrier profiles','Have video calls with candidates','Confirm your match'] },
    { id: 'medical', name: 'IVF', duration: '2-4 months', weeks: 12, tasks: ['Complete IVF consultation','Create embryos','Complete PGT-A testing if desired','Support carrier through screening'] },
    { id: 'legal', name: 'Contracts', duration: '2-4 weeks', weeks: 3, tasks: ['Hire reproductive law attorney','Draft and finalize contract','Fund escrow account','Arrange carrier insurance'] },
    { id: 'transfer', name: 'Transfer', duration: '4-6 weeks', weeks: 5, tasks: ['Coordinate transfer schedule','Support your carrier','Wait for pregnancy confirmation'] },
    { id: 'pregnant', name: 'Expecting', duration: '~40 weeks', weeks: 40, tasks: ['Establish communication rhythm','File parentage order','Prepare your nursery'] },
    { id: 'post', name: 'Baby Home', duration: '4-8 weeks', weeks: 6, tasks: ['Welcome your baby','Finalize birth certificate','Honor your carrier'] }
  ]
};

const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','DC'];

const MOODS = [
  { label: 'Great', color: C.success, emoji: '😊' },
  { label: 'Good', color: '#8ec99a', emoji: '🙂' },
  { label: 'Okay', color: C.warning, emoji: '😐' },
  { label: 'Hard', color: '#d49a8a', emoji: '😔' },
  { label: 'Struggling', color: C.accent, emoji: '😢' }
];

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT - Fixed modal re-rendering bug
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [screen, setScreen] = useState('welcome');
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({ type: '', state: '', stage: '', name: '', startDate: null, tasks: {}, moods: [], journal: [] });
  const [tab, setTab] = useState('home');
  const [modal, setModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [calc, setCalc] = useState({ base: 50000, csection: false, twins: false });
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showDailyGuide, setShowDailyGuide] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const hash = new URLSearchParams(window.location.hash.substring(1));
      const query = new URLSearchParams(window.location.search);
      const token = hash.get('access_token') || query.get('access_token');
      const refresh = hash.get('refresh_token') || query.get('refresh_token');
      const type = hash.get('type') || query.get('type');
      if (token && (type === 'signup' || type === 'email' || type === 'magiclink')) {
        const { data } = await supabase.auth.setSession({ access_token: token, refresh_token: refresh });
        if (data.session) { setSession(data.session); loadUserProfile(data.session.user.id); }
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };
    handleEmailConfirmation();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadUserProfile(session.user.id);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session) loadUserProfile(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId) => {
    const { data } = await supabase.from('user_profiles').select('*').eq('id', userId).single();
    if (data?.user_type) {
      setUser({ type: data.user_type, state: data.state || '', stage: data.stage || '', name: data.name || '', startDate: data.start_date, tasks: data.tasks || {}, moods: data.moods || [], journal: data.journal || [] });
      setScreen('app'); setShowDailyGuide(true);
    } else setScreen('welcome');
  };

  const saveUserProfile = async (u) => {
    if (!session) return;
    setSaving(true);
    await supabase.from('user_profiles').update({ user_type: u.type, state: u.state, stage: u.stage, name: u.name, start_date: u.startDate, tasks: u.tasks, moods: u.moods, journal: u.journal, updated_at: new Date().toISOString() }).eq('id', session.user.id);
    setSaving(false);
  };

  const updateUser = (updates) => { const n = typeof updates === 'function' ? updates(user) : { ...user, ...updates }; setUser(n); saveUserProfile(n); };

  const handleSignUp = async () => {
    setAuthError(''); setAuthMessage('');
    if (authPassword.length < 6) { setAuthError('Password must be at least 6 characters'); return; }
    const { data, error } = await supabase.auth.signUp({ email: authEmail, password: authPassword, options: { emailRedirectTo: window.location.origin } });
    if (error) setAuthError(error.message);
    else if (data.user && !data.session) { setAuthMessage('Check your email to confirm your account!'); setAuthMode('login'); }
    else if (data.session) setSession(data.session);
  };

  const handleLogin = async () => {
    setAuthError(''); setAuthMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser({ type: '', state: '', stage: '', name: '', startDate: null, tasks: {}, moods: [], journal: [] });
    setScreen('welcome'); setTab('home');
  };

  const stages = STAGES[user.type] || [];
  const si = stages.findIndex(s => s.id === user.stage);
  const cur = stages[si];
  const pct = stages.length > 1 ? (si / (stages.length - 1)) * 100 : 0;
  const days = user.startDate ? Math.floor((Date.now() - user.startDate) / 86400000) : 0;
  const reminder = REMINDERS[cur?.id];
  const hardMoments = HARD_MOMENTS[user.type] || [];
  const dailyFocus = DAILY_FOCUS[user.type]?.[cur?.id] || [];
  const todayMood = user.moods.find(m => new Date(m.date).toDateString() === new Date().toDateString());
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  useEffect(() => { if (cur && !user.tasks[cur.id]) setUser(u => ({ ...u, tasks: { ...u.tasks, [cur.id]: cur.tasks.map((t, i) => ({ id: i, text: t, done: false })) } })); }, [cur]);

  const tasks = user.tasks[cur?.id] || [];
  const done = tasks.filter(t => t.done).length;
  const toggle = id => { const n = { ...user.tasks, [cur.id]: user.tasks[cur.id].map(t => t.id === id ? { ...t, done: !t.done } : t) }; updateUser({ tasks: n }); };
  const logMood = m => { updateUser({ moods: [...user.moods, { date: Date.now(), mood: m }] }); setModal(null); };
  const saveJ = () => { if (journalText.trim()) { updateUser({ journal: [...user.journal, { date: Date.now(), text: journalText }] }); setJournalText(''); setModal(null); } };
  const calcTotal = () => calc.base + (calc.csection ? 3500 : 0) + (calc.twins ? 7500 : 0);
  const askAi = () => { if (aiQuery.trim()) setAiResponse(buildAIResponse(aiQuery, user)); };
  const timeline = () => { if (!user.startDate) return []; let w = 0; return stages.map((s, i) => { const start = new Date(user.startDate + w * 604800000); w += s.weeks; return { ...s, start, end: new Date(user.startDate + w * 604800000), status: i < si ? 'done' : i === si ? 'current' : 'future' }; }); };

  const closeModal = () => { setModal(null); setModalData(null); setAiResponse(''); setAiQuery(''); };

  const base = { minHeight: '100vh', background: BG, fontFamily: "'SF Pro Display',-apple-system,sans-serif", color: C.text, position: 'relative', overflow: 'hidden' };
  const page = { ...base, padding: 20, paddingBottom: screen === 'app' ? 110 : 20 };
  const container = { maxWidth: 420, margin: '0 auto', position: 'relative', zIndex: 1 };

  const Nav = () => (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '12px 20px 28px' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderRadius: 28, border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-around', padding: '14px 8px' }}>
        {[{ id: 'home', icon: Icons.home, label: 'Home' },{ id: 'learn', icon: Icons.learn, label: 'Learn' },{ id: 'support', icon: Icons.heart, label: 'Support' },{ id: 'profile', icon: Icons.profile, label: 'Profile' }].map(n => (
          <div key={n.id} onClick={() => setTab(n.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '8px 16px', borderRadius: 16, background: tab === n.id ? C.accentLight : 'transparent', transition: 'all 0.2s' }}>
            {n.icon(tab === n.id)}
            <span style={{ fontSize: 11, fontWeight: 600, color: tab === n.id ? C.accent : C.textMuted }}>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (authLoading) return <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}>{Icons.logo()}<p style={{ marginTop: 20, color: C.textMuted }}>Loading...</p></div></div>;

  // Auth Screen
  if (!session) return (
    <div style={page}>
      <Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} />
      <Orb size={150} top="60%" left="80%" color="rgba(200,170,255,0.35)" blur={60} />
      <div style={container}>
        <div style={{ textAlign: 'center', paddingTop: 60, marginBottom: 50 }}>{Icons.logo()}<h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 16, marginBottom: 8 }}>Gestational<span style={{ color: C.accent }}>.ly</span></h1><p style={{ color: C.textMuted, fontSize: 16 }}>Your surrogacy companion</p></div>
        <Glass intensity="strong" glow style={{ marginBottom: 24, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          {authError && <div style={{ background: 'rgba(199,125,110,0.15)', padding: 12, borderRadius: 12, marginBottom: 16 }}><p style={{ color: C.accent, fontSize: 14, margin: 0 }}>{authError}</p></div>}
          {authMessage && <div style={{ background: 'rgba(111,175,122,0.15)', padding: 12, borderRadius: 12, marginBottom: 16 }}><p style={{ color: C.success, fontSize: 14, margin: 0 }}>{authMessage}</p></div>}
          <div style={{ marginBottom: 16 }}><div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>{Icons.email()}<span style={{ fontSize: 14, color: C.textMuted }}>Email</span></div><Glass intensity="strong" style={{ padding: 0 }}><input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="your@email.com" style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 17, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} /></Glass></div>
          <div style={{ marginBottom: 24 }}><div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>{Icons.lock()}<span style={{ fontSize: 14, color: C.textMuted }}>Password</span></div><Glass intensity="strong" style={{ padding: 0 }}><input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 17, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} /></Glass></div>
          <GlassButton fullWidth size="large" onClick={authMode === 'login' ? handleLogin : handleSignUp} disabled={!authEmail || !authPassword}>{authMode === 'login' ? 'Sign In' : 'Create Account'}</GlassButton>
        </Glass>
        <div style={{ textAlign: 'center' }}><p style={{ color: C.textMuted, fontSize: 14 }}>{authMode === 'login' ? "Don't have an account?" : "Already have an account?"}<span onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); setAuthMessage(''); }} style={{ color: C.accent, fontWeight: 600, marginLeft: 8, cursor: 'pointer' }}>{authMode === 'login' ? 'Sign Up' : 'Sign In'}</span></p></div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // MODALS - Using ModalWrapper component (defined outside App)
  // ═══════════════════════════════════════════════════════════════
  
  // Resource Modal
  if (modal === 'resource' && modalData) return (
    <ModalWrapper isOpen={true} title={modalData.title} onClose={closeModal} container={container}>
      <GlassPill>{modalData.cat}</GlassPill>
      <p style={{ color: C.textMuted, margin: '10px 0 24px', fontSize: 14 }}>{modalData.time} read</p>
      <Glass intensity="strong" style={{ padding: 24 }}>
        <pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{modalData.content}</pre>
      </Glass>
    </ModalWrapper>
  );
  
  // Mood Modal
  if (modal === 'mood') return (
    <ModalWrapper isOpen={true} title="How are you feeling?" onClose={closeModal} container={container}>
      {MOODS.map(m => (
        <Glass key={m.label} onClick={() => logMood(m.label)} intensity="normal" style={{ marginBottom: 12, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{m.emoji}</div>
            <span style={{ fontSize: 17, fontWeight: 500 }}>{m.label}</span>
          </div>
        </Glass>
      ))}
    </ModalWrapper>
  );
  
  // Journal Modal
  if (modal === 'journal') return (
    <ModalWrapper isOpen={true} title="Journal" onClose={closeModal} container={container}>
      <Glass intensity="strong" style={{ marginBottom: 16, padding: 0 }}>
        <textarea 
          value={journalText} 
          onChange={e => setJournalText(e.target.value)} 
          placeholder="What's on your mind today?" 
          style={{ width: '100%', minHeight: 160, padding: 20, border: 'none', background: 'transparent', fontSize: 16, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.6 }} 
        />
      </Glass>
      <GlassButton onClick={saveJ} fullWidth disabled={!journalText.trim()}>Save Entry</GlassButton>
      {user.journal.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Previous Entries</h3>
          {[...user.journal].reverse().slice(0, 5).map((j, i) => (
            <Glass key={i} intensity="normal" style={{ marginBottom: 12, padding: 16 }}>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{new Date(j.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>{j.text}</p>
            </Glass>
          ))}
        </div>
      )}
    </ModalWrapper>
  );
  
  // Calculator Modal
  if (modal === 'calculator') return (
    <ModalWrapper isOpen={true} title="Compensation Calculator" onClose={closeModal} container={container}>
      <Glass intensity="strong" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 14, color: C.textMuted }}>Base Compensation</label>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.accent }}>${calc.base.toLocaleString()}</div>
          <input type="range" min="35000" max="80000" step="1000" value={calc.base} onChange={e => setCalc(c => ({ ...c, base: +e.target.value }))} style={{ width: '100%', marginTop: 12, accentColor: C.accent }} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[['csection', 'C-Section', '+$3,500'], ['twins', 'Twins', '+$7,500']].map(([k, l, v]) => (
            <Glass key={k} onClick={() => setCalc(c => ({ ...c, [k]: !c[k] }))} variant={calc[k] ? 'accent' : 'default'} intensity="normal" glow={calc[k]} style={{ padding: 16, flex: '1 1 45%', textAlign: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{l}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{v}</div>
            </Glass>
          ))}
        </div>
      </Glass>
      <Glass intensity="strong" variant="accent" glow style={{ padding: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 8 }}>Estimated Total</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: C.accent }}>${calcTotal().toLocaleString()}</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 8 }}>After taxes (~28%): ${Math.round(calcTotal() * 0.72).toLocaleString()} net</div>
        </div>
      </Glass>
    </ModalWrapper>
  );
  
  // Timeline Modal
  if (modal === 'timeline') return (
    <ModalWrapper isOpen={true} title="Your Timeline" onClose={closeModal} container={container}>
      <p style={{ color: C.textMuted, marginBottom: 24 }}>Estimated dates based on your start</p>
      {timeline().map((s, i) => (
        <div key={s.id} style={{ display: 'flex', marginBottom: 20 }}>
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: s.status === 'done' ? C.success : s.status === 'current' ? C.accent : C.textLight, boxShadow: s.status === 'current' ? `0 0 12px ${C.accent}50` : 'none' }} />
            {i < timeline().length - 1 && <div style={{ width: 2, flex: 1, background: s.status === 'done' ? C.success : C.textLight, marginTop: 4, opacity: 0.5 }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</span>
              {s.status === 'current' && <GlassPill color={C.accent}>Now</GlassPill>}
              {s.status === 'done' && <span style={{ fontSize: 12, color: C.success }}>✓</span>}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>{s.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {s.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
      ))}
    </ModalWrapper>
  );
  
  // Hard Moments Modal
  if (modal === 'hardMoments') return (
    <ModalWrapper isOpen={true} title="Hard Moments" onClose={closeModal} container={container}>
      <p style={{ color: C.textMuted, marginBottom: 24 }}>Support for the tough times. You're not alone.</p>
      {hardMoments.map(h => (
        <Glass key={h.id} onClick={() => { setModal('hardDetail'); setModalData(h); }} intensity="normal" style={{ marginBottom: 12, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 16 }}>{h.title}</span>
            {Icons.chevron()}
          </div>
        </Glass>
      ))}
    </ModalWrapper>
  );
  
  // Hard Moment Detail Modal
  if (modal === 'hardDetail' && modalData) return (
    <ModalWrapper isOpen={true} title={modalData.title} onClose={closeModal} container={container}>
      <Glass intensity="strong" style={{ padding: 24 }}>
        <pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{modalData.content}</pre>
      </Glass>
    </ModalWrapper>
  );

  // AI Modal - FIXED: Using controlled input properly
  if (modal === 'ai') {
    const suggestions = user.type === 'gc' 
      ? ['How much can I earn?', `What are the laws in ${user.state}?`, 'What are the requirements?', 'Tell me about the transfer process']
      : ['What are the total costs?', `What are the laws in ${user.state}?`, 'How do I find a carrier?', 'What is the timeline?'];
    return (
      <ModalWrapper isOpen={true} title="" onClose={closeModal} container={container}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: `0 8px 24px ${C.accent}40` }}>
            {Icons.sparkle()}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Ask Me Anything</h2>
          <p style={{ color: C.textMuted, fontSize: 14, margin: 0 }}>I'm here to help with your surrogacy journey</p>
        </div>
        
        <Glass intensity="strong" style={{ marginBottom: 16, padding: 0, display: 'flex', alignItems: 'center' }}>
          <input 
            type="text"
            value={aiQuery} 
            onChange={e => setAiQuery(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && askAi()} 
            placeholder="Type your question..." 
            autoComplete="off"
            style={{ flex: 1, padding: '18px 20px', border: 'none', background: 'transparent', fontSize: 16, outline: 'none', boxSizing: 'border-box' }} 
          />
          <div onClick={askAi} style={{ padding: '12px 16px', cursor: aiQuery.trim() ? 'pointer' : 'default', opacity: aiQuery.trim() ? 1 : 0.4 }}>{Icons.send()}</div>
        </Glass>
        
        {aiResponse && (
          <Glass intensity="strong" variant="accent" style={{ marginBottom: 20, padding: 24 }}>
            <pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{aiResponse}</pre>
          </Glass>
        )}
        
        {!aiResponse && (
          <div>
            <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, fontWeight: 500 }}>Popular questions:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {suggestions.map((q, i) => (
                <Glass key={i} onClick={() => setAiQuery(q)} intensity="subtle" style={{ padding: '10px 14px', borderRadius: 12, cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{q}</span>
                </Glass>
              ))}
            </div>
          </div>
        )}
      </ModalWrapper>
    );
  }

  // Daily Guide Popup
  if (screen === 'app' && showDailyGuide && dailyFocus.length > 0) return (
    <div style={page}><Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} /><div style={container}><Glass intensity="strong" glow style={{ marginTop: 60, padding: 28 }}><div style={{ background: `linear-gradient(135deg, ${C.accent}, #9070a0)`, borderRadius: 20, padding: 24, marginBottom: 24, color: 'white', textAlign: 'center' }}><div style={{ fontSize: 15, opacity: 0.9 }}>{greet}</div><h2 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>{user.name}</h2><div style={{ fontSize: 14, opacity: 0.85 }}>Day {days} • {cur?.name}</div></div><div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Your Focus Today</div>{dailyFocus[0] && <Glass onClick={() => { setShowDailyGuide(false); if (dailyFocus[0].r) { setModal('resource'); setModalData(RESOURCES[dailyFocus[0].r]); } }} variant="accent" intensity="normal" glow style={{ padding: 18, marginBottom: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 17, color: C.accent }}>{dailyFocus[0].t}</div><div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{dailyFocus[0].d}</div></div>{dailyFocus[0].r && Icons.chevron()}</div></Glass>}<GlassButton onClick={() => setShowDailyGuide(false)} fullWidth variant="secondary">I'll explore on my own</GlassButton></Glass></div></div>
  );

  // Welcome Screen
  if (screen === 'welcome') return (
    <div style={page}><Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} /><Orb size={150} top="60%" left="80%" color="rgba(200,170,255,0.35)" blur={60} /><div style={{ ...container, textAlign: 'center', paddingTop: 80 }}>{Icons.logo()}<h1 style={{ fontSize: 36, fontWeight: 700, marginTop: 20, marginBottom: 10 }}>Gestational<span style={{ color: C.accent }}>.ly</span></h1><p style={{ color: C.textMuted, marginBottom: 50, fontSize: 17 }}>Your surrogacy companion</p><Glass intensity="strong" glow style={{ padding: 28, marginBottom: 20, textAlign: 'left' }}><h3 style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>What you'll get</h3>{['Stage-by-stage guidance tailored to you', 'Comprehensive educational resources', 'Support for the hard moments', 'Budget & compensation calculators', 'Journal & mood tracking'].map((f, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}><div style={{ width: 32, height: 32, borderRadius: 10, background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{Icons.check(C.accent)}</div><span style={{ fontSize: 15 }}>{f}</span></div>)}</Glass><GlassButton onClick={() => setScreen('onboard')} fullWidth size="large">Begin Your Journey</GlassButton><p style={{ marginTop: 24, fontSize: 12, color: C.textLight }}>For educational purposes only</p></div></div>
  );

  // Onboarding
  if (screen === 'onboard') {
    const onboardSteps = [
      <div key="t"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>I am a...</h2><p style={{ color: C.textMuted, margin: 0 }}>This personalizes your experience</p></Glass>{[['gc', 'Gestational Carrier', 'Carrying for intended parents'], ['ip', 'Intended Parent', 'Building my family through surrogacy']].map(([k, l, d]) => <Glass key={k} onClick={() => setUser(u => ({ ...u, type: k }))} variant={user.type === k ? 'accent' : 'default'} glow={user.type === k} intensity="normal" style={{ marginBottom: 12, padding: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 17 }}>{l}</div><div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{d}</div></div>{user.type === k && <div style={{ width: 26, height: 26, borderRadius: 13, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.check()}</div>}</div></Glass>)}<GlassButton onClick={() => setStep(1)} disabled={!user.type} fullWidth style={{ marginTop: 24 }}>Continue</GlassButton></div>,
      <div key="s"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Your State</h2><p style={{ color: C.textMuted, margin: 0 }}>Laws vary significantly by location</p></Glass><Glass intensity="strong" style={{ marginBottom: 24, padding: 0 }}><select value={user.state} onChange={e => setUser(u => ({ ...u, state: e.target.value }))} style={{ width: '100%', padding: 18, border: 'none', background: 'transparent', fontSize: 17, outline: 'none' }}><option value="">Select your state</option>{STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></Glass><div style={{ display: 'flex', gap: 12 }}><GlassButton variant="secondary" onClick={() => setStep(0)} style={{ flex: 1 }}>Back</GlassButton><GlassButton onClick={() => setStep(2)} disabled={!user.state} style={{ flex: 2 }}>Continue</GlassButton></div></div>,
      <div key="st"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Current Stage</h2><p style={{ color: C.textMuted, margin: 0 }}>Where are you in your journey?</p></Glass><div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 24 }}>{stages.map(s => <Glass key={s.id} onClick={() => setUser(u => ({ ...u, stage: s.id }))} variant={user.stage === s.id ? 'accent' : 'default'} glow={user.stage === s.id} intensity="normal" style={{ marginBottom: 10, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</div><div style={{ fontSize: 13, color: C.textMuted }}>{s.duration}</div></div>{user.stage === s.id && <div style={{ width: 24, height: 24, borderRadius: 12, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.check()}</div>}</div></Glass>)}</div><div style={{ display: 'flex', gap: 12 }}><GlassButton variant="secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</GlassButton><GlassButton onClick={() => setStep(3)} disabled={!user.stage} style={{ flex: 2 }}>Continue</GlassButton></div></div>,
      <div key="n"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Your Name</h2><p style={{ color: C.textMuted, margin: 0 }}>What should we call you?</p></Glass><Glass intensity="strong" style={{ marginBottom: 24, padding: 0 }}><input type="text" value={user.name} onChange={e => setUser(u => ({ ...u, name: e.target.value }))} placeholder="First name" style={{ width: '100%', padding: 18, border: 'none', background: 'transparent', fontSize: 17, outline: 'none', boxSizing: 'border-box' }} /></Glass><div style={{ display: 'flex', gap: 12 }}><GlassButton variant="secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Back</GlassButton><GlassButton onClick={() => { const f = { ...user, startDate: Date.now() }; setUser(f); saveUserProfile(f); setStep(4); }} disabled={!user.name.trim()} style={{ flex: 2 }}>Continue</GlassButton></div></div>,
      <div key="d" style={{ textAlign: 'center', paddingTop: 60 }}><Glass intensity="strong" glow variant="success" style={{ width: 90, height: 90, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', borderRadius: 28 }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="3" strokeLinecap="round"><path d="M4 12l6 6L20 6"/></svg></Glass><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Welcome, {user.name}!</h2><p style={{ color: C.textMuted, marginBottom: 40, fontSize: 16 }}>Your personalized companion is ready</p><GlassButton onClick={() => { setScreen('app'); setTab('home'); }} fullWidth size="large">Go to Dashboard</GlassButton></div>
    ];
    return <div style={page}><Orb size={180} top="-40px" left="-20px" color="rgba(255,180,150,0.35)" blur={60} /><Orb size={120} top="70%" left="85%" color="rgba(200,170,255,0.3)" blur={50} /><div style={container}>{onboardSteps[step]}</div></div>;
  }

  // HOME TAB
  if (tab === 'home') return (
    <div style={page}><Orb size={200} top="-60px" left="-30px" color="rgba(255,180,150,0.35)" blur={70} /><Orb size={140} top="45%" left="90%" color="rgba(200,170,255,0.25)" blur={50} /><div style={container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}><div><p style={{ color: C.textMuted, margin: 0, fontSize: 15 }}>{greet}</p><h1 style={{ fontSize: 28, fontWeight: 700, margin: '4px 0 0' }}>{user.name}</h1></div><Glass onClick={() => setModal('mood')} variant={todayMood ? 'success' : 'default'} intensity="normal" glow={!!todayMood} style={{ width: 48, height: 48, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}><div style={{ fontSize: 20 }}>{todayMood ? MOODS.find(m => m.label === todayMood.mood)?.emoji || '😊' : '📝'}</div></Glass></div>
      
      <Glass onClick={() => setModal('ai')} variant="accent" intensity="normal" style={{ marginBottom: 20, padding: 16 }}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{Icons.ai()}<span style={{ color: C.textSecondary, fontSize: 15 }}>Ask me anything about surrogacy...</span></div></Glass>
      
      {dailyFocus.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>{Icons.target()}<span style={{ fontSize: 14, fontWeight: 700 }}>Today's Focus</span><GlassPill>{cur?.name}</GlassPill></div>{dailyFocus.slice(0, 2).map((f, i) => <Glass key={i} onClick={() => f.r && (setModal('resource'), setModalData(RESOURCES[f.r]))} intensity={i === 0 ? 'strong' : 'normal'} variant={i === 0 ? 'accent' : 'default'} glow={i === 0} style={{ marginBottom: 10, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 15 }}>{f.t}</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{f.d}</div></div>{f.r && Icons.chevron()}</div></Glass>)}</div>}
      
      {reminder && <Glass variant={reminder.urgent ? 'warning' : 'default'} intensity="normal" style={{ marginBottom: 20, padding: 16 }}><div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>{Icons.alert()}<div><div style={{ fontWeight: 600, fontSize: 15 }}>{reminder.title}</div><div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{reminder.desc}</div></div></div></Glass>}
      
      <Glass intensity="strong" style={{ marginBottom: 20 }}><div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><div style={{ position: 'relative' }}><GlassProgress value={pct} size={80} /><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 16, fontWeight: 700 }}>{Math.round(pct)}%</span></div></div><div style={{ flex: 1 }}><div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Day {days} • {cur?.name}</div><div style={{ fontSize: 18, fontWeight: 700 }}>{cur?.duration}</div></div></div><Glass onClick={() => setModal('timeline')} intensity="subtle" style={{ marginTop: 14, padding: 12, borderRadius: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 13, color: C.textSecondary }}>View full timeline</span>{Icons.chevron()}</div></Glass></Glass>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}><span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' }}>Stage Tasks</span><GlassPill color={done === tasks.length && tasks.length > 0 ? C.success : C.textMuted}>{done}/{tasks.length}</GlassPill></div>
      <Glass intensity="strong" style={{ marginBottom: 20, padding: 16 }}>{tasks.length === 0 ? <p style={{ color: C.textMuted, margin: 0, textAlign: 'center' }}>Loading tasks...</p> : tasks.map((t, i) => <div key={t.id} style={{ marginBottom: i < tasks.length - 1 ? 14 : 0 }}><div onClick={() => toggle(t.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}><div style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0, marginTop: 1, background: t.done ? C.success : 'rgba(255,255,255,0.8)', border: `2px solid ${t.done ? C.success : 'rgba(0,0,0,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.done ? `0 2px 8px ${C.success}40` : 'none', transition: 'all 0.2s' }}>{t.done && Icons.check()}</div><span style={{ fontSize: 15, color: t.done ? C.textLight : C.text, textDecoration: t.done ? 'line-through' : 'none', lineHeight: 1.5 }}>{t.text}</span></div></div>)}</Glass>
      
      <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Quick Tools</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}><Glass onClick={() => setModal('journal')} intensity="normal" style={{ padding: 16, textAlign: 'center' }}>{Icons.journal()}<div style={{ fontSize: 12, marginTop: 8, fontWeight: 500 }}>Journal</div></Glass><Glass onClick={() => setModal('calculator')} intensity="normal" style={{ padding: 16, textAlign: 'center' }}>{Icons.calculator()}<div style={{ fontSize: 12, marginTop: 8, fontWeight: 500 }}>Calculator</div></Glass><Glass onClick={() => setModal('hardMoments')} intensity="normal" style={{ padding: 16, textAlign: 'center' }}>{Icons.support()}<div style={{ fontSize: 12, marginTop: 8, fontWeight: 500 }}>Support</div></Glass></div>
    </div><Nav /></div>
  );

  // LEARN TAB
  if (tab === 'learn') {
    const cats = [{ k: 'Medical', icon: Icons.medical, items: ['screening', 'medications', 'transfer', 'ivf'] },{ k: 'Legal', icon: Icons.legal, items: ['contract', 'escrow', 'attorneys', 'parentage'] },{ k: 'Financial', icon: Icons.financial, items: ['compensation', 'budget', 'insurance'] },{ k: 'Wellness', icon: Icons.wellness, items: ['relationship', 'therapists'] }];
    return (
      <div style={page}><Orb size={180} top="-40px" left="-20px" color="rgba(255,180,150,0.3)" blur={60} /><div style={container}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Learn</h1>
        <p style={{ color: C.textMuted, marginBottom: 24, fontSize: 15 }}>Comprehensive guides for your journey</p>
        <Glass onClick={() => setModal('ai')} variant="accent" intensity="normal" style={{ marginBottom: 28, padding: 16 }}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{Icons.ai()}<span style={{ color: C.textSecondary, fontSize: 15 }}>Ask me anything...</span></div></Glass>
        {cats.map(c => (<div key={c.k} style={{ marginBottom: 28 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>{c.icon()}<span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' }}>{c.k}</span></div>{c.items.map(k => RESOURCES[k] && (<Glass key={k} onClick={() => { setModal('resource'); setModalData(RESOURCES[k]); }} intensity="normal" style={{ marginBottom: 10, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 15 }}>{RESOURCES[k].title}</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{RESOURCES[k].time} read</div></div>{Icons.chevron()}</div></Glass>))}</div>))}
      </div><Nav /></div>
    );
  }

  // SUPPORT TAB
  if (tab === 'support') return (
    <div style={page}><Orb size={160} top="10%" left="80%" color="rgba(200,170,255,0.3)" blur={50} /><div style={container}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>Support</h1>
      <p style={{ color: C.textMuted, marginBottom: 28, fontSize: 15 }}>Tools and resources when you need them</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>{[{ icon: Icons.journal, l: 'Journal', d: `${user.journal.length} entries`, a: () => setModal('journal') },{ icon: Icons.calculator, l: 'Calculator', d: 'Estimate compensation', a: () => setModal('calculator') },{ icon: Icons.timeline, l: 'Timeline', d: 'View your dates', a: () => setModal('timeline') },{ icon: Icons.support, l: 'Hard Moments', d: 'Get support', a: () => setModal('hardMoments') }].map((x, i) => (<Glass key={i} onClick={x.a} intensity="normal" style={{ padding: 20, textAlign: 'center' }}><div style={{ marginBottom: 10 }}>{x.icon()}</div><div style={{ fontWeight: 600, fontSize: 15 }}>{x.l}</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{x.d}</div></Glass>))}</div>
      <Glass onClick={() => setModal('ai')} variant="accent" intensity="normal" style={{ marginBottom: 28, padding: 18 }}><div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.sparkle()}</div><div><div style={{ fontWeight: 600, fontSize: 16 }}>Ask Me Anything</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>Get answers to your questions</div></div></div></Glass>
      {user.moods.length > 0 && (<div><h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Moods</h3><Glass intensity="normal" style={{ padding: 16 }}><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{user.moods.slice(-14).map((m, i) => { const mood = MOODS.find(x => x.label === m.mood); return (<div key={i} style={{ width: 40, height: 40, borderRadius: 12, background: mood?.color || C.textLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 16 }}>{mood?.emoji || '😐'}</span></div>); })}</div>{user.moods.length >= 7 && <p style={{ fontSize: 12, color: C.textMuted, marginTop: 12, marginBottom: 0 }}>Last {Math.min(user.moods.length, 14)} check-ins</p>}</Glass></div>)}
    </div><Nav /></div>
  );

  // PROFILE TAB
  if (tab === 'profile') return (
    <div style={page}><Orb size={140} top="5%" left="-10%" color="rgba(255,180,150,0.3)" blur={50} /><div style={container}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 28 }}>Profile</h1>
      <Glass intensity="strong" style={{ marginBottom: 20 }}><div style={{ textAlign: 'center', marginBottom: 20 }}><div style={{ width: 90, height: 90, borderRadius: 45, background: `linear-gradient(135deg, ${C.accent}, #9070a0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 36, color: 'white', fontWeight: 600, boxShadow: `0 8px 24px ${C.accent}30` }}>{user.name.charAt(0).toUpperCase()}</div><h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{user.name}</h2><p style={{ color: C.textMuted, margin: '6px 0 0', fontSize: 14 }}>{session?.user?.email}</p></div><div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 20 }}>{[['Role', user.type === 'gc' ? 'Gestational Carrier' : 'Intended Parent'],['Location', user.state],['Stage', cur?.name || 'Not set'],['Journey Day', days]].map(([k, v]) => (<div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}><span style={{ color: C.textMuted }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span></div>))}</div></Glass>
      <Glass intensity="strong" style={{ marginBottom: 20 }}><h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Your Stats</h3><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}><div><div style={{ fontSize: 28, fontWeight: 700, color: C.accent }}>{Object.values(user.tasks).flat().filter(t => t.done).length}</div><div style={{ fontSize: 12, color: C.textMuted }}>Tasks Done</div></div><div><div style={{ fontSize: 28, fontWeight: 700, color: C.success }}>{user.moods.length}</div><div style={{ fontSize: 12, color: C.textMuted }}>Mood Logs</div></div><div><div style={{ fontSize: 28, fontWeight: 700, color: C.warning }}>{user.journal.length}</div><div style={{ fontSize: 12, color: C.textMuted }}>Journal Entries</div></div></div></Glass>
      <Glass onClick={handleLogout} intensity="normal" style={{ padding: 18 }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: C.accent }}>{Icons.logout()}<span style={{ fontWeight: 600, fontSize: 16 }}>Sign Out</span></div></Glass>
      <div style={{ textAlign: 'center', marginTop: 28 }}><p style={{ fontSize: 12, color: C.textLight }}>Gestational.ly v15.1</p><p style={{ fontSize: 11, color: C.textLight, marginTop: 4 }}>For educational purposes only</p></div>
    </div><Nav /></div>
  );

  return null;
}

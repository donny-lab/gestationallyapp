import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// GESTATIONAL.LY V12 - Polished & Bug-Free
// Full liquid glass, fixed navigation, proper icons
// ═══════════════════════════════════════════════════════════════

const BG = `
  radial-gradient(ellipse at 30% 20%, rgba(255, 180, 150, 0.4) 0%, transparent 50%),
  radial-gradient(ellipse at 70% 60%, rgba(200, 170, 255, 0.3) 0%, transparent 50%),
  radial-gradient(ellipse at 20% 80%, rgba(150, 200, 255, 0.25) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(255, 200, 230, 0.3) 0%, transparent 50%),
  linear-gradient(160deg, #fef5f0 0%, #f8f0ff 30%, #f0f5ff 60%, #fff5f8 100%)
`;

const Orb = ({ size, top, left, color, blur = 60 }) => (
  <div style={{
    position: 'absolute', width: size, height: size, top, left,
    background: color, borderRadius: '50%', filter: `blur(${blur}px)`,
    opacity: 0.6, pointerEvents: 'none', zIndex: 0,
  }} />
);

const C = {
  accent: '#c77d6e',
  accentDark: '#a86558',
  accentLight: 'rgba(199, 125, 110, 0.15)',
  success: '#6faf7a',
  successLight: 'rgba(111, 175, 122, 0.15)',
  warning: '#c9a066',
  warningLight: 'rgba(201, 160, 102, 0.15)',
  text: '#1a1a1a',
  textSecondary: '#4a4a4a',
  textMuted: '#7a7a7a',
  textLight: '#a0a0a0',
};

// ═══════════════════════════════════════════════════════════════
// GLASS COMPONENT
// ═══════════════════════════════════════════════════════════════
const Glass = ({ children, style, onClick, variant = 'default', intensity = 'normal', glow = false }) => {
  const intensities = {
    subtle: { bg: 'rgba(255,255,255,0.45)', blur: 16, border: 'rgba(255,255,255,0.5)' },
    normal: { bg: 'rgba(255,255,255,0.6)', blur: 24, border: 'rgba(255,255,255,0.7)' },
    strong: { bg: 'rgba(255,255,255,0.75)', blur: 32, border: 'rgba(255,255,255,0.85)' },
  };
  const variants = {
    default: { tint: 'transparent', glowColor: 'rgba(255,255,255,0.5)' },
    accent: { tint: 'rgba(199, 125, 110, 0.1)', glowColor: 'rgba(199, 125, 110, 0.25)' },
    success: { tint: 'rgba(111, 175, 122, 0.1)', glowColor: 'rgba(111, 175, 122, 0.25)' },
    warning: { tint: 'rgba(201, 160, 102, 0.12)', glowColor: 'rgba(201, 160, 102, 0.25)' },
  };
  const i = intensities[intensity] || intensities.normal;
  const v = variants[variant] || variants.default;
  
  return (
    <div onClick={onClick} style={{
      position: 'relative',
      background: i.bg,
      backdropFilter: `blur(${i.blur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${i.blur}px) saturate(180%)`,
      borderRadius: 20,
      border: `1px solid ${i.border}`,
      boxShadow: `0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.9)${glow ? `, 0 0 30px ${v.glowColor}` : ''}`,
      padding: 20,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.25s ease',
      ...style
    }}>
      <div style={{ position: 'absolute', inset: 0, background: v.tint, borderRadius: 20, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

const GlassPill = ({ children, color = C.accent }) => (
  <span style={{
    display: 'inline-block', padding: '5px 12px',
    background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)',
    borderRadius: 100, border: '1px solid rgba(255,255,255,0.6)',
    fontSize: 12, fontWeight: 600, color,
  }}>{children}</span>
);

const GlassButton = ({ children, onClick, variant = 'primary', disabled, fullWidth, size = 'normal', style }) => {
  const sizes = { small: { p: '10px 16px', fs: 14 }, normal: { p: '14px 24px', fs: 15 }, large: { p: '18px 32px', fs: 16 } };
  const s = sizes[size];
  const isPrimary = variant === 'primary';
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      padding: s.p, fontSize: s.fs, fontWeight: 600, borderRadius: 16,
      background: isPrimary ? `linear-gradient(135deg, ${C.accent}, ${C.accentDark})` : 'rgba(255,255,255,0.7)',
      color: isPrimary ? 'white' : C.text,
      border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.7)',
      boxShadow: isPrimary ? '0 6px 20px rgba(199,125,110,0.35)' : '0 4px 12px rgba(0,0,0,0.06)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'inherit', transition: 'all 0.2s',
      ...style
    }}>{children}</button>
  );
};

const GlassProgress = ({ value, size = 90 }) => {
  const stroke = 8, radius = (size - stroke) / 2;
  const circ = radius * 2 * Math.PI, offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{
        position: 'absolute', inset: 6, borderRadius: '50%',
        background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
      }} />
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
        <defs>
          <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.accent}/><stop offset="100%" stopColor="#9070a0"/>
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="url(#pg)" strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ICONS - Fixed sizes with proper viewBox
// ═══════════════════════════════════════════════════════════════
const Icons = {
  logo: () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="44" y2="44">
          <stop stopColor={C.accent}/><stop offset="1" stopColor="#9070a0"/>
        </linearGradient>
      </defs>
      <circle cx="22" cy="22" r="20" stroke="url(#lg1)" strokeWidth="1.5" opacity="0.3"/>
      <circle cx="22" cy="22" r="12" stroke="url(#lg1)" strokeWidth="2" opacity="0.6"/>
      <circle cx="22" cy="22" r="5" fill="url(#lg1)"/>
    </svg>
  ),
  // Navigation icons - consistent 24x24 with proper padding
  home: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5V20a1 1 0 001 1h5v-6a1 1 0 011-1h4a1 1 0 011 1v6h5a1 1 0 001-1v-9.5" 
        stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" fill={active ? C.accentLight : 'none'}/>
      <path d="M2 12l10-9 10 9" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  learn: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" fill={active ? C.accentLight : 'none'}/>
      <path d="M8 6h8M8 10h8M8 14h5" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  heart: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? C.accentLight : 'none'}>
      <path d="M12 19s-6-4-6-9a4 4 0 018 0 4 4 0 018 0c0 5-6 9-6 9z" 
        stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  profile: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" fill={active ? C.accentLight : 'none'}/>
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  check: (color = 'white') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"><path d="M4 12l6 6L20 6"/></svg>,
  chevron: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textLight} strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>,
  close: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill={C.warningLight} stroke={C.warning} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 7v5M12 16h.01" strokeLinecap="round"/></svg>,
  sparkle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill={C.accent}><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/></svg>,
  // Tool icons
  journal: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill={C.accentLight} stroke={C.textMuted} strokeWidth="1.5"/><path d="M14 2v6h6M12 18v-6M9 15h6" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  calculator: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" fill={C.successLight} stroke={C.textMuted} strokeWidth="1.5"/><rect x="7" y="5" width="10" height="4" rx="1" stroke={C.textMuted} strokeWidth="1.5"/><circle cx="8" cy="13" r="1" fill={C.textMuted}/><circle cx="12" cy="13" r="1" fill={C.textMuted}/><circle cx="16" cy="13" r="1" fill={C.textMuted}/><circle cx="8" cy="17" r="1" fill={C.textMuted}/><circle cx="12" cy="17" r="1" fill={C.textMuted}/><circle cx="16" cy="17" r="1" fill={C.textMuted}/></svg>,
  timeline: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.5" fill="rgba(160,130,200,0.2)" stroke={C.textMuted} strokeWidth="1.5"/><circle cx="6" cy="18" r="2.5" fill={C.accentLight} stroke={C.textMuted} strokeWidth="1.5"/><path d="M6 8.5v7M8.5 6h9a2 2 0 012 2v2M8.5 18h9a2 2 0 002-2v-2" stroke={C.textMuted} strokeWidth="1.5"/></svg>,
  support: () => <svg width="26" height="26" viewBox="0 0 24 24" fill={C.accentLight}><path d="M12 19s-6-4-6-9a4 4 0 018 0 4 4 0 018 0c0 5-6 9-6 9z" stroke={C.textMuted} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  // Category icons
  medical: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" fill={C.accentLight}/><path d="M12 7v10M7 12h10" stroke={C.accent} strokeWidth="2" strokeLinecap="round"/></svg>,
  legal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(160,130,200,0.15)"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8070a0" strokeWidth="1.5"/></svg>,
  financial: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={C.successLight}/><path d="M12 6v12M8 9c0-1.5 1.5-2 4-2s4 .5 4 2-1.5 2-4 2-4 .5-4 2 1.5 2 4 2" stroke={C.success} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  wellness: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={C.warningLight}/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke={C.warning} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  ai: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(128,112,160,0.15)" stroke="#8070a0" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke="#8070a0" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" fill="#8070a0" opacity="0.3"/></svg>,
  send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill={C.accent}><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>,
  target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={C.accent} strokeWidth="1.5" opacity="0.3"/><circle cx="12" cy="12" r="5" stroke={C.accent} strokeWidth="1.5" opacity="0.6"/><circle cx="12" cy="12" r="2" fill={C.accent}/></svg>,
};

// ═══════════════════════════════════════════════════════════════
// COMPREHENSIVE AI KNOWLEDGE BASE
// ═══════════════════════════════════════════════════════════════
const STATE_INFO = {
  'California': { type: 'favorable', prebirth: true, notes: 'Gold standard for surrogacy. Pre-birth orders available. Both genetic and non-genetic parents recognized. Very established case law.' },
  'Nevada': { type: 'favorable', prebirth: true, notes: 'Very surrogacy-friendly. Pre-birth orders available. No genetic link required for IPs.' },
  'Washington': { type: 'favorable', prebirth: true, notes: 'Surrogacy-friendly with clear statutes. Pre-birth orders available since 2019.' },
  'Illinois': { type: 'favorable', prebirth: true, notes: 'Strong surrogacy law since 2005. Pre-birth orders available. Chicago is a major surrogacy hub.' },
  'New York': { type: 'favorable', prebirth: true, notes: 'Legalized compensated surrogacy in 2021. Pre-birth orders now available. Growing surrogacy destination.' },
  'Michigan': { type: 'favorable', prebirth: true, notes: 'Surrogacy-friendly with pre-birth orders available in most counties.' },
  'Connecticut': { type: 'favorable', prebirth: true, notes: 'Surrogacy-friendly state with pre-birth orders available.' },
  'Texas': { type: 'moderate', prebirth: false, notes: 'Surrogacy allowed but requires post-birth adoption for some arrangements. Must be married IPs in some cases.' },
  'Florida': { type: 'moderate', prebirth: false, notes: 'Surrogacy allowed with some restrictions. Pre-birth orders in some counties. At least one IP must be genetic parent.' },
  'Ohio': { type: 'moderate', prebirth: false, notes: 'No surrogacy statute but contracts generally enforceable. Post-birth parentage orders typical.' },
  'Pennsylvania': { type: 'moderate', prebirth: false, notes: 'No statute but surrogacy practiced. Court-dependent for parentage orders.' },
  'Georgia': { type: 'moderate', prebirth: false, notes: 'No surrogacy statute. Contracts may not be enforceable. Proceed with caution.' },
  'Louisiana': { type: 'restrictive', prebirth: false, notes: 'Only allows gestational surrogacy for married heterosexual couples. Very restrictive.' },
  'Michigan': { type: 'favorable', prebirth: true, notes: 'Despite old anti-surrogacy statute, compensated gestational surrogacy is practiced. Pre-birth orders available.' },
  'Arizona': { type: 'favorable', prebirth: true, notes: 'Surrogacy statute passed in 2019. Pre-birth orders available.' },
  'New Jersey': { type: 'favorable', prebirth: true, notes: 'Gestational Carrier Agreement Act passed 2018. Pre-birth orders available.' },
  'Virginia': { type: 'moderate', prebirth: false, notes: 'Surrogacy allowed with court approval. Process can be complex.' },
  'Colorado': { type: 'favorable', prebirth: true, notes: 'No statute but very surrogacy-friendly courts. Pre-birth orders routinely granted.' },
  'Oregon': { type: 'favorable', prebirth: true, notes: 'Surrogacy-friendly state. Pre-birth orders available.' },
  'Massachusetts': { type: 'moderate', prebirth: false, notes: 'No statute but surrogacy practiced. Court-dependent outcomes.' },
  'Maryland': { type: 'moderate', prebirth: false, notes: 'No comprehensive statute. Surrogacy practiced but legal landscape unclear.' },
  'Minnesota': { type: 'moderate', prebirth: false, notes: 'No statute. Traditional surrogacy contracts unenforceable but gestational generally okay.' },
  'North Carolina': { type: 'moderate', prebirth: false, notes: 'No statute but surrogacy practiced. Post-birth orders typical.' },
  'Tennessee': { type: 'moderate', prebirth: false, notes: 'No statute. Surrogacy practiced but limited case law.' },
  'Indiana': { type: 'moderate', prebirth: false, notes: 'No statute but surrogacy contracts generally recognized.' },
  'South Carolina': { type: 'moderate', prebirth: false, notes: 'No statute but surrogacy practiced. Post-birth parentage typical.' },
};

const buildAIResponse = (query, user) => {
  const q = query.toLowerCase();
  const isGC = user.type === 'gc';
  const isIP = user.type === 'ip';
  const state = user.state;
  const otherState = user.otherState;
  const stateInfo = STATE_INFO[state];
  const otherStateInfo = STATE_INFO[otherState];
  const stage = user.stage;
  
  // STATE-SPECIFIC QUESTIONS
  if (q.includes('my state') || q.includes('state law') || q.includes('legal in') || (q.includes('law') && !q.includes('attorney'))) {
    if (stateInfo) {
      let response = `Based on your location in ${state}: ${stateInfo.notes}\n\n`;
      response += stateInfo.type === 'favorable' ? '✓ This is a surrogacy-friendly state.' : 
                  stateInfo.type === 'moderate' ? '⚠ Surrogacy is possible but may have complications.' :
                  '⚠ This state has restrictions. Consider working with a carrier/IPs in a more favorable state.';
      if (otherStateInfo && otherState !== 'unknown') {
        response += `\n\nYour ${isGC ? "intended parents'" : "carrier's"} state (${otherState}): ${otherStateInfo.notes}`;
      }
      response += '\n\nAlways consult with an ART attorney licensed in the relevant state(s).';
      return response;
    }
    return `I don't have specific information about ${state}'s surrogacy laws. Please consult with an ART attorney who is licensed in your state. You can find one at AAARTA.org.`;
  }

  if (q.includes('pre-birth') || q.includes('prebirth') || q.includes('birth order') || q.includes('parentage order')) {
    if (stateInfo) {
      if (stateInfo.prebirth) {
        return `Good news! ${state} allows pre-birth parentage orders. This means the intended parents can be listed on the original birth certificate.\n\nFile the pre-birth order during weeks 16-20 of pregnancy. Don't wait until the third trimester!\n\nYou'll need:\n• Signed surrogacy contract\n• Medical records confirming pregnancy\n• Your attorney to file the petition`;
      } else {
        return `${state} typically requires post-birth parentage orders. This means:\n\n• The birth certificate may initially list the carrier\n• IPs will need to complete adoption or parentage proceedings after birth\n• Process takes 2-8 weeks after delivery\n• Plan ahead and have your attorney ready\n\nConsider whether the birth should happen in a more favorable state.`;
      }
    }
    return 'Pre-birth parentage orders allow IPs to be on the original birth certificate. Available in: CA, NV, WA, IL, NY, CT, OR, CO, AZ, NJ. Other states require post-birth orders. Consult your attorney about your specific situation.';
  }

  // COMPENSATION QUESTIONS
  if (q.includes('how much') || q.includes('compensation') || q.includes('pay') || q.includes('earn') || q.includes('money') || q.includes('salary') || q.includes('paid')) {
    if (isGC) {
      let response = `Base compensation for gestational carriers: $45,000-$70,000\n\n`;
      if (state === 'California' || state === 'New York' || state === 'Illinois') {
        response += `In ${state}, compensation tends to be on the higher end ($55,000-$75,000+) due to demand.\n\n`;
      }
      response += `Additional payments:\n• Monthly allowance: $200-$300\n• Transfer fee: $1,000-$1,500 each\n• C-section: $2,500-$5,000\n• Multiples: $5,000-$10,000\n• Bed rest: $200-$250/week\n• Maternity clothes: $500-$1,000\n\n`;
      response += `Important: Set aside 25-30% for taxes. Surrogacy compensation is taxable income.`;
      return response;
    } else {
      return `Total surrogacy costs for intended parents: $100,000-$200,000+\n\nBreakdown:\n• GC compensation & expenses: $55,000-$95,000\n• Agency fees (if used): $20,000-$35,000\n• Legal fees: $8,000-$15,000\n• IVF & medical: $15,000-$35,000\n• Insurance: $15,000-$40,000\n• Escrow fees: $1,000-$2,000\n\nIndependent surrogacy saves $20,000-$35,000 in agency fees but requires more self-coordination.`;
    }
  }

  // SCREENING & REQUIREMENTS
  if (q.includes('requirement') || q.includes('qualify') || q.includes('eligible') || q.includes('screening') || q.includes('can i be') || q.includes('bmi') || q.includes('age limit')) {
    if (isGC) {
      return `Gestational carrier requirements:\n\n✓ Age: 21-45 (most clinics prefer 21-40)\n✓ BMI: Under 32-35 (varies by clinic)\n✓ Prior pregnancy: At least one uncomplicated pregnancy carried to term\n✓ Non-smoker: 12+ months smoke-free\n✓ Stable living situation\n✓ No major pregnancy complications in history\n✓ Not receiving government assistance\n✓ Reliable transportation to appointments\n\nMedical screening includes:\n• Blood tests (HIV, Hep B/C, STIs, CMV)\n• Uterine evaluation (HSG or saline sonogram)\n• Psychological evaluation (MMPI-2 + interview)\n\nScreening takes 4-8 weeks and costs $5,000-$10,000 (paid by IPs).`;
    } else {
      return `What you need to start surrogacy:\n\n1. Viable embryos (or plan to create them)\n2. Sufficient funds ($100K-$200K+)\n3. ART attorney in your state\n4. Psychological readiness for the journey\n\nNo specific age limit for IPs, but some clinics have policies. Single parents and LGBTQ+ couples welcome in surrogacy-friendly states.`;
    }
  }

  // CONTRACT QUESTIONS
  if (q.includes('contract') || q.includes('agreement') || q.includes('sign') || q.includes('legal document')) {
    return `The Gestational Surrogacy Agreement (GSA) is your most important protection.\n\nKey sections:\n• Compensation & payment schedule\n• Medical decisions & procedures\n• Selective reduction clause\n• Termination provisions\n• Insurance requirements\n• Contact & relationship expectations\n• What happens if: complications, divorce, death\n\nCRITICAL RULES:\n• Each party MUST have separate attorneys\n• ${isGC ? 'Your' : "GC's"} attorney fees: $1,000-$2,500 (paid by IPs)\n• ${isIP ? 'Your' : "IP's"} attorney fees: $6,000-$13,000\n• NEVER start medications before contract is signed\n• NEVER start without funded escrow\n\nFind attorneys at AAARTA.org`;
  }

  // ESCROW QUESTIONS  
  if (q.includes('escrow') || q.includes('seedtrust') || q.includes('fund') || q.includes('trust account')) {
    return `Escrow protects everyone's money.\n\nHow it works:\n• Neutral third party holds all funds\n• GC payments released on schedule\n• IPs have clear accounting\n• Protected if something goes wrong\n\nRecommended escrow company: SeedTrust (seedtrustescrow.com)\n• Industry standard\n• $700-$1,000 setup fee\n• Handles all disbursements\n\n⚠️ NON-NEGOTIABLE: Never start medications without confirmed, funded escrow. This protects ${isGC ? 'you from not being paid' : 'your carrier and your investment'}.`;
  }

  // MEDICATION QUESTIONS
  if (q.includes('medication') || q.includes('shot') || q.includes('injection') || q.includes('pio') || q.includes('lupron') || q.includes('progesterone') || q.includes('estrogen') || q.includes('needle')) {
    return `FET (Frozen Embryo Transfer) medication protocol:\n\n1. SUPPRESSION (1-2 weeks)\n   Lupron injections - shuts down your natural cycle\n\n2. ESTROGEN (2-3 weeks)\n   Estrace pills or patches - builds uterine lining\n   Goal: Lining 7-8mm+ (triple stripe pattern)\n\n3. PROGESTERONE (starts ~5 days before transfer)\n   PIO (Progesterone in Oil) - IM injection daily\n   Continues through week 10-12 if pregnant\n\nPIO Tips:\n• Warm the oil (under arm, heating pad, warm water)\n• Ice the injection area first\n• Inject slowly\n• Massage the area after\n• Rotate sides (left/right buttock)\n• Get help! These are hard to do alone\n\nSide effects: bloating, mood swings, fatigue, sore injection sites. All normal.`;
  }

  // TRANSFER QUESTIONS
  if (q.includes('transfer') || q.includes('embryo') || q.includes('implant') || q.includes('beta') || q.includes('procedure')) {
    return `Embryo Transfer Day:\n\nBEFORE:\n• Light breakfast (no heavy foods)\n• Drink 16-32oz water 1 hour before (full bladder needed)\n• Wear comfortable, loose clothing\n• Arrange someone to drive you home\n• Take it easy the night before\n\nTHE PROCEDURE (10-15 minutes):\n• Similar to a pap smear\n• Speculum inserted\n• Thin catheter guided through cervix\n• Embryo deposited (you'll see a flash on ultrasound)\n• Catheter removed\n• Rest for 10-15 minutes\n\nAFTER:\n• Rest the remainder of the day\n• No heavy lifting or strenuous activity\n• Normal activities can resume next day\n• Continue ALL medications as prescribed\n\nBeta HCG blood test: 9-12 days after transfer\nThis confirms if the embryo implanted.`;
  }

  // FAILED TRANSFER
  if (q.includes('fail') || q.includes('negative') || q.includes('didn\'t work') || q.includes('not pregnant') || q.includes('miscarriage') || q.includes('loss')) {
    if (isGC) {
      return `I'm sorry if you're going through this. Failed transfers are heartbreaking.\n\nIT'S NOT YOUR FAULT.\n\nMost transfer failures (60-70%) are due to embryo chromosomal abnormalities - nothing you did or didn't do. Even with perfect conditions, success rates are 40-60%.\n\nWhat happens now:\n• Take time to grieve - this is a real loss\n• Your IPs are grieving too\n• The clinic will review your cycle\n• Protocol may be adjusted for next attempt\n• Most contracts cover multiple transfers\n\nWhat to say to your IPs:\n"I'm so sorry this didn't work. I know we're both devastated. I'm committed to this journey and here for you when you're ready to discuss next steps."`;
    } else {
      return `I'm sorry. A failed transfer is a real loss.\n\nRemember:\n• Most failures are embryo chromosomal issues\n• Your carrier did everything right\n• 40-60% success rate means failures are common\n• This is not anyone's fault\n\nWhat to tell your carrier:\n"This isn't your fault. We know you did everything you could. Thank you for going through this with us."\n\nNext steps:\n• Allow yourself to grieve\n• The clinic will review and may adjust protocol\n• When ready, discuss timeline for next attempt\n• Consider additional embryo testing (PGT-A)`;
    }
  }

  // TIMELINE QUESTIONS
  if (q.includes('how long') || q.includes('timeline') || q.includes('duration') || q.includes('time') || q.includes('months') || q.includes('weeks')) {
    const stageInfo = {
      research: 'You\'re at the beginning - research typically takes 2-8 weeks.',
      match: 'Matching can take 1-6 months depending on your preferences.',
      medical: 'Medical screening takes 4-8 weeks.',
      legal: 'Contracts typically take 2-4 weeks to finalize.',
      transfer: 'The transfer cycle is 4-6 weeks from starting medications.',
      pregnant: 'Pregnancy is approximately 40 weeks.',
      post: 'Post-birth recovery and finalization takes 4-8 weeks.',
    };
    
    let response = `Typical surrogacy timeline:\n\n`;
    response += `1. Research & Decide: 2-8 weeks\n`;
    response += `2. Find a Match: 1-6 months\n`;
    response += `3. Medical Screening: 4-8 weeks\n`;
    response += `4. Legal & Contracts: 2-4 weeks\n`;
    response += `5. Transfer Cycle: 4-6 weeks\n`;
    response += `6. Pregnancy: ~40 weeks\n`;
    response += `7. Post-Birth: 4-8 weeks\n\n`;
    response += `Total: 18-24 months from start to baby\n\n`;
    if (stage && stageInfo[stage]) {
      response += `Your current stage: ${stageInfo[stage]}`;
    }
    return response;
  }

  // INSURANCE QUESTIONS
  if (q.includes('insurance') || q.includes('coverage') || q.includes('health plan')) {
    return `Surrogacy and insurance is complicated.\n\n${isGC ? 'YOUR' : "CARRIER'S"} HEALTH INSURANCE:\n• Many policies EXCLUDE surrogacy\n• Must be reviewed by a specialist BEFORE matching\n• Some employers self-insure and can deny claims\n• ACA plans generally cannot exclude, but check\n\nOPTIONS IF EXCLUDED:\n• Purchase surrogacy-specific policy ($15,000-$40,000)\n• Some agencies help arrange coverage\n• Lloyd's of London offers surrogacy policies\n\nWHAT'S NEEDED:\n• Maternity coverage for the carrier\n• Newborn coverage (usually under IPs' policy)\n• Complications coverage\n\nRecommended: ART Risk Financial & Insurance Solutions (artrisk.com)\n\n⚠️ Sort out insurance BEFORE starting the medical process.`;
  }

  // RELATIONSHIP QUESTIONS
  if (q.includes('relationship') || q.includes('communicate') || q.includes('conflict') || q.includes('boundaries') || q.includes('ips') || q.includes('carrier') || q.includes('intended parent')) {
    if (isGC) {
      return `Building a good relationship with your IPs:\n\nEARLY CONVERSATIONS:\n• Communication preferences (text, call, email?)\n• Update frequency expectations\n• Appointment attendance wishes\n• Boundaries around social media\n• Post-birth relationship hopes\n\nDURING PREGNANCY:\n• Regular updates (even just "feeling good today!")\n• Share milestones appropriately\n• Be honest about how you're feeling\n• Maintain your own boundaries\n\nIF CONFLICT ARISES:\n• Assume good intent first\n• Address issues early, directly\n• Use "I feel..." statements\n• Involve your coordinator if needed\n• Attorneys for contract issues only`;
    } else {
      return `Building a good relationship with your carrier:\n\nREMEMBER:\n• She's doing something incredible for you\n• This is her body, her daily life\n• She has her own family and priorities\n• Respect her autonomy\n\nCOMMUNICATION TIPS:\n• Ask about her preferences, don't assume\n• Regular check-ins without being overbearing\n• Express gratitude genuinely\n• Don't comment on her food/exercise choices\n\nIF ANXIOUS:\n• This is normal! But don't project onto her\n• Find other outlets (therapy, support groups)\n• Trust the process and your carrier\n\nIF CONFLICT ARISES:\n• Take a breath before responding\n• Is this a real issue or your anxiety?\n• Address directly but kindly\n• Involve coordinator if needed`;
    }
  }

  // MATCHING QUESTIONS
  if (q.includes('match') || q.includes('find') || q.includes('looking for') || q.includes('profile') || q.includes('agency')) {
    if (isGC) {
      return `Finding intended parents:\n\nOPTIONS:\n• Surrogacy agencies ($0 cost to GC, they take fee from IPs)\n• Independent matching (Facebook groups, surrogacy forums)\n• Known arrangement (friends/family)\n\nWHAT TO LOOK FOR:\n• Shared values and communication style\n• Realistic expectations\n• Financial stability (can they afford this?)\n• How they treat you in early conversations\n• Gut feeling - chemistry matters!\n\nRED FLAGS:\n• Pressure to skip legal steps\n• Won't use escrow\n• Dismissive of your concerns\n• Overly controlling behavior\n• Unrealistic demands\n\nYou're interviewing them too. The right match is worth waiting for.`;
    } else {
      return `Finding a gestational carrier:\n\nOPTIONS:\n• Agencies ($20,000-$35,000 fee, but they handle matching & coordination)\n• Independent (surrogacy forums, Facebook groups - saves money but more work)\n• Known carrier (friend/family member)\n\nWHAT TO LOOK FOR:\n• Meets medical requirements\n• Stable support system\n• Clear motivations (not just financial)\n• Communication compatibility\n• Someone you trust with this journey\n\nQUESTIONS TO ASK:\n• Why do you want to be a surrogate?\n• How does your family feel?\n• What's your support system?\n• What are your expectations for our relationship?\n• How do you handle medical decisions?`;
    }
  }

  // AFTER BIRTH
  if (q.includes('after birth') || q.includes('postpartum') || q.includes('delivery') || q.includes('hospital') || q.includes('birth plan')) {
    if (isGC) {
      return `After delivery:\n\nAT THE HOSPITAL:\n• IPs typically take baby to their room\n• You recover in your own room\n• Discuss visitors/contact ahead of time\n• Hospital social worker may visit (normal)\n\nPHYSICALLY:\n• Your body went through birth - hormones don't know the difference\n• Milk may come in (cabbage leaves, tight bra help)\n• Normal postpartum recovery applies\n• Don't skip your 6-week checkup\n\nEMOTIONALLY:\n• Sadness is normal and okay\n• Hormone crash affects everyone\n• You may grieve the journey ending\n• Therapy can help process feelings\n\nIf symptoms worsen after 2 weeks, or you can't function, get help.\nPostpartum Support International: 1-800-944-4773`;
    } else {
      return `When baby arrives:\n\nAT THE HOSPITAL:\n• You'll typically take baby to your own room\n• Hospital stay varies (1-3 days)\n• Pediatrician clears baby for discharge\n• You may need to provide formula/supplies\n\nLEGAL:\n• If pre-birth order: you're on birth certificate\n• If post-birth: process begins now\n• Keep attorney informed\n\nYOUR CARRIER:\n• She just gave birth - be gracious\n• Follow her lead on contact/visits\n• A heartfelt thank you means everything\n• Consider how to honor her going forward\n\nYOURSELVES:\n• Parenthood is hard - that's normal\n• Sleep deprivation is real\n• Ask for help\n• Bonding takes time for everyone`;
    }
  }

  // IVF QUESTIONS
  if (q.includes('ivf') || q.includes('egg') || q.includes('sperm') || q.includes('donor') || q.includes('embryo') || q.includes('retrieval') || q.includes('pgt')) {
    return `IVF for surrogacy:\n\nCREATING EMBRYOS:\n• Egg source: IP, egg donor, or frozen eggs\n• Sperm source: IP or sperm donor\n• Eggs retrieved, fertilized in lab\n• Embryos grow 5-6 days to blastocyst stage\n\nPGT-A TESTING (optional but recommended):\n• Tests embryos for chromosomal abnormalities\n• Improves transfer success rates\n• Costs $3,000-$6,000\n• Takes 1-2 weeks for results\n\nFROZEN VS FRESH:\n• Most surrogacy uses frozen embryos (FET)\n• Allows time for legal/matching process\n• Success rates comparable to fresh\n\nEMBRYO SHIPPING:\n• Embryos can be shipped between clinics\n• Costs $300-$500\n• Uses specialized cryogenic containers`;
  }

  // TWINS/MULTIPLES
  if (q.includes('twin') || q.includes('multiple') || q.includes('two embryo') || q.includes('triplet')) {
    return `Twins and surrogacy:\n\nEMBRYO TRANSFER:\n• Most clinics now recommend single embryo transfer (SET)\n• Two embryos slightly increases success but adds risk\n• Carrier must consent to number transferred\n• Discuss in contract BEFORE transfer\n\nIF PREGNANT WITH MULTIPLES:\n• Higher risk pregnancy (preterm labor, preeclampsia)\n• More appointments and monitoring\n• Carrier compensation typically increases ($5,000-$10,000)\n• May require bed rest\n• Earlier delivery common (35-37 weeks)\n\nSELECTIVE REDUCTION:\n• Difficult topic - discuss BEFORE matching\n• Must be addressed in contract\n• Both parties need to agree on approach`;
  }

  // FIRST TIME / GETTING STARTED
  if (q.includes('start') || q.includes('begin') || q.includes('first') || q.includes('new to') || q.includes('getting started') || q.includes('where do i')) {
    if (isGC) {
      return `Getting started as a gestational carrier:\n\n1. RESEARCH (you're here!)\n   • Understand the commitment (12-18 months)\n   • Know the requirements\n   • Talk to your family\n\n2. APPLY\n   • Choose agency OR go independent\n   • Complete application & medical history\n   • Background check\n\n3. SCREENING\n   • Medical evaluation at IVF clinic\n   • Psychological evaluation\n   • Home visit (sometimes)\n\n4. MATCHING\n   • Review IP profiles\n   • Video calls\n   • Choose your match\n\n5. LEGAL\n   • Get your own attorney\n   • Review and sign contract\n   • Escrow established\n\n6. MEDICAL\n   • Start medications\n   • Monitoring appointments\n   • Transfer!\n\nYou're already on step 1. Take your time with this decision.`;
    } else {
      return `Getting started as intended parents:\n\n1. EDUCATE YOURSELVES (you're here!)\n   • Understand costs ($100K-$200K+)\n   • Research your state's laws\n   • Decide: agency vs independent\n\n2. BUILD YOUR TEAM\n   • Find an ART attorney\n   • Choose IVF clinic\n   • Consider agency (optional)\n\n3. CREATE EMBRYOS\n   • IVF process\n   • Consider PGT-A testing\n   • Freeze embryos\n\n4. FIND YOUR CARRIER\n   • Agency matching OR independent search\n   • Video calls and meetings\n   • Confirm your match\n\n5. LEGAL & ESCROW\n   • Draft and sign contracts\n   • Fund escrow account\n   • Insurance sorted\n\n6. TRANSFER\n   • Carrier starts medications\n   • Embryo transfer\n   • Wait for beta!\n\nBased on your state (${state}), ${stateInfo ? stateInfo.notes : 'consult with a local ART attorney for specific guidance.'}`;
    }
  }

  // AGENCY VS INDEPENDENT
  if (q.includes('agency') || q.includes('independent') || q.includes('without agency') || q.includes('need an agency') || q.includes('use agency')) {
    return `Agency vs Independent Surrogacy:\n\nAGENCY ROUTE:\n• Cost: $20,000-$35,000 in agency fees\n• They handle matching, coordination, support\n• Less work for you, more hand-holding\n• Good for first-timers\n• Total journey cost: $150,000-$250,000+\n\nINDEPENDENT ROUTE:\n• No agency fees (save $20K-$35K)\n• Find match through forums, groups, connections\n• More self-coordination required\n• Still need: attorney, escrow, clinic\n• Total journey cost: $100,000-$180,000\n\nEITHER WAY YOU NEED:\n• Separate attorneys for each party\n• Escrow account\n• IVF clinic\n• Insurance solution\n\nIndependent works well if you're organized and comfortable with research. Agency is better if you want support and guidance throughout.`;
  }

  // QUESTIONS ABOUT SPECIFIC CONCERNS
  if (q.includes('worried') || q.includes('scared') || q.includes('nervous') || q.includes('afraid') || q.includes('anxiety') || q.includes('concern')) {
    if (isGC) {
      return `It's completely normal to feel nervous. This is a big decision.\n\nCOMMON CARRIER CONCERNS:\n\n"What if I get attached to the baby?"\nMost carriers report they don't feel parental attachment - they feel more like a loving aunt or babysitter. The baby was never "yours" genetically or intentionally.\n\n"What if something goes wrong?"\nYour health always comes first - this is in your contract. Complications are rare but covered by insurance and contract provisions.\n\n"What will people think?"\nSome people won't understand. Many more will be amazed by your generosity. You don't owe anyone an explanation.\n\n"What about my own family?"\nThis needs their support. Talk openly with your partner and kids. Most families find the journey brings them closer.\n\nTake your time with this decision. There's no rush.`;
    } else {
      return `Your feelings are valid. This journey has a lot of unknowns.\n\nCOMMON IP CONCERNS:\n\n"What if the carrier changes her mind?"\nLegally, gestational carriers have no parental rights to the baby (in most states). Contracts protect you. This is extremely rare.\n\n"What if the transfer doesn't work?"\nMost contracts cover multiple transfer attempts. Success rates are 40-60% per transfer. Be prepared for the possibility of trying again.\n\n"Can we afford this?"\nIt's expensive, but costs can be spread over 18-24 months. Some employers offer fertility benefits. Financing options exist.\n\n"Will we bond with the baby?"\nYes. Biology isn't required for love. Adoptive parents bond deeply, and so will you.\n\nThis is hard, but you're not alone.`;
    }
  }

  // TAXES
  if (q.includes('tax') || q.includes('irs') || q.includes('income') || q.includes('1099')) {
    if (isGC) {
      return `Surrogacy compensation and taxes:\n\nIS IT TAXABLE?\nYes, generally. The IRS considers surrogacy compensation taxable income.\n\nWHAT TO EXPECT:\n• You may receive a 1099 from the agency/escrow\n• Set aside 25-30% for taxes\n• Base compensation AND most fees are taxable\n\nWHAT MIGHT NOT BE TAXABLE:\n• Reimbursements for actual expenses (medical, travel)\n• Some attorneys argue pain/suffering isn't taxable\n• This is a gray area - consult a tax professional\n\nRECOMMENDATIONS:\n• Keep detailed records of all payments\n• Save receipts for all pregnancy-related expenses\n• Consult a tax professional familiar with surrogacy\n• Make quarterly estimated tax payments\n\nDon't let taxes surprise you at the end of the year!`;
    } else {
      return `Tax implications for intended parents:\n\nARE SURROGACY COSTS DEDUCTIBLE?\nGenerally, no. Surrogacy expenses are not considered medical expenses for tax purposes for intended parents.\n\nEXCEPTIONS:\n• If you use your own eggs/sperm, IVF costs MAY be deductible\n• Legal fees for adoption-related processes may have some deductibility\n• Consult a tax professional for your specific situation\n\nEMPLOYER BENEFITS:\n• Some employers offer fertility benefits that cover surrogacy\n• These are typically not taxable to you\n• Check your benefits package\n\nFSA/HSA:\n• Generally cannot be used for surrogacy\n• May cover your own IVF expenses\n\nConsult a tax professional familiar with surrogacy.`;
    }
  }

  // PSYCHOLOGICAL ASPECTS
  if (q.includes('psych') || q.includes('mental') || q.includes('counsel') || q.includes('therap') || q.includes('emotional') || q.includes('feel')) {
    return `Psychological aspects of surrogacy:\n\nFOR CARRIERS:\n• Psych evaluation required (MMPI-2 + clinical interview)\n• Processing giving birth and not parenting\n• Hormone effects on mood\n• Support from experienced surrogacy therapists recommended\n\nFOR IPs:\n• Processing grief from infertility journey\n• Anxiety during pregnancy you can't control\n• Bonding concerns (unfounded but real)\n• Couples counseling often helpful\n\nFINDING SUPPORT:\n• ASRM Mental Health Professional Group\n• Psychology Today (filter for "surrogacy")\n• Online surrogacy support groups\n• Your agency may provide counseling\n\nPOSTPARTUM (for carriers):\n• Hormone crash affects everyone who gives birth\n• Sadness is normal even without parenting\n• Postpartum Support International: 1-800-944-4773\n\nYour mental health matters throughout this journey.`;
  }

  // RISKS
  if (q.includes('risk') || q.includes('danger') || q.includes('complication') || q.includes('safe') || q.includes('what if') || q.includes('worst')) {
    return `Risks and safety in surrogacy:\n\nMEDICAL RISKS:\n• Same as any pregnancy: gestational diabetes, preeclampsia, etc.\n• Multiple pregnancy risks if 2+ embryos transferred\n• C-section possibility (~30-35%)\n• Carriers are screened to minimize risks\n\nLEGAL RISKS:\n• Minimized with proper contracts\n• State laws vary - work with experienced ART attorney\n• ${state ? `In ${state}: ${stateInfo ? stateInfo.notes : 'consult local attorney'}` : 'Know your state laws'}\n\nFINANCIAL RISKS:\n• For IPs: journey failure, multiple transfers needed\n• For GCs: medical complications, journey cancellation\n• Escrow and contracts protect both parties\n\nEMOTIONAL RISKS:\n• For all: grief if transfer fails\n• Relationship strain possible\n• Set expectations early\n\nRISK MITIGATION:\n• Work with experienced professionals\n• Have thorough contracts\n• Use escrow\n• Maintain open communication\n• Have support systems in place`;
  }

  // TRAVEL
  if (q.includes('travel') || q.includes('distance') || q.includes('different state') || q.includes('move') || q.includes('relocate') || q.includes('far away')) {
    return `Long-distance surrogacy:\n\nIS IT POSSIBLE?\nYes! Many surrogacy journeys involve different states.\n\nCONSIDERATIONS:\n• Legal: Which state's laws apply? Usually where the carrier lives and/or delivers.\n• Medical: Carrier travels to IP's clinic for transfer, then uses local OB.\n• Birth: Plan where delivery will happen.\n• Monitoring: Local clinic can do ultrasounds with results sent to main clinic.\n\nTRAVEL COSTS (typically paid by IPs):\n• Flights and hotels for transfer (~$500-$1,500)\n• IPs' travel for birth (~$1,000-$3,000)\n• Additional monitoring appointments\n\nYOUR SITUATION:\n${user.state && user.otherState && user.otherState !== 'unknown' ? 
`You're in ${state} and your ${isGC ? 'IPs are' : 'carrier is'} in ${otherState}.\n• ${state} laws: ${stateInfo ? stateInfo.notes : 'Consult local attorney'}\n• ${otherState} laws: ${otherStateInfo ? otherStateInfo.notes : 'Consult local attorney'}\n• Work with attorneys licensed in BOTH states.` :
'Once you\'re matched, consider both states\' laws carefully.'}\n\nMany successful journeys span multiple states!`;
  }

  // LGBT / SAME-SEX
  if (q.includes('gay') || q.includes('lesbian') || q.includes('lgbt') || q.includes('same-sex') || q.includes('same sex') || q.includes('two mom') || q.includes('two dad')) {
    return `LGBTQ+ surrogacy:\n\nIS IT POSSIBLE?\nAbsolutely! Surrogacy is a wonderful path to parenthood for LGBTQ+ individuals and couples.\n\nFRIENDLY STATES:\n• California, Nevada, Washington, Illinois, New York, Connecticut, Oregon\n• These states recognize all intended parents regardless of sexual orientation\n• Pre-birth orders available\n\nSTATES TO BE CAUTIOUS ABOUT:\n• Some states require genetic connection or marriage\n• A few have restrictions for same-sex couples\n• Louisiana is particularly restrictive\n\nFOR GAY MEN:\n• You'll need an egg donor + gestational carrier\n• One or both partners can provide sperm\n• Total cost often higher due to egg donation\n\nFOR LESBIAN COUPLES:\n• One partner can provide eggs, other carries (reciprocal IVF)\n• Or use gestational carrier with one partner's eggs\n• Or use donor eggs + carrier\n\nMany agencies specialize in LGBTQ+ journeys. You have options!`;
  }

  // SINGLE PARENT
  if (q.includes('single') || q.includes('alone') || q.includes('by myself') || q.includes('one parent') || q.includes('unmarried')) {
    return `Single parent surrogacy:\n\nIS IT POSSIBLE?\nYes! Many single individuals become parents through surrogacy.\n\nLEGAL CONSIDERATIONS:\n• Most surrogacy-friendly states allow single IPs\n• Some states have married-couple preferences (like Texas)\n• Work with an attorney familiar with single-parent surrogacy\n\nPRACTICAL CONSIDERATIONS:\n• Same process as couples\n• You'll need donor eggs or sperm (depending on your situation)\n• Consider your support network for after baby arrives\n• Slightly more scrutiny sometimes, but very doable\n\nCOSTS:\n• Same as couples, plus donor costs if needed\n• Egg donation: $25,000-$40,000\n• Sperm donation: $500-$1,500\n\nCAREFUL ABOUT:\n• Some agencies/carriers prefer couples (their choice)\n• Be upfront about being single\n• Many carriers are happy to help singles become parents\n\nYou don't need a partner to become a parent!`;
  }

  // GENERAL HELP / FALLBACK - Make it smarter
  const topics = [];
  if (!q.includes('state') && !q.includes('law')) topics.push(`• Laws in ${state} and surrogacy-friendly states`);
  if (!q.includes('cost') && !q.includes('pay') && !q.includes('money')) topics.push('• Compensation and total costs');
  if (!q.includes('require') && !q.includes('screen') && !q.includes('qualify')) topics.push('• Requirements and screening process');
  if (!q.includes('contract') && !q.includes('legal')) topics.push('• Contracts and legal protection');
  if (!q.includes('escrow')) topics.push('• Escrow and payment protection');
  if (!q.includes('transfer') && !q.includes('medic')) topics.push('• Medications and transfer process');
  if (!q.includes('time') && !q.includes('long')) topics.push('• Timeline and what to expect');
  if (!q.includes('relationship') && !q.includes('communicate')) topics.push('• Building your GC/IP relationship');
  
  return `I'm here to help with your surrogacy journey!\n\nAs ${isGC ? 'a gestational carrier' : 'an intended parent'} in ${state}${otherState && otherState !== 'unknown' ? ` (with ${isGC ? 'IPs' : 'a carrier'} in ${otherState})` : ''}, I can answer questions about:\n\n${topics.slice(0, 6).join('\n')}\n\nTry asking something like:\n• "What are the laws in my state?"\n• "${isGC ? 'How much can I earn?' : 'How much does surrogacy cost?'}"\n• "What happens on transfer day?"\n• "What should I know about contracts?"\n\nI'm trained on surrogacy topics and will give you personalized information based on your situation!`;
};

// ═══════════════════════════════════════════════════════════════
// DAILY FOCUS - What to work on today
// ═══════════════════════════════════════════════════════════════
const DAILY_FOCUS = {
  gc: {
    research: [{ t: "Learn about compensation", d: "Understand what you could earn", r: 'compensation' }, { t: "Review requirements", d: "See if you qualify", r: 'screening' }],
    match: [{ t: "Prepare for video calls", d: "Questions to ask IPs" }, { t: "Trust your gut", d: "Chemistry matters" }],
    medical: [{ t: "Prepare for screening", d: "What to expect", r: 'screening' }, { t: "Line up injection help", d: "PIO shots need a helper" }],
    legal: [{ t: "Review your contract", d: "Understand every clause", r: 'contract' }, { t: "Verify escrow funded", d: "Non-negotiable", r: 'escrow' }],
    transfer: [{ t: "Transfer day prep", d: "Full bladder, comfy clothes", r: 'transfer' }],
    pregnant: [{ t: "Update your IPs", d: "They're anxious too" }, { t: "Start parentage order", d: "Don't wait", r: 'parentage' }],
    post: [{ t: "Schedule checkup", d: "6-week postpartum care" }],
  },
  ip: {
    research: [{ t: "Understand total costs", d: "Budget realistically", r: 'budget' }, { t: "Find an attorney", d: "Essential first step", r: 'attorneys' }],
    match: [{ t: "Create your profile", d: "Be authentic" }, { t: "Prepare for calls", d: "Questions to ask" }],
    medical: [{ t: "Support your carrier", d: "She's going through a lot" }, { t: "Create embryos", d: "Work with your clinic" }],
    legal: [{ t: "Fund escrow TODAY", d: "Don't delay", r: 'escrow' }, { t: "Review contract", d: "Discuss tough scenarios", r: 'contract' }],
    transfer: [{ t: "Support your carrier", d: "Be present" }, { t: "Practice patience", d: "Two-week wait is hard" }],
    pregnant: [{ t: "Establish rhythm", d: "Communication plan" }, { t: "Parentage order", d: "File at weeks 16-20", r: 'parentage' }],
    post: [{ t: "Honor your carrier", d: "She changed your life" }],
  },
};

// Daily welcome messages with action steps
const DAILY_GUIDE = {
  gc: {
    research: { greeting: "Let's learn about surrogacy", message: "Before you commit, make sure you understand what you're signing up for. Today, let's explore compensation and requirements.", action: "Learn about compensation", actionDesc: "See what carriers typically earn", resource: 'compensation' },
    match: { greeting: "Finding your perfect match", message: "This is exciting! You're looking for intended parents who share your values. Today, prepare thoughtful questions for your video calls.", action: "Review relationship tips", actionDesc: "Build a strong foundation", resource: 'relationship' },
    medical: { greeting: "Time for medical screening", message: "The clinic needs to make sure your body is ready. Today, focus on scheduling your appointments and arranging help for injections.", action: "Understand screening", actionDesc: "Know what to expect", resource: 'screening' },
    legal: { greeting: "Protecting yourself legally", message: "Your contract protects both you and the intended parents. Today, make sure escrow is funded before starting any medications.", action: "Learn about contracts", actionDesc: "Understand what you're signing", resource: 'contract' },
    transfer: { greeting: "Transfer is approaching!", message: "This is a big milestone. Today, focus on your medication protocol and preparing for transfer day.", action: "Transfer day prep", actionDesc: "Know what to expect", resource: 'transfer' },
    pregnant: { greeting: "Congratulations, you're pregnant!", message: "Now it's about taking care of yourself and keeping the IPs informed. Today, think about your communication rhythm.", action: "Start parentage order", actionDesc: "Don't wait on this", resource: 'parentage' },
    post: { greeting: "You did something amazing", message: "Take time to recover and process. Your body and emotions need attention right now.", action: "Postpartum care", actionDesc: "Don't skip your checkup", resource: 'therapists' },
  },
  ip: {
    research: { greeting: "Starting your surrogacy journey", message: "There's a lot to learn, but we'll take it step by step. Today, let's make sure you understand the full cost picture.", action: "Review budget guide", actionDesc: "Plan realistically", resource: 'budget' },
    match: { greeting: "Finding your carrier", message: "This person will carry your baby - it's an intimate relationship. Today, focus on being authentic in your profile.", action: "Relationship building", actionDesc: "Set expectations early", resource: 'relationship' },
    medical: { greeting: "IVF and screening phase", message: "Your carrier is going through medical screening while you work on embryos. Today, focus on supporting her through this process.", action: "Understand screening", actionDesc: "Know what she's experiencing", resource: 'screening' },
    legal: { greeting: "Contracts protect everyone", message: "A strong contract prevents misunderstandings later. Today, make absolutely sure escrow is funded.", action: "Fund escrow now", actionDesc: "This is non-negotiable", resource: 'escrow' },
    transfer: { greeting: "Transfer time!", message: "Your embryo is about to be transferred. Today, focus on being supportive and patient.", action: "Support your carrier", actionDesc: "This is stressful for her too", resource: 'transfer' },
    pregnant: { greeting: "Your baby is on the way!", message: "Now begins the long wait. Today, establish a communication rhythm that works for everyone.", action: "Plan communication", actionDesc: "Stay connected respectfully", resource: 'relationship' },
    post: { greeting: "Welcome to parenthood!", message: "Your baby is here! Don't forget to honor the woman who made this possible.", action: "Honor your carrier", actionDesc: "She changed your life", resource: 'relationship' },
  },
};

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const HARD_MOMENTS = {
  gc: [
    { id: 'transfer-fail', title: "When a transfer doesn't work", content: `This is one of the hardest moments.\n\nIT'S NOT YOUR FAULT\nMost failures are embryo chromosomal issues—not your body. Even "perfect" transfers have only 40-60% success.\n\nWHAT HAPPENS NEXT\n• Take time to process\n• IPs are grieving too—give each other grace\n• Most contracts cover multiple attempts\n\nWHAT TO SAY\n"I'm so sorry this didn't work. I'm committed to this journey and here for next steps when you're ready."` },
    { id: 'ip-conflict', title: "Navigating conflict with IPs", content: `Disagreements happen.\n\nCOMMON ISSUES\n• Communication frequency\n• Appointment expectations\n• Lifestyle opinions\n\nHOW TO ADDRESS IT\n"I've noticed ___ and want to talk before it becomes bigger."\n"I feel ___ when ___. Can we find a solution?"\n\nWHEN TO INVOLVE ATTORNEY\nPattern of disrespect, contract violations, feeling unsafe` },
    { id: 'complications', title: "Handling complications", content: `YOUR HEALTH COMES FIRST\nThis is in your contract.\n\nWHAT TO DO\n1. Follow ALL medical advice\n2. Communicate with IPs promptly\n3. Document everything\n\nYou're not failing anyone.` },
    { id: 'postpartum', title: "Struggling after delivery", content: `Your body went through birth.\n\nWHAT YOU MIGHT FEEL\n• Sadness (even if happy for IPs)\n• Hormonal mood swings\n• Grief the journey is over\n\nGET HELP IF\n• Symptoms worsen after 2 weeks\n• Unable to care for yourself\n\nPostpartum Support: 1-800-944-4773` },
  ],
  ip: [
    { id: 'transfer-fail', title: "When a transfer doesn't work", content: `This loss is real.\n\nWHY IT HAPPENED\nMost failures are embryo issues. Your carrier did everything right.\n\nYOUR CARRIER IS HURTING TOO\nA simple "this isn't your fault" means everything.` },
    { id: 'gc-conflict', title: "Conflict with your carrier", content: `CHECK YOURSELF\n• Are you projecting anxiety?\n• Is this about control?\n\nWHAT YOU CAN'T CONTROL\nHer daily choices, her body, her relationships` },
    { id: 'waiting', title: "The waiting is unbearable", content: `STRATEGIES\n• Start a project with deadline\n• Designate "worry time" (15 min/day)\n• Exercise burns anxiety\n\nMANTRA\n"I have done everything I can."` },
    { id: 'money-stress', title: "Financial stress", content: `WHAT HELPS\n• Break costs into chunks\n• Review contract coverage\n\nIMPORTANT\nAlways pay your carrier on time.` },
  ]
};

const REMINDERS = {
  research: { title: "Review health insurance", desc: "Many policies exclude surrogacy." },
  match: { title: "Trust your instincts", desc: "If something feels off, keep looking." },
  medical: { title: "Arrange injection help", desc: "PIO shots are hard alone.", urgent: true },
  legal: { title: "Verify escrow is funded", desc: "Never start meds without funding.", urgent: true },
  transfer: { title: "Transfer prep", desc: "Full bladder, comfortable clothes, a ride." },
  pregnant: { title: "Start parentage order", desc: "Begin at week 16-20.", urgent: true },
  post: { title: "Don't skip postpartum care", desc: "Your checkup matters." },
};

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
• History of pregnancy complications (preeclampsia, preterm birth)
• Certain medications
• Unstable mental health
• BMI outside acceptable range
• Recent tattoos or piercings (blood-borne illness risk)
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
• May cause: fatigue, soreness at injection site, mood swings

PIO INJECTION TIPS
• Warm the oil before injecting (heating pad, under arm, warm water)
• Ice the injection area for a few minutes first
• Inject slowly (1-2 minutes for the full dose)
• Massage the area afterward
• Rotate injection sites (left buttock, right buttock)
• Walk around after to help disperse the oil
• Consider a heating pad on the area afterward
• Get help! These injections are difficult to do yourself

ADDITIONAL MEDICATIONS MAY INCLUDE
• Baby aspirin (blood flow)
• Prenatal vitamins
• Medrol (steroid for immune support)
• Doxycycline (antibiotic around transfer)
• Valium (relaxation on transfer day)

MONITORING SCHEDULE
• Blood work every few days during estrogen phase
• Ultrasounds to check lining thickness
• More frequent monitoring as transfer approaches

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

RELATIONSHIP & COMMUNICATION
• Expected contact during pregnancy
• Appointment attendance
• Delivery room wishes
• Post-birth contact expectations

CRITICAL RULES

1. SEPARATE ATTORNEYS
Each party MUST have their own independent attorney. The same attorney cannot represent both sides. This protects everyone.

Attorney costs:
• Carrier's attorney: $1,000-$2,500 (paid by IPs)
• IPs' attorney: $6,000-$13,000

2. NEVER START WITHOUT A SIGNED CONTRACT
Do not begin any medications until the contract is fully executed (signed by all parties).

3. ESCROW MUST BE FUNDED
Before signing, confirm escrow account is established and funded with at least the first several months of compensation plus expense reserves.

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

Take your time reviewing the contract. Ask questions about anything you don't understand. This document protects you.` 
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

TYPICAL FUNDING SCHEDULE
• Initial deposit: First 2-3 months of compensation + reserves
• Subsequent deposits: As funds are needed
• Most escrow companies require minimum balance maintained

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

PAYMENT SCHEDULE (TYPICAL)
• Confirmation of match: First monthly payment begins
• Start of medications: Transfer fee
• Confirmed pregnancy: Ongoing monthly payments
• Milestones: Heartbeat, end of first trimester, etc.
• Delivery: Final compensation payment
• Post-birth: Recovery payment

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
• Will you personally handle my case or delegate?

COSTS

Carrier's Attorney: $1,000-$2,500
• Paid by intended parents
• Reviews and negotiates contract
• Typically flat fee

IPs' Attorney: $6,000-$13,000
• Drafts contract from scratch
• More complex work involved
• May include parentage order work
• Often broken into phases

MULTI-STATE CONSIDERATIONS
If carrier and IPs are in different states:
• May need attorneys in both states
• Laws of carrier's state usually primary
• Birth state matters for parentage
• More complex = higher legal fees

THE PROCESS

1. Engagement
• Sign retainer agreement
• Pay initial deposit
• Provide information for contract drafting

2. Contract Drafting (IPs' attorney)
• 35-50 page document
• Covers all scenarios
• Takes 1-2 weeks

3. Contract Review (Carrier's attorney)
• Receives draft from IPs' attorney
• Reviews with carrier
• Proposes any changes

4. Negotiation
• Back and forth between attorneys
• Usually 1-3 rounds of revisions
• Goal: Agreement both parties accept

5. Execution
• All parties sign
• Escrow confirmed
• Medical process can begin

TIMELINE
• Contract process: 2-4 weeks typically
• Don't rush - this protects everyone
• Delays usually from scheduling, not disagreements

RED FLAGS
• Attorney pressuring you to sign quickly
• Unwillingness to explain provisions
• Suggesting you don't need independent counsel
• Very low fees (may indicate inexperience)` 
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
Surrogacy-friendly states where pre-birth orders are available:
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

Each state is different. Some vary by county within the state!

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

WHAT'S NEEDED FOR PARENTAGE ORDER
• Signed surrogacy contract
• Proof of pregnancy
• Genetic testing results (sometimes)
• Affidavits from carrier and IPs
• Marriage certificate (if applicable)
• Background checks (some states)

IMPORTANT TIMING
Don't wait until the third trimester!
• File at weeks 16-20
• Allows time for any complications
• Court schedules can be slow
• Baby could arrive early

WHAT IF CARRIER AND IPS ARE IN DIFFERENT STATES?
• Laws of birth state typically apply
• May need legal work in multiple states
• Some IPs travel to carrier's state for birth
• Discuss with attorney early in process

SAME-SEX PARENTS
• Most surrogacy-friendly states recognize both parents
• Some states require adoption by non-genetic parent
• Both parents can be on birth certificate in many states
• Know your state's specific rules

SINGLE PARENTS
• Can absolutely get parentage orders
• Process similar to couples
• Some states have specific provisions

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
• Not something you control

Multiples: $5,000 - $10,000
• Additional for carrying twins
• Higher for triplets (rare)

Bed Rest: $200 - $300 per week
• If ordered by doctor
• Can add up significantly

Invasive Procedures: $500 - $1,500
• Amniocentesis
• CVS testing
• D&C if needed

Loss of Reproductive Organs: $2,500 - $5,000
• Hysterectomy required due to pregnancy
• Covered by contract

MONTHLY ALLOWANCE
$200 - $400 per month
• Covers pregnancy-related expenses
• Maternity clothes
• Vitamins and supplements
• Gas for appointments
• Misc pregnancy needs

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
• Confirmed pregnancy: Regular monthly payments begin
• Monthly milestones: Payments continue
• Delivery: Final base compensation payment
• Post-birth: Recovery payment

TAXES - VERY IMPORTANT!
• Surrogacy compensation IS taxable income
• You may receive a 1099
• Set aside 25-30% for taxes
• Make quarterly estimated payments
• Consult a tax professional

WHAT'S NOT TAXABLE (POSSIBLY)
• Actual expense reimbursements (keep receipts!)
• Some argue "pain and suffering" isn't taxable
• This is a gray area - get professional advice

SAMPLE TOTAL JOURNEY COMPENSATION
Base: $50,000
Monthly allowance (12 months): $3,600
Transfer fees (2 transfers): $2,500
Maternity clothes: $750
Travel reimbursement: $1,500
Misc expenses: $1,000

Total: ~$59,350

Minus taxes (~28%): ~$16,600
Net: ~$42,750

(These are estimates - your journey will vary)

NEGOTIATING COMPENSATION
• Research going rates in your area
• Experienced carriers can negotiate higher
• Don't undersell yourself
• But also be realistic about market rates

FINANCIAL PLANNING
• Don't count on this money until you receive it
• Build an emergency fund
• Consider journey could take 18-24 months
• Plan for taxes throughout` 
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
• Monitoring appointments: $2,000 - $4,000

If using donor eggs, add: $25,000 - $40,000
If using donor sperm, add: $500 - $1,500

INSURANCE: $15,000 - $40,000
• Surrogacy-friendly policy for carrier
• OR cash reserves for medical bills
• Newborn insurance (usually under your policy)

ESCROW & ADMINISTRATIVE: $1,500 - $3,000
• Escrow setup and management
• Background checks
• Psychological evaluations

TRAVEL & MISC: $2,000 - $10,000
• Flights for transfer
• Hotel for birth
• Carrier's travel expenses
• Unexpected costs

PAYMENT TIMING
Costs spread over 18-24 months:

UPFRONT:
• Agency retainer: $5,000 - $10,000
• Legal retainer: $3,000 - $5,000
• Initial escrow funding: $20,000 - $40,000

DURING MATCHING & SCREENING:
• Agency fees completion
• Medical screening costs
• Escrow additions

DURING PREGNANCY:
• Monthly carrier payments
• Insurance premiums
• Medical appointments

AT BIRTH:
• Final carrier payment
• Hospital costs
• Travel

WAYS TO MANAGE COSTS

Independent Surrogacy
• Skip agency fees ($20,000-$35,000 savings)
• More work but significant savings
• Still need attorney, escrow, clinic

Financing Options
• Some clinics offer payment plans
• Medical loans available
• Home equity options
• Family assistance

Employer Benefits
• Some companies cover fertility treatments
• A few cover surrogacy
• Check your benefits carefully

Grants
• Some fertility grants available
• Typically limited amounts
• Worth researching

BUDGET TIPS
• Build a spreadsheet tracking all costs
• Add 10-15% buffer for unexpected expenses
• Don't forget taxes (not deductible for you)
• Plan for possibility of multiple transfers
• Costs can exceed estimates - be prepared

This is a significant investment in your family. Plan carefully and work with professionals who can help you navigate.` 
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
• How do I handle conflict or disagreement?

For IPs - Consider:
• How involved do we want to be?
• Can we respect carrier's autonomy?
• What are our communication expectations?
• How will we manage our anxiety?

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
• Regular updates, even brief ones ("Feeling good today!")
• Share milestones but maintain your boundaries
• Be honest about how you're feeling
• Communicate needs clearly
• You're not obligated to be available 24/7

For IPs:
• Express gratitude genuinely
• Respect her autonomy - it's her body
• Don't comment on food, exercise, or lifestyle choices
• Find ways to manage your anxiety that don't burden her
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
4. Focus on the specific issue, not the person
5. Involve coordinator/agency if stuck
6. Attorneys only for contract violations

COMMON CHALLENGES

Different Expectations
• One party wants more contact than the other
• Solution: Find middle ground, compromise

Medical Decisions
• Disagreement about testing, procedures
• Solution: Refer to contract, respect carrier's autonomy

Life Events
• Carrier's family issues, IP job loss, etc.
• Solution: Communication, flexibility, grace

AT DELIVERY
• Discuss preferences well in advance
• Who's in the delivery room?
• Who cuts the cord?
• Skin-to-skin time?
• Hospital room arrangements
• Be flexible - birth doesn't follow plans

AFTER BIRTH

Immediate Post-Birth:
• Give carrier space to recover
• Follow her lead on contact
• Express profound gratitude

Ongoing Relationship:
• Honor whatever was agreed upon
• Send photos and updates as discussed
• Remember birthdays and milestones
• She'll always be part of your story

FOR CARRIERS:
• It's okay to feel sad when journey ends
• The relationship may shift - that's normal
• You did something extraordinary

FOR IPS:
• Never forget what she did for you
• Find meaningful ways to honor her
• She gave you your family

This relationship requires effort from both sides. When it works well, it can be one of the most meaningful connections you'll ever have.` 
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
• Bonding concerns (normal but worth addressing)

FINDING A SURROGACY-INFORMED THERAPIST

ASRM Mental Health Professional Group
• Searchable directory
• Specialists in reproductive psychology
• Understand surrogacy specifically

Psychology Today
• Filter by specialty
• Look for "infertility" or "reproductive"
• Read profiles carefully

Your Agency
• Many provide counseling services
• May have referral lists
• Sometimes included in fees

Questions to Ask Potential Therapists:
• Have you worked with surrogates/IPs before?
• What's your approach to reproductive mental health?
• Do you offer telehealth appointments?
• What's your fee? Do you take insurance?

TYPES OF SUPPORT

Individual Therapy
• One-on-one with a therapist
• Address personal challenges
• Process complex emotions

Couples Counseling (for IPs)
• Navigate the journey together
• Communication strategies
• Prepare for parenthood

Support Groups
• Online and in-person options
• Connect with others on similar journeys
• Normalize experiences
• Facebook groups can be helpful (but verify quality)

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
1-800-944-4773
www.postpartum.net
• 24/7 helpline
• Specialists in postpartum issues

Crisis Text Line
Text HOME to 741741
• Available 24/7
• Trained crisis counselors

National Suicide Prevention Lifeline
988 (call or text)
• Available 24/7
• Don't hesitate to use this

SELF-CARE PRACTICES
• Maintain routines and boundaries
• Stay connected with support people
• Journal your experiences
• Move your body (as able)
• Rest when you can
• Limit social media if it causes stress
• Celebrate milestones

You deserve support throughout this journey. Asking for help is a sign of strength, not weakness.` 
  },
  
  insurance: { 
    title: 'Insurance Guide', 
    cat: 'Financial', 
    content: `SURROGACY INSURANCE EXPLAINED

Insurance in surrogacy is complicated. Here's what you need to know.

THE CHALLENGE
Many health insurance policies explicitly exclude surrogacy coverage. Even if pregnancy is covered, a claim can be denied if they learn it's a surrogacy pregnancy.

CARRIER'S INSURANCE OPTIONS

Option 1: Carrier's Existing Insurance
• Must be reviewed by a specialist
• Policy language matters enormously
• "Participating in a surrogacy" exclusion = denied claims
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
• Some have waiting periods - plan ahead

Where to Get Surrogacy Insurance:
• ART Risk Solutions
• New Life Agency
• Lloyd's of London underwriters

Option 3: Cash Pay with Reserves
• No insurance - pay medical bills directly
• Requires $50,000+ in reserve
• Risky if complications occur
• Usually last resort option

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
• Are there any waiting periods?

NEWBORN INSURANCE

The Baby's Coverage:
• Usually covered under IPs' insurance
• Add baby within 30 days of birth
• Baby is IPs' dependent, not carrier's
• Verify your policy covers newborns

If IPs Don't Have Coverage:
• Must purchase policy for baby
• Can be expensive
• ACA marketplace options
• Medicaid if eligible

WORST CASE SCENARIOS

Carrier's Insurance Denies Claims:
• IPs responsible for medical bills (per contract)
• This is why escrow reserves are important
• Can be $30,000-$100,000+ without insurance

Baby Needs NICU:
• Can exceed $100,000 quickly
• NICU coverage MUST be verified
• Both carrier's and IPs' insurance may be involved
• Preemie care is extremely expensive

TIMING CONSIDERATIONS
• Verify insurance BEFORE matching
• Purchase surrogacy policy early if needed
• Some policies have waiting periods
• Don't start medical process without coverage sorted

WHAT'S IN YOUR CONTRACT
Your surrogacy contract should address:
• Who provides carrier's insurance
• Who pays deductibles and copays
• What if carrier loses coverage mid-journey
• Escrow reserves for medical expenses
• Responsibility for denied claims

TIPS
• Never assume coverage - verify everything
• Get it in writing from insurance company
• Work with surrogacy insurance specialists
• Build insurance costs into your budget
• Have backup plans for worst-case scenarios

Insurance mistakes can be financially devastating. Take this seriously and work with experts.` 
  },
  
  ivf: { 
    title: 'IVF & Embryos', 
    cat: 'Medical', 
    content: `IVF AND EMBRYO CREATION FOR SURROGACY

Understanding the process of creating embryos for your surrogacy journey.

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
• You receive the resulting embryos
• Cost: $25,000 - $40,000 additional

Frozen Donor Eggs:
• Eggs already retrieved and frozen
• Faster process
• Lower cost than fresh donor cycle
• Slightly lower success rates

SPERM SOURCES

Intended Father:
• Sperm sample collected at clinic
• Fresh or frozen can be used
• Genetic testing available

Donor Sperm:
• From sperm bank
• Extensive screening of donors
• Cost: $500 - $1,500 per vial
• Multiple vials recommended

FERTILIZATION

Conventional IVF:
• Sperm and eggs mixed together
• Sperm naturally penetrates egg
• Lower cost option

ICSI (Intracytoplasmic Sperm Injection):
• Single sperm injected directly into egg
• Used for low sperm count or quality
• Higher success rate
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
• Down syndrome, Turner syndrome, etc.

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
• Reduces failed transfers (costly and emotional)
• Especially important for older egg sources
• Discuss with your reproductive endocrinologist

EMBRYO FREEZING (VITRIFICATION)

How It Works:
• Flash-freezing process
• Embryos stored in liquid nitrogen
• Can remain frozen indefinitely
• Very high survival rate when thawed

Cost:
• Initial freezing: $1,000 - $2,000
• Annual storage: $500 - $1,000 per year

EMBRYO SHIPPING

If your clinic is different from carrier's:
• Embryos can be safely shipped
• Special cryogenic containers used
• Cost: $300 - $500
• Coordinate with both clinics

HOW MANY EMBRYOS DO YOU NEED?

Rule of Thumb:
• Plan for 2-3 embryos per baby desired
• Success rate ~50-60% per PGT-normal embryo
• Some transfers fail
• Having backups reduces stress

If You Have Extra:
• Keep frozen for siblings
• Donate to other families
• Donate to research
• Allow them to thaw (discard)
• This should be discussed with your partner early

EMOTIONAL CONSIDERATIONS
• Not all embryos will be viable
• This can be emotionally difficult
• Decisions about unused embryos are personal
• Counseling can help navigate these choices

The IVF process can feel overwhelming, but your reproductive endocrinologist will guide you through each step.` 
  },
};

// Calculate read time based on word count (average 200 words per minute)
const calculateReadTime = (content) => {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
};

// Add read times to resources
Object.keys(RESOURCES).forEach(key => {
  RESOURCES[key].time = calculateReadTime(RESOURCES[key].content);
});

const STAGES = {
  gc: [
    { id: 'research', name: 'Researching', duration: '2-4 weeks', weeks: 3, tasks: ['Research options','Understand compensation','Learn requirements','Discuss with family'], resources: ['compensation','screening'] },
    { id: 'match', name: 'Finding Match', duration: '1-3 months', weeks: 8, tasks: ['Create profile','Video calls','Discuss expectations','Confirm match'], resources: ['relationship'] },
    { id: 'medical', name: 'Screening', duration: '4-8 weeks', weeks: 6, tasks: ['Clinic appointment','Complete testing','Psych eval','Get clearance'], resources: ['screening','medications'] },
    { id: 'legal', name: 'Contracts', duration: '2-4 weeks', weeks: 3, tasks: ['Get attorney','Review contract','Verify escrow','Sign'], resources: ['contract','escrow','attorneys'] },
    { id: 'transfer', name: 'Transfer', duration: '4-6 weeks', weeks: 5, tasks: ['Start meds','Monitoring','Transfer','Beta test'], resources: ['medications','transfer'] },
    { id: 'pregnant', name: 'Pregnant', duration: '~40 weeks', weeks: 40, tasks: ['Ultrasound','OB care','Updates to IPs','Parentage order'], resources: ['parentage','relationship'] },
    { id: 'post', name: 'Post-Birth', duration: '4-8 weeks', weeks: 6, tasks: ['Recovery','Final payment','Checkup'], resources: ['therapists'] },
  ],
  ip: [
    { id: 'research', name: 'Researching', duration: '2-8 weeks', weeks: 5, tasks: ['Understand costs','Consult attorney','Choose clinic','Review laws'], resources: ['budget','attorneys','parentage'] },
    { id: 'match', name: 'Finding Match', duration: '1-6 months', weeks: 12, tasks: ['Create profile','Review carriers','Video calls','Confirm'], resources: ['relationship','screening'] },
    { id: 'medical', name: 'IVF', duration: '2-4 months', weeks: 12, tasks: ['Consultation','Create embryos','Testing','Support screening'], resources: ['screening','budget'] },
    { id: 'legal', name: 'Contracts', duration: '2-4 weeks', weeks: 3, tasks: ['Get attorney','Draft contract','Fund escrow','Insurance'], resources: ['contract','escrow','attorneys'] },
    { id: 'transfer', name: 'Transfer', duration: '4-6 weeks', weeks: 5, tasks: ['Coordinate','Support carrier','Wait for beta'], resources: ['transfer','medications'] },
    { id: 'pregnant', name: 'Expecting', duration: '~40 weeks', weeks: 40, tasks: ['Communication plan','Parentage order','Prepare nursery'], resources: ['parentage','relationship'] },
    { id: 'post', name: 'Baby Home', duration: '4-8 weeks', weeks: 6, tasks: ['Welcome baby','Birth certificate','Honor carrier'], resources: ['relationship'] },
  ]
};

const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','DC'];

const STATE_LAWS = {
  'California': { status: 'Favorable', color: C.success },
  'New York': { status: 'Favorable', color: C.success },
  'Illinois': { status: 'Favorable', color: C.success },
  'Michigan': { status: 'Favorable', color: C.success },
  'Nevada': { status: 'Favorable', color: C.success },
  'Ohio': { status: 'Moderate', color: C.warning },
  'Texas': { status: 'Moderate', color: C.warning },
  'Florida': { status: 'Moderate', color: C.warning },
  'Louisiana': { status: 'Restrictive', color: C.accent },
};

const MOODS = [
  { label: 'Great', color: C.success },
  { label: 'Good', color: '#8ec99a' },
  { label: 'Okay', color: C.warning },
  { label: 'Hard', color: '#d49a8a' },
  { label: 'Struggling', color: C.accent },
];

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({ type: '', state: '', otherState: '', stage: '', name: '', startDate: null, tasks: {}, moods: [], journal: [] });
  const [tab, setTab] = useState('home');
  const [modal, setModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [calc, setCalc] = useState({ base: 50000, transfers: 1, csection: false, twins: false, bedrest: 0 });
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showDailyGuide, setShowDailyGuide] = useState(true);

  const stages = STAGES[user.type] || [];
  const si = stages.findIndex(s => s.id === user.stage);
  const cur = stages[si];
  const pct = stages.length > 1 ? (si / (stages.length - 1)) * 100 : 0;
  const days = user.startDate ? Math.floor((Date.now() - user.startDate) / 86400000) : 0;
  const reminder = REMINDERS[cur?.id];
  const hardMoments = HARD_MOMENTS[user.type] || [];
  const dailyFocus = DAILY_FOCUS[user.type]?.[cur?.id] || [];
  const dailyGuide = DAILY_GUIDE[user.type]?.[cur?.id];

  useEffect(() => {
    if (cur && !user.tasks[cur.id]) {
      setUser(u => ({ ...u, tasks: { ...u.tasks, [cur.id]: cur.tasks.map((t, i) => ({ id: i, text: t, done: false })) } }));
    }
  }, [cur]);

  const tasks = user.tasks[cur?.id] || [];
  const done = tasks.filter(t => t.done).length;
  const toggle = id => setUser(u => ({ ...u, tasks: { ...u.tasks, [cur.id]: u.tasks[cur.id].map(t => t.id === id ? { ...t, done: !t.done } : t) } }));
  const logMood = m => { setUser(u => ({ ...u, moods: [...u.moods, { date: Date.now(), mood: m }] })); setModal(null); };
  const saveJ = () => { if (journalText.trim()) { setUser(u => ({ ...u, journal: [...u.journal, { date: Date.now(), text: journalText }] })); setJournalText(''); setModal(null); } };
  const calcTotal = () => calc.base + calc.transfers * 1250 + (calc.csection ? 3500 : 0) + (calc.twins ? 7500 : 0) + calc.bedrest * 400;
  const askAi = () => { if (aiQuery.trim()) { setAiResponse(buildAIResponse(aiQuery, user)); } };

  const timeline = () => {
    if (!user.startDate) return [];
    let w = 0;
    return stages.map((s, i) => {
      const start = new Date(user.startDate + w * 604800000);
      w += s.weeks;
      return { ...s, start, end: new Date(user.startDate + w * 604800000), status: i < si ? 'done' : i === si ? 'current' : 'future' };
    });
  };

  const base = { minHeight: '100vh', background: BG, fontFamily: "'SF Pro Display',-apple-system,sans-serif", color: C.text, position: 'relative', overflow: 'hidden' };
  const page = { ...base, padding: 20, paddingBottom: screen === 'app' ? 110 : 20 };
  const container = { maxWidth: 420, margin: '0 auto', position: 'relative', zIndex: 1 };

  const closeModal = () => { setModal(null); setModalData(null); };

  // ═══ MODAL WRAPPER ═══
  const Modal = ({ title, children }) => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,252,250,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', zIndex: 100, overflowY: 'auto', padding: 20 }}>
      <div style={container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>{title}</h2>
          <Glass onClick={closeModal} intensity="subtle" style={{ padding: 8, borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.close()}</Glass>
        </div>
        {children}
      </div>
    </div>
  );

  // ═══ MODALS ═══
  if (modal === 'resource' && modalData) return (
    <Modal title={modalData.title}>
      <GlassPill color={C.accent}>{modalData.cat}</GlassPill>
      <p style={{ color: C.textMuted, margin: '10px 0 24px', fontSize: 14 }}>{modalData.time} read</p>
      <Glass intensity="strong"><pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{modalData.content}</pre></Glass>
    </Modal>
  );

  if (modal === 'hardMoment' && modalData) return (
    <Modal title={modalData.title}>
      <Glass intensity="strong"><pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{modalData.content}</pre></Glass>
    </Modal>
  );

  if (modal === 'mood') return (
    <Modal title="How are you today?">
      <p style={{ color: C.textMuted, marginBottom: 24 }}>Tracking helps you see patterns.</p>
      {MOODS.map(m => (
        <Glass key={m.label} onClick={() => logMood(m.label)} intensity="normal" style={{ marginBottom: 12, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: m.color, boxShadow: `0 2px 8px ${m.color}50` }} />
            <span style={{ fontSize: 16, fontWeight: 500 }}>{m.label}</span>
          </div>
        </Glass>
      ))}
    </Modal>
  );

  if (modal === 'journal') return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,252,250,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', zIndex: 100, overflowY: 'auto', padding: 20 }}>
      <div style={container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Journal</h2>
          <Glass onClick={closeModal} intensity="subtle" style={{ padding: 8, borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.close()}</Glass>
        </div>
        <div style={{ 
          background: 'rgba(255,255,255,0.75)', 
          backdropFilter: 'blur(32px)', 
          WebkitBackdropFilter: 'blur(32px)', 
          borderRadius: 20, 
          border: '1px solid rgba(255,255,255,0.7)', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.9)',
          marginBottom: 20,
          padding: 16,
        }}>
          <textarea 
            value={journalText} 
            onChange={e => setJournalText(e.target.value)} 
            placeholder="What's on your mind?" 
            autoFocus
            style={{ 
              width: '100%', 
              minHeight: 120, 
              background: 'transparent', 
              border: 'none', 
              color: C.text, 
              fontSize: 16, 
              fontFamily: 'inherit', 
              resize: 'vertical', 
              outline: 'none', 
              boxSizing: 'border-box', 
              lineHeight: 1.6 
            }} 
          />
        </div>
        <GlassButton onClick={saveJ} disabled={!journalText.trim()} fullWidth size="large">Save Entry</GlassButton>
        {user.journal.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Previous</div>
            {user.journal.slice().reverse().slice(0, 4).map((j, i) => (
              <Glass key={i} intensity="subtle" style={{ marginBottom: 10, padding: 14 }}>
                <div style={{ fontSize: 11, color: C.textLight, marginBottom: 6 }}>{new Date(j.date).toLocaleDateString()}</div>
                <p style={{ margin: 0, fontSize: 14 }}>{j.text}</p>
              </Glass>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (modal === 'calculator') return (
    <Modal title={user.type === 'gc' ? 'Compensation Estimate' : 'Budget Estimate'}>
      <Glass intensity="strong" style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: C.textMuted, display: 'block', marginBottom: 10 }}>Base Compensation</label>
        <input type="range" min="35000" max="100000" step="5000" value={calc.base} onChange={e => setCalc(c => ({ ...c, base: +e.target.value }))} style={{ width: '100%', marginBottom: 8 }} />
        <div style={{ fontSize: 24, fontWeight: 600 }}>${calc.base.toLocaleString()}</div>
      </Glass>
      <Glass intensity="strong" style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: C.textMuted, display: 'block', marginBottom: 10 }}>Transfers</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => setCalc(c => ({ ...c, transfers: n }))} style={{ flex: 1, padding: 12, borderRadius: 10, border: `2px solid ${calc.transfers === n ? C.accent : 'rgba(0,0,0,0.08)'}`, background: calc.transfers === n ? C.accentLight : 'rgba(255,255,255,0.7)', color: C.text, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{n}</button>
          ))}
        </div>
      </Glass>
      <Glass intensity="strong" style={{ marginBottom: 14 }}>
        {[['C-Section', 'csection', 3500], ['Twins', 'twins', 7500]].map(([l, k, a]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 15 }}>{l} (+${a.toLocaleString()})</span>
            <button onClick={() => setCalc(c => ({ ...c, [k]: !c[k] }))} style={{ width: 50, height: 28, borderRadius: 14, border: 'none', background: calc[k] ? C.success : 'rgba(0,0,0,0.1)', cursor: 'pointer', position: 'relative' }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', position: 'absolute', top: 3, left: calc[k] ? 25 : 3, transition: 'left 0.2s' }} />
            </button>
          </div>
        ))}
        <label style={{ fontSize: 13, color: C.textMuted, display: 'block', marginBottom: 8 }}>Bed Rest Weeks</label>
        <input type="range" min="0" max="12" value={calc.bedrest} onChange={e => setCalc(c => ({ ...c, bedrest: +e.target.value }))} style={{ width: '100%' }} />
        <div style={{ fontSize: 14, marginTop: 6 }}>{calc.bedrest} weeks</div>
      </Glass>
      <Glass variant="accent" glow style={{ textAlign: 'center', padding: 28 }}>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 6 }}>Estimated Total</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: C.accent }}>${calcTotal().toLocaleString()}</div>
      </Glass>
    </Modal>
  );

  if (modal === 'timeline') return (
    <Modal title="Your Timeline">
      <p style={{ color: C.textMuted, marginBottom: 24 }}>Estimated dates</p>
      {timeline().map((s, i) => (
        <div key={s.id} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Glass variant={s.status === 'done' ? 'success' : s.status === 'current' ? 'accent' : 'default'} intensity={s.status === 'future' ? 'subtle' : 'strong'} glow={s.status === 'current'} style={{ width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
              {s.status === 'done' ? Icons.check(C.success) : <span style={{ fontSize: 14, fontWeight: 600, color: s.status === 'current' ? C.accent : C.textMuted }}>{i + 1}</span>}
            </Glass>
            {i < stages.length - 1 && <div style={{ width: 2, flex: 1, background: 'rgba(0,0,0,0.08)', marginTop: 6 }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</span>
              {s.status === 'current' && <GlassPill color={C.accent}>Now</GlassPill>}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>{s.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {s.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
      ))}
    </Modal>
  );

  if (modal === 'hardMoments') return (
    <Modal title="When Things Get Hard">
      <p style={{ color: C.textMuted, marginBottom: 20 }}>Guidance for difficult moments</p>
      {hardMoments.map((h, i) => (
        <Glass key={i} onClick={() => { setModal('hardMoment'); setModalData(h); }} intensity="normal" style={{ marginBottom: 12, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 500 }}>{h.title}</span>
            {Icons.chevron()}
          </div>
        </Glass>
      ))}
    </Modal>
  );

  if (modal === 'ai') {
    // Personalized questions based on user context
    const gcQuestions = [
      `What are the surrogacy laws in ${user.state}?`,
      'How much can I earn as a carrier?',
      'What are the medical requirements?',
      'What should I know about contracts?',
      'How do I prepare for transfer day?',
      'What if the transfer fails?',
    ];
    const ipQuestions = [
      `What are the surrogacy laws in ${user.state}?`,
      'How much does surrogacy cost total?',
      'How do I find a carrier?',
      'What is escrow and why is it important?',
      'How long does the whole process take?',
      'What are pre-birth parentage orders?',
    ];
    const questions = user.type === 'gc' ? gcQuestions : ipQuestions;
    
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,252,250,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', zIndex: 100, overflowY: 'auto', padding: 20 }}>
        <div style={container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Ask Me Anything</h2>
            <Glass onClick={closeModal} intensity="subtle" style={{ padding: 8, borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.close()}</Glass>
          </div>
          <Glass intensity="strong" style={{ marginBottom: 20, padding: 16, background: 'rgba(128,112,160,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              {Icons.ai()}
              <span style={{ fontWeight: 600, color: '#8070a0' }}>Your Surrogacy Assistant</span>
            </div>
            <p style={{ fontSize: 14, color: C.textMuted, margin: 0 }}>
              I know you're {user.type === 'gc' ? 'a gestational carrier' : 'an intended parent'} in {user.state}
              {user.otherState && user.otherState !== 'unknown' ? ` with ${user.type === 'gc' ? 'IPs' : 'a carrier'} in ${user.otherState}` : ''}.
              Ask me anything about your journey!
            </p>
          </Glass>
          <div style={{ 
            background: 'rgba(255,255,255,0.75)', 
            backdropFilter: 'blur(32px)', 
            WebkitBackdropFilter: 'blur(32px)', 
            borderRadius: 20, 
            border: '1px solid rgba(255,255,255,0.7)', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.9)',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px 4px 0',
          }}>
            <input 
              type="text" 
              value={aiQuery} 
              onChange={e => setAiQuery(e.target.value)} 
              onKeyDown={e => { if (e.key === 'Enter') askAi(); }} 
              placeholder="Type your question..." 
              autoFocus
              style={{ 
                flex: 1, 
                padding: 16, 
                border: 'none', 
                background: 'transparent', 
                fontSize: 16, 
                outline: 'none',
                fontFamily: 'inherit',
                color: C.text,
                minWidth: 0,
              }} 
            />
            <button onClick={askAi} style={{ padding: '12px 16px', background: C.accent, border: 'none', borderRadius: 12, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.send()}</button>
          </div>
          {aiResponse && (
            <Glass intensity="normal" variant="accent" style={{ padding: 18, marginBottom: 20 }}>
              <pre style={{ fontSize: 15, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{aiResponse}</pre>
            </Glass>
          )}
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Suggested Questions</div>
          {questions.slice(0, 5).map((q, i) => (
            <Glass key={i} onClick={() => { setAiQuery(q); setAiResponse(buildAIResponse(q, user)); }} intensity="subtle" style={{ marginBottom: 8, padding: 12, cursor: 'pointer' }}>
              <span style={{ fontSize: 14 }}>{q}</span>
            </Glass>
          ))}
        </div>
      </div>
    );
  }

  if (modal === 'editProfile') return (
    <Modal title="Edit Profile">
      <Glass intensity="strong" style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: C.textMuted, display: 'block', marginBottom: 8 }}>Your State</label>
        <select value={user.state} onChange={e => setUser(u => ({ ...u, state: e.target.value }))} style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Glass>
      <Glass intensity="strong" style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: C.textMuted, display: 'block', marginBottom: 8 }}>{user.type === 'gc' ? "IPs'" : "Carrier's"} State</label>
        <select value={user.otherState} onChange={e => setUser(u => ({ ...u, otherState: e.target.value }))} style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
          <option value="unknown">Not matched yet</option>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Glass>
      <Glass intensity="strong" style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, color: C.textMuted, display: 'block', marginBottom: 8 }}>Current Stage</label>
        <select value={user.stage} onChange={e => setUser(u => ({ ...u, stage: e.target.value }))} style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
          {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </Glass>
      <GlassButton onClick={closeModal} fullWidth size="large">Done</GlassButton>
    </Modal>
  );

  // ═══ WELCOME ═══
  if (screen === 'welcome') return (
    <div style={base}>
      <Orb size={280} top="-80px" left="-60px" color="rgba(255,180,150,0.5)" blur={80} />
      <Orb size={220} top="30%" left="75%" color="rgba(200,170,255,0.4)" blur={70} />
      <Orb size={180} top="70%" left="-10%" color="rgba(150,200,255,0.4)" blur={60} />
      <Orb size={150} top="80%" left="85%" color="rgba(255,200,230,0.5)" blur={50} />
      <div style={{ ...container, padding: 24, paddingTop: 50 }}>
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: '44px 28px', marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>{Icons.logo()}</div>
          <h1 style={{ fontSize: 36, fontWeight: 300, margin: '0 0 8px' }}>
            Gestational<span style={{ fontWeight: 700, background: `linear-gradient(135deg, ${C.accent}, #9070a0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.ly</span>
          </h1>
          <p style={{ color: C.textMuted, fontSize: 16, margin: 0 }}>Your surrogacy companion</p>
        </Glass>
        <Glass intensity="normal" style={{ marginBottom: 24, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            {Icons.sparkle()}
            <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>What you'll get</span>
          </div>
          {[
            { icon: Icons.timeline, t: 'Stage-by-stage guidance', d: 'Know exactly where you are' },
            { icon: Icons.support, t: 'Support for hard moments', d: 'Real guidance when needed' },
            { icon: Icons.calculator, t: 'Budget & compensation tools', d: 'Plan with confidence' },
            { icon: Icons.journal, t: 'Journal & mood tracking', d: 'Process your journey' },
          ].map((f, i) => (
            <Glass key={i} intensity="subtle" style={{ marginBottom: i < 3 ? 10 : 0, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {f.icon()}
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{f.t}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{f.d}</div>
                </div>
              </div>
            </Glass>
          ))}
        </Glass>
        <GlassButton onClick={() => setScreen('onboard')} fullWidth size="large">Begin Your Journey</GlassButton>
        <Glass intensity="subtle" style={{ textAlign: 'center', padding: 12, marginTop: 16 }}>
          <p style={{ fontSize: 12, color: C.textLight, margin: 0 }}>For educational purposes only</p>
        </Glass>
      </div>
    </div>
  );

  // ═══ ONBOARDING ═══
  if (screen === 'onboard') {
    const views = [
      // Role
      <div key="r">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>I am...</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>Select your role</p>
        </Glass>
        {[['gc', 'A Gestational Carrier', 'Carrying for intended parents'], ['ip', 'An Intended Parent', 'Building my family']].map(([t, n, d]) => (
          <Glass key={t} onClick={() => { setUser(u => ({ ...u, type: t })); setStep(1); }} intensity="normal" style={{ marginBottom: 12, padding: 20 }}>
            <div style={{ fontWeight: 600, fontSize: 17 }}>{n}</div>
            <div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{d}</div>
          </Glass>
        ))}
      </div>,
      // Your state
      <div key="s1">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Your Location</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>State laws vary significantly</p>
        </Glass>
        <Glass intensity="strong" style={{ marginBottom: 24 }}>
          <select value={user.state} onChange={e => setUser(u => ({ ...u, state: e.target.value }))} style={{ width: '100%', padding: 16, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
            <option value="">Select your state</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Glass>
        <div style={{ display: 'flex', gap: 12 }}>
          <GlassButton variant="secondary" onClick={() => setStep(0)} style={{ flex: 1 }}>Back</GlassButton>
          <GlassButton onClick={() => setStep(2)} disabled={!user.state} style={{ flex: 2 }}>Continue</GlassButton>
        </div>
      </div>,
      // Other party state
      <div key="s2">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>{user.type === 'gc' ? "Intended Parents'" : "Carrier's"} Location</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>Both states matter for legal planning</p>
        </Glass>
        <Glass intensity="strong" style={{ marginBottom: 14 }}>
          <select value={user.otherState} onChange={e => setUser(u => ({ ...u, otherState: e.target.value }))} style={{ width: '100%', padding: 16, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
            <option value="">Select state</option>
            <option value="unknown">Not matched yet</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Glass>
        <Glass intensity="subtle" style={{ marginBottom: 24, padding: 12 }}>
          <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>You can update this later</p>
        </Glass>
        <div style={{ display: 'flex', gap: 12 }}>
          <GlassButton variant="secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</GlassButton>
          <GlassButton onClick={() => setStep(3)} disabled={!user.otherState} style={{ flex: 2 }}>Continue</GlassButton>
        </div>
      </div>,
      // Stage
      <div key="st">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Current Stage</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>Where are you now?</p>
        </Glass>
        <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 24 }}>
          {stages.map(s => (
            <Glass key={s.id} onClick={() => setUser(u => ({ ...u, stage: s.id }))} variant={user.stage === s.id ? 'accent' : 'default'} glow={user.stage === s.id} intensity="normal" style={{ marginBottom: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{s.duration}</div>
                </div>
                {user.stage === s.id && <div style={{ width: 24, height: 24, borderRadius: 12, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.check()}</div>}
              </div>
            </Glass>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <GlassButton variant="secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Back</GlassButton>
          <GlassButton onClick={() => setStep(4)} disabled={!user.stage} style={{ flex: 2 }}>Continue</GlassButton>
        </div>
      </div>,
      // Name
      <div key="n">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Your Name</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>What should we call you?</p>
        </Glass>
        <Glass intensity="strong" style={{ marginBottom: 24 }}>
          <input type="text" value={user.name} onChange={e => setUser(u => ({ ...u, name: e.target.value }))} placeholder="First name" style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 17, outline: 'none', boxSizing: 'border-box' }} />
        </Glass>
        <div style={{ display: 'flex', gap: 12 }}>
          <GlassButton variant="secondary" onClick={() => setStep(3)} style={{ flex: 1 }}>Back</GlassButton>
          <GlassButton onClick={() => { setUser(u => ({ ...u, startDate: Date.now() })); setStep(5); }} disabled={!user.name.trim()} style={{ flex: 2 }}>Continue</GlassButton>
        </div>
      </div>,
      // Done
      <div key="d" style={{ textAlign: 'center', paddingTop: 50 }}>
        <Glass intensity="strong" glow variant="success" style={{ width: 80, height: 80, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', borderRadius: 24 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="3" strokeLinecap="round"><path d="M4 12l6 6L20 6"/></svg>
        </Glass>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 10 }}>Welcome, {user.name}</h2>
        <p style={{ color: C.textMuted, marginBottom: 40, fontSize: 16 }}>Your companion is ready</p>
        <GlassButton onClick={() => { setScreen('app'); setTab('home'); }} fullWidth size="large">Go to Dashboard</GlassButton>
      </div>,
    ];
    return (
      <div style={base}>
        <Orb size={220} top="-40px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} />
        <Orb size={180} top="50%" left="80%" color="rgba(200,170,255,0.35)" blur={60} />
        <div style={{ ...container, padding: 24, paddingTop: 40 }}>{views[step]}</div>
      </div>
    );
  }

  // ═══ NAVIGATION - Fixed clean design ═══
  const Nav = () => (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px 20px 24px', background: 'linear-gradient(transparent, rgba(255,252,250,0.95) 30%)', zIndex: 50 }}>
      <Glass intensity="strong" style={{ maxWidth: 360, margin: '0 auto', padding: 6, borderRadius: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[['home', Icons.home, 'Home'], ['learn', Icons.learn, 'Learn'], ['support', Icons.heart, 'Support'], ['profile', Icons.profile, 'Profile']].map(([t, Icon, label]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '10px 16px', borderRadius: 16, border: 'none',
              background: tab === t ? C.accentLight : 'transparent',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {Icon(tab === t)}
              <span style={{ fontSize: 11, fontWeight: 600, color: tab === t ? C.accent : C.textMuted }}>{label}</span>
            </button>
          ))}
        </div>
      </Glass>
    </div>
  );

  // ═══ LEARN ═══
  if (tab === 'learn') {
    const cats = [
      { k: 'Medical', icon: Icons.medical, items: ['screening', 'medications', 'transfer', 'ivf'] },
      { k: 'Legal', icon: Icons.legal, items: ['contract', 'escrow', 'attorneys', 'parentage'] },
      { k: 'Financial', icon: Icons.financial, items: ['compensation', 'budget', 'insurance'] },
      { k: 'Wellness', icon: Icons.wellness, items: ['relationship', 'therapists'] },
    ];
    return (
      <div style={page}>
        <Orb size={180} top="-40px" left="-20px" color="rgba(255,180,150,0.3)" blur={60} />
        <div style={container}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Learn</h1>
          <p style={{ color: C.textMuted, marginBottom: 24, fontSize: 15 }}>Comprehensive guides for your journey</p>
          
          {/* AI Search Bar */}
          <Glass onClick={() => setModal('ai')} intensity="normal" style={{ marginBottom: 28, padding: 14, background: 'rgba(128,112,160,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {Icons.ai()}
              <span style={{ color: C.textMuted, fontSize: 15 }}>Ask me anything about surrogacy...</span>
            </div>
          </Glass>

          {cats.map(c => (
            <div key={c.k} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                {c.icon()}
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c.k}</span>
              </div>
              {c.items.map(k => RESOURCES[k] && (
                <Glass key={k} onClick={() => { setModal('resource'); setModalData(RESOURCES[k]); }} intensity="normal" style={{ marginBottom: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{RESOURCES[k].title}</div>
                      <div style={{ fontSize: 13, color: C.textMuted }}>{RESOURCES[k].time} read</div>
                    </div>
                    {Icons.chevron()}
                  </div>
                </Glass>
              ))}
            </div>
          ))}
        </div><Nav />
      </div>
    );
  }

  // ═══ SUPPORT ═══
  if (tab === 'support') return (
    <div style={page}>
      <Orb size={160} top="10%" left="80%" color="rgba(200,170,255,0.3)" blur={50} />
      <div style={container}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>Support</h1>
        <p style={{ color: C.textMuted, marginBottom: 28, fontSize: 15 }}>Tools when you need them</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: Icons.journal, l: 'Journal', d: `${user.journal.length} entries`, a: () => setModal('journal') },
            { icon: Icons.calculator, l: 'Calculator', d: 'Costs', a: () => setModal('calculator') },
            { icon: Icons.timeline, l: 'Timeline', d: 'Dates', a: () => setModal('timeline') },
            { icon: Icons.support, l: 'Hard Moments', d: 'Guidance', a: () => setModal('hardMoments') },
          ].map((x, i) => (
            <Glass key={i} onClick={x.a} intensity="normal" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ marginBottom: 10 }}>{x.icon()}</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{x.l}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{x.d}</div>
            </Glass>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>24/7 Support</div>
        <Glass intensity="strong" style={{ padding: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600 }}>Postpartum Support</div>
            <div style={{ color: C.textMuted }}>1-800-944-4773</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Crisis Text Line</div>
            <div style={{ color: C.textMuted }}>Text HOME to 741741</div>
          </div>
        </Glass>
      </div><Nav />
    </div>
  );

  // ═══ PROFILE ═══
  if (tab === 'profile') {
    const law1 = STATE_LAWS[user.state] || { status: 'Check attorney', color: C.textMuted };
    const law2 = user.otherState && user.otherState !== 'unknown' ? (STATE_LAWS[user.otherState] || { status: 'Check attorney', color: C.textMuted }) : null;
    return (
      <div style={page}>
        <Orb size={140} top="5%" left="85%" color="rgba(255,200,230,0.3)" blur={40} />
        <div style={container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Glass intensity="strong" variant="accent" style={{ width: 64, height: 64, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: C.accent }}>{user.name[0]}</span>
              </Glass>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{user.name}</h1>
                <p style={{ color: C.textMuted, margin: 0, fontSize: 14 }}>{user.type === 'gc' ? 'Gestational Carrier' : 'Intended Parent'}</p>
              </div>
            </div>
            <GlassButton variant="secondary" size="small" onClick={() => setModal('editProfile')}>Edit</GlassButton>
          </div>
          <Glass intensity="strong" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              <div><div style={{ fontSize: 28, fontWeight: 700 }}>{days}</div><div style={{ fontSize: 13, color: C.textMuted }}>Days</div></div>
              <div style={{ width: 1, background: 'rgba(0,0,0,0.06)' }} />
              <div><div style={{ fontSize: 28, fontWeight: 700 }}>{si + 1}/{stages.length}</div><div style={{ fontSize: 13, color: C.textMuted }}>Stage</div></div>
              <div style={{ width: 1, background: 'rgba(0,0,0,0.06)' }} />
              <div><div style={{ fontSize: 28, fontWeight: 700 }}>{user.journal.length}</div><div style={{ fontSize: 13, color: C.textMuted }}>Entries</div></div>
            </div>
          </Glass>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>State Laws</div>
          <Glass intensity="strong" style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6 }}>Your State</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16 }}>{user.state}</span>
              <GlassPill color={law1.color}>{law1.status}</GlassPill>
            </div>
          </Glass>
          <Glass intensity="strong" style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6 }}>{user.type === 'gc' ? "IPs'" : "Carrier's"} State</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16 }}>{user.otherState === 'unknown' ? 'Not matched yet' : user.otherState}</span>
              {law2 && <GlassPill color={law2.color}>{law2.status}</GlassPill>}
            </div>
          </Glass>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Providers</div>
          {[{ n: 'SeedTrust', d: 'Escrow', u: 'seedtrustescrow.com' }, { n: 'ART Risk', d: 'Insurance', u: 'artrisk.com' }, { n: 'AAARTA', d: 'Attorneys', u: 'aaarta.org' }].map((p, i) => (
            <Glass key={i} intensity="normal" style={{ marginBottom: 10, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>{p.n}</span>
                <span style={{ fontSize: 13, color: C.textMuted }}>{p.u}</span>
              </div>
              <div style={{ fontSize: 13, color: C.textMuted }}>{p.d}</div>
            </Glass>
          ))}
          <GlassButton variant="secondary" onClick={() => { setScreen('welcome'); setStep(0); setUser({ type: '', state: '', otherState: '', stage: '', name: '', startDate: null, tasks: {}, moods: [], journal: [] }); setTab('home'); }} fullWidth style={{ marginTop: 20 }}>Sign Out</GlassButton>
        </div><Nav />
      </div>
    );
  }

  // ═══ HOME ═══
  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  const lastMood = user.moods[user.moods.length - 1];
  const hasMood = lastMood && (Date.now() - lastMood.date) < 43200000;

  // Daily Guide Popup
  const DailyGuidePopup = () => {
    if (!showDailyGuide || !dailyGuide) return null;
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Glass intensity="strong" glow style={{ maxWidth: 380, width: '100%', padding: 0, borderRadius: 28 }}>
          {/* Header with gradient */}
          <div style={{ background: `linear-gradient(135deg, ${C.accent}, #9070a0)`, padding: '32px 24px 24px', borderRadius: '28px 28px 0 0', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Day {days} • {cur?.name}</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', margin: 0 }}>{greet}, {user.name}!</h2>
          </div>
          
          {/* Content */}
          <div style={{ padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: C.text }}>{dailyGuide.greeting}</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: C.textSecondary, marginBottom: 24 }}>{dailyGuide.message}</p>
            
            {/* Today's Action */}
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 10 }}>Your First Step Today</div>
            <Glass 
              onClick={() => { 
                setShowDailyGuide(false); 
                if (dailyGuide.resource) {
                  setModal('resource'); 
                  setModalData(RESOURCES[dailyGuide.resource]); 
                }
              }} 
              variant="accent" 
              intensity="normal" 
              style={{ padding: 16, marginBottom: 20, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: C.accent }}>{dailyGuide.action}</div>
                  <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{dailyGuide.actionDesc}</div>
                </div>
                {Icons.chevron()}
              </div>
            </Glass>
            
            <GlassButton onClick={() => setShowDailyGuide(false)} fullWidth variant="secondary">
              I'll explore on my own
            </GlassButton>
          </div>
        </Glass>
      </div>
    );
  };

  return (
    <div style={page}>
      <DailyGuidePopup />
      <Orb size={200} top="-60px" left="-30px" color="rgba(255,180,150,0.35)" blur={70} />
      <Orb size={140} top="45%" left="90%" color="rgba(200,170,255,0.25)" blur={50} />
      <div style={container}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <p style={{ color: C.textMuted, margin: 0, fontSize: 15 }}>{greet}</p>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: '4px 0 0' }}>{user.name}</h1>
          </div>
          <Glass onClick={() => setModal('mood')} variant={hasMood ? 'success' : 'default'} intensity="normal" glow={hasMood} style={{ width: 48, height: 48, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: hasMood ? C.success : C.textLight }} />
          </Glass>
        </div>

        {/* AI Search Bar */}
        <Glass onClick={() => setModal('ai')} intensity="normal" style={{ marginBottom: 20, padding: 14, background: 'rgba(128,112,160,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {Icons.ai()}
            <span style={{ color: C.textMuted, fontSize: 15 }}>Ask me anything about surrogacy...</span>
          </div>
        </Glass>

        {/* Today's Focus */}
        {dailyFocus.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {Icons.target()}
              <span style={{ fontSize: 14, fontWeight: 700 }}>Today's Focus</span>
              <GlassPill color={C.accent}>{cur?.name}</GlassPill>
            </div>
            {dailyFocus.slice(0, 2).map((f, i) => (
              <Glass key={i} onClick={() => f.r && (setModal('resource'), setModalData(RESOURCES[f.r]))} intensity={i === 0 ? 'strong' : 'normal'} variant={i === 0 ? 'accent' : 'default'} glow={i === 0} style={{ marginBottom: 10, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{f.t}</div>
                    <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{f.d}</div>
                  </div>
                  {f.r && Icons.chevron()}
                </div>
              </Glass>
            ))}
          </div>
        )}

        {/* Reminder */}
        {reminder && (
          <Glass variant={reminder.urgent ? 'warning' : 'default'} intensity="normal" style={{ marginBottom: 20, padding: 16 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              {Icons.alert()}
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{reminder.title}</div>
                <div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{reminder.desc}</div>
              </div>
            </div>
          </Glass>
        )}

        {/* Progress */}
        <Glass intensity="strong" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative' }}>
              <GlassProgress value={pct} size={80} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{Math.round(pct)}%</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Day {days} • {cur?.name}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{cur?.duration}</div>
            </div>
          </div>
          <Glass onClick={() => setModal('timeline')} intensity="subtle" style={{ marginTop: 14, padding: 10, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: C.textSecondary }}>View full timeline</span>
              {Icons.chevron()}
            </div>
          </Glass>
        </Glass>

        {/* Tasks */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' }}>Stage Tasks</span>
          <GlassPill color={done === tasks.length ? C.success : C.textMuted}>{done}/{tasks.length}</GlassPill>
        </div>
        <Glass intensity="strong" style={{ marginBottom: 20, padding: 16 }}>
          {tasks.map((t, i) => (
            <div key={t.id} style={{ marginBottom: i < tasks.length - 1 ? 14 : 0 }}>
              <div onClick={() => toggle(t.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 2, background: t.done ? C.success : 'rgba(255,255,255,0.8)', border: `2px solid ${t.done ? C.success : 'rgba(0,0,0,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.done ? `0 2px 8px ${C.success}40` : 'none', transition: 'all 0.2s' }}>
                  {t.done && Icons.check()}
                </div>
                <span style={{ fontSize: 14, color: t.done ? C.textLight : C.text, textDecoration: t.done ? 'line-through' : 'none', lineHeight: 1.5 }}>{t.text}</span>
              </div>
            </div>
          ))}
        </Glass>

        {/* Tools */}
        <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Quick Tools</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          <Glass onClick={() => setModal('journal')} intensity="normal" style={{ padding: 14, textAlign: 'center' }}>
            {Icons.journal()}
            <div style={{ fontSize: 12, marginTop: 6, fontWeight: 500 }}>Journal</div>
          </Glass>
          <Glass onClick={() => setModal('calculator')} intensity="normal" style={{ padding: 14, textAlign: 'center' }}>
            {Icons.calculator()}
            <div style={{ fontSize: 12, marginTop: 6, fontWeight: 500 }}>Calculator</div>
          </Glass>
          <Glass onClick={() => setModal('hardMoments')} intensity="normal" style={{ padding: 14, textAlign: 'center' }}>
            {Icons.support()}
            <div style={{ fontSize: 12, marginTop: 6, fontWeight: 500 }}>Support</div>
          </Glass>
        </div>

        <Glass intensity="subtle" style={{ textAlign: 'center', padding: 12, marginTop: 10 }}>
          <p style={{ fontSize: 11, color: C.textLight, margin: 0 }}>For educational purposes only</p>
        </Glass>
      </div><Nav />
    </div>
  );
}

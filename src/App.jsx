import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════
// GESTATIONAL.LY V14 - Final Production Version
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
  const i = intensities[intensity] || intensities.normal;
  const v = variants[variant] || variants.default;
  return (
    <div onClick={onClick} style={{ position: 'relative', background: i.bg, backdropFilter: `blur(${i.blur}px) saturate(180%)`, WebkitBackdropFilter: `blur(${i.blur}px) saturate(180%)`, borderRadius: 20, border: `1px solid ${i.border}`, boxShadow: `0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.9)${glow ? `, 0 0 30px ${v.glowColor}` : ''}`, padding: 20, cursor: onClick ? 'pointer' : 'default', transition: 'all 0.25s ease', ...style }}>
      <div style={{ position: 'absolute', inset: 0, background: v.tint, borderRadius: 20, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

const GlassPill = ({ children, color = C.accent }) => (
  <span style={{ display: 'inline-block', padding: '5px 12px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, color }}>{children}</span>
);

const GlassButton = ({ children, onClick, variant = 'primary', disabled, fullWidth, size = 'normal', style }) => {
  const sizes = { small: { p: '10px 16px', fs: 14 }, normal: { p: '14px 24px', fs: 15 }, large: { p: '18px 32px', fs: 16 } };
  const s = sizes[size];
  const isPrimary = variant === 'primary';
  return (
    <button onClick={disabled ? undefined : onClick} style={{ padding: s.p, fontSize: s.fs, fontWeight: 600, borderRadius: 16, background: isPrimary ? `linear-gradient(135deg, ${C.accent}, ${C.accentDark})` : 'rgba(255,255,255,0.7)', color: isPrimary ? 'white' : C.text, border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.7)', boxShadow: isPrimary ? '0 6px 20px rgba(199,125,110,0.35)' : '0 4px 12px rgba(0,0,0,0.06)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, width: fullWidth ? '100%' : 'auto', fontFamily: 'inherit', transition: 'all 0.2s', ...style }}>{children}</button>
  );
};

const GlassProgress = ({ value, size = 80 }) => {
  const stroke = 8, radius = (size - stroke) / 2, circ = radius * 2 * Math.PI, offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }} />
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
        <defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={C.accent}/><stop offset="100%" stopColor="#9070a0"/></linearGradient></defs>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="url(#pg)" strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
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
  ai: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(128,112,160,0.15)" stroke="#8070a0" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke="#8070a0" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" fill="#8070a0" opacity="0.3"/></svg>,
  target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={C.accent} strokeWidth="1.5" opacity="0.3"/><circle cx="12" cy="12" r="5" stroke={C.accent} strokeWidth="1.5" opacity="0.6"/><circle cx="12" cy="12" r="2" fill={C.accent}/></svg>,
  logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  email: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>,
  lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
};

const buildAIResponse = (query, user) => {
  const q = query.toLowerCase();
  const isGC = user.type === 'gc';
  if (q.includes('cost') || q.includes('pay') || q.includes('money') || q.includes('compensation')) {
    return isGC ? `As a gestational carrier in ${user.state}, typical base compensation ranges from $45,000-$75,000.\n\nADDITIONAL:\n• Monthly allowance: $200-400\n• Transfer fee: $1,000-1,500\n• C-section: $2,500-5,000\n• Twins: $5,000-10,000\n\nSet aside 25-30% for taxes.` : `Total surrogacy costs: $100,000-$250,000+\n\n• Carrier: $55,000-95,000\n• Agency: $20,000-35,000\n• Legal: $8,000-15,000\n• Medical: $15,000-35,000\n• Insurance: $15,000-40,000`;
  }
  if (q.includes('law') || q.includes('legal') || q.includes('state')) return `Surrogacy laws vary by state. CA, NV, IL, WA are very favorable.\n\nKEY STEPS:\n1. Find ART attorney (AAARTA.org)\n2. Separate legal representation\n3. Sign contract BEFORE medical\n4. Verify escrow funded\n5. File parentage order weeks 16-20`;
  if (q.includes('timeline') || q.includes('long')) return `TIMELINE: 12-18 months\n\n• Research: 2-8 weeks\n• Matching: 1-6 months\n• Screening: 4-8 weeks\n• Contracts: 2-4 weeks\n• Transfer: 4-6 weeks\n• Pregnancy: ~40 weeks`;
  if (q.includes('screen') || q.includes('require')) return `REQUIREMENTS (ASRM):\n• Age: 21-45\n• BMI: Under 32-35\n• Prior uncomplicated pregnancy\n• Non-smoker 12+ months\n• Stable living situation\n\nScreening: 4-8 weeks, paid by IPs.`;
  return `I can help with:\n• Compensation & costs\n• State laws\n• Timeline\n• Requirements\n• Contracts & escrow\n• Transfer prep\n\nWhat would you like to know?`;
};

const DAILY_FOCUS = {
  gc: { research: [{ t: "Learn compensation", d: "Understand earnings", r: 'compensation' }], match: [{ t: "Prepare for calls", d: "Questions to ask" }], medical: [{ t: "Screening prep", d: "What to expect", r: 'screening' }], legal: [{ t: "Review contract", d: "Every clause matters", r: 'contract' }], transfer: [{ t: "Transfer prep", d: "Full bladder, comfy clothes", r: 'transfer' }], pregnant: [{ t: "Update IPs", d: "They're anxious too" }], post: [{ t: "Schedule checkup", d: "6-week postpartum" }] },
  ip: { research: [{ t: "Understand costs", d: "Budget realistically", r: 'budget' }], match: [{ t: "Create profile", d: "Be authentic" }], medical: [{ t: "Support carrier", d: "She's going through a lot" }], legal: [{ t: "Fund escrow", d: "Non-negotiable", r: 'escrow' }], transfer: [{ t: "Be supportive", d: "Two-week wait is hard" }], pregnant: [{ t: "Communication plan", d: "Stay connected" }], post: [{ t: "Honor carrier", d: "She changed your life" }] }
};

const HARD_MOMENTS = {
  gc: [{ id: 'fail', title: "Transfer didn't work", content: `IT'S NOT YOUR FAULT\nMost failures are embryo issues. Even perfect transfers have 40-60% success.\n\nWHAT TO SAY\n"I'm so sorry. I'm committed and here for next steps."` }, { id: 'conflict', title: "Conflict with IPs", content: `Address early: "I've noticed ___ and want to talk."\n\nINVOLVE ATTORNEY IF:\n• Pattern of disrespect\n• Contract violations\n• Feeling unsafe` }, { id: 'postpartum', title: "After delivery", content: `NORMAL FEELINGS:\n• Sadness\n• Hormonal swings\n• Grief journey ending\n\nGET HELP IF symptoms worsen after 2 weeks.\n\nPostpartum Support: 1-800-944-4773` }],
  ip: [{ id: 'fail', title: "Transfer didn't work", content: `This loss is real.\n\nYour carrier did everything right. Tell her: "This isn't your fault."` }, { id: 'waiting', title: "Waiting is hard", content: `STRATEGIES:\n• Start a project\n• 15 min "worry time" daily\n• Exercise\n\nMANTRA: "I've done everything I can."` }, { id: 'money', title: "Financial stress", content: `Break costs into chunks.\nReview contract coverage.\n\nIMPORTANT: Always pay carrier on time.` }]
};

const REMINDERS = { research: { title: "Review insurance", desc: "Many policies exclude surrogacy." }, match: { title: "Trust instincts", desc: "If something feels off, keep looking." }, medical: { title: "Arrange injection help", desc: "PIO shots are hard alone.", urgent: true }, legal: { title: "Verify escrow", desc: "Never start meds without funding.", urgent: true }, transfer: { title: "Transfer prep", desc: "Full bladder, comfy clothes." }, pregnant: { title: "Parentage order", desc: "Begin at week 16-20.", urgent: true }, post: { title: "Postpartum care", desc: "Your checkup matters." } };

const RESOURCES = {
  screening: { title: 'Medical Screening', cat: 'Medical', content: `REQUIREMENTS (ASRM)\n• Age: 21-45\n• BMI: Under 32-35\n• Prior uncomplicated pregnancy\n• Non-smoker 12+ months\n• Stable situation\n\nTESTING\n• Blood work (HIV, Hepatitis, STIs)\n• Uterine evaluation\n• Psych screening (MMPI-2)\n\nTimeline: 4-8 weeks\nCosts paid by IPs` },
  medications: { title: 'Medication Protocol', cat: 'Medical', content: `PHASE 1: SUPPRESSION\nLupron - shuts down natural cycle\n\nPHASE 2: ESTROGEN\nEstrace - builds lining to 7-8mm+\n\nPHASE 3: PROGESTERONE\nPIO injections - starts 5 days before transfer\n\nPIO TIPS:\n• Warm oil first\n• Ice area\n• Inject slowly\n• Massage after\n• GET HELP!` },
  transfer: { title: 'Transfer Day', cat: 'Medical', content: `PREP:\n• Full bladder (16-32oz water)\n• Light breakfast\n• Comfy clothes\n• Arrange ride\n\nPROCEDURE (10-15 min):\n1. Ultrasound on abdomen\n2. Catheter through cervix\n3. Embryo deposited\n4. Rest 15 minutes\n\nAFTER: Rest, continue meds, beta test 9-12 days` },
  contract: { title: 'Contracts', cat: 'Legal', content: `KEY SECTIONS:\n• Compensation & schedule\n• Medical provisions\n• Termination clauses\n• Insurance\n\nRULES:\n1. SEPARATE ATTORNEYS\n2. Sign BEFORE meds\n3. Escrow MUST be funded\n\nFind attorneys: AAARTA.org` },
  escrow: { title: 'Escrow', cat: 'Legal', content: `Neutral third party holds funds.\n\nGOLDEN RULE:\nNEVER start meds until:\n✓ Contract signed\n✓ Escrow exists\n✓ Escrow funded\n\nRED FLAGS:\n• Direct payment\n• "Set up later"\n• Pressure to start\n\nRecommended: SeedTrust` },
  attorneys: { title: 'Legal Help', cat: 'Legal', content: `Find attorneys: AAARTA.org\n\nCOSTS:\n• Carrier attorney: $1,000-2,500 (IPs pay)\n• IPs attorney: $6,000-13,000\n\nPROCESS:\n1. Drafting (1-2 weeks)\n2. Review\n3. Negotiation\n4. Sign\n\nTimeline: 2-4 weeks` },
  parentage: { title: 'Parentage Orders', cat: 'Legal', content: `PRE-BIRTH ORDER:\n• Filed weeks 16-20\n• IPs on birth certificate\n\nPOST-BIRTH:\n• Filed after birth\n• Certificate amended later\n\nPRE-BIRTH STATES:\nCA, CT, IL, NV, NY, OR, WA...\n\nDon't wait - file early!` },
  compensation: { title: 'Compensation', cat: 'Financial', content: `BASE: $45,000-75,000\n\nADDITIONAL:\n• Transfer: $1,000-1,500\n• C-section: $2,500-5,000\n• Twins: $5,000-10,000\n• Monthly: $200-400\n\nTAXES: Set aside 25-30%\n\nSAMPLE TOTAL: ~$59,000\nAfter taxes: ~$42,000` },
  budget: { title: 'IP Costs', cat: 'Financial', content: `TOTAL: $100,000-250,000\n\n• Carrier: $55-95K\n• Agency: $20-35K\n• Legal: $8-15K\n• Medical: $15-35K\n• Insurance: $15-40K\n\nSAVINGS:\nIndependent = skip agency fees` },
  relationship: { title: 'GC-IP Relationship', cat: 'Wellness', content: `EARLY CONVERSATIONS:\n• Communication preferences\n• Appointment attendance\n• Delivery plans\n• Post-birth relationship\n\nTIPS:\n• Over-communicate\n• Assume good intent\n• Address issues early\n\nThis relationship is the heart of your journey.` },
  therapists: { title: 'Mental Health', cat: 'Wellness', content: `WHEN TO SEEK HELP:\n• Processing decisions\n• During any stage\n• After delivery\n• Postpartum symptoms\n\nCRISIS RESOURCES:\n• Postpartum: 1-800-944-4773\n• Crisis Text: HOME to 741741\n• Suicide Prevention: 988\n\nAsking for help is strength.` },
  insurance: { title: 'Insurance', cat: 'Financial', content: `CHALLENGE:\nMany policies exclude surrogacy.\n\nOPTIONS:\n1. Review existing policy ($250-500)\n2. Surrogacy policy ($15-40K)\n3. Cash reserves ($50K+)\n\nVerify BEFORE matching.\nNever assume coverage.` },
  ivf: { title: 'IVF & Embryos', cat: 'Medical', content: `PROCESS:\n1. Eggs retrieved\n2. Sperm collected\n3. Fertilization\n4. Grow 5-6 days\n5. Freeze best embryos\n\nPGT-A TESTING ($3-6K):\n• Checks chromosomes\n• Higher success rate\n• Highly recommended\n\nPlan 2-3 embryos per baby.` }
};
Object.keys(RESOURCES).forEach(k => { RESOURCES[k].time = `${Math.ceil(RESOURCES[k].content.split(/\s+/).length / 200)} min`; });

const STAGES = {
  gc: [{ id: 'research', name: 'Researching', duration: '2-4 weeks', weeks: 3, tasks: ['Research options','Understand compensation','Learn requirements','Discuss with family'] },{ id: 'match', name: 'Finding Match', duration: '1-3 months', weeks: 8, tasks: ['Create profile','Video calls','Discuss expectations','Confirm match'] },{ id: 'medical', name: 'Screening', duration: '4-8 weeks', weeks: 6, tasks: ['Clinic appointment','Complete testing','Psych eval','Get clearance'] },{ id: 'legal', name: 'Contracts', duration: '2-4 weeks', weeks: 3, tasks: ['Get attorney','Review contract','Verify escrow','Sign'] },{ id: 'transfer', name: 'Transfer', duration: '4-6 weeks', weeks: 5, tasks: ['Start meds','Monitoring','Transfer','Beta test'] },{ id: 'pregnant', name: 'Pregnant', duration: '~40 weeks', weeks: 40, tasks: ['Ultrasound','OB care','Updates to IPs','Parentage order'] },{ id: 'post', name: 'Post-Birth', duration: '4-8 weeks', weeks: 6, tasks: ['Recovery','Final payment','Checkup'] }],
  ip: [{ id: 'research', name: 'Researching', duration: '2-8 weeks', weeks: 5, tasks: ['Understand costs','Consult attorney','Choose clinic','Review laws'] },{ id: 'match', name: 'Finding Match', duration: '1-6 months', weeks: 12, tasks: ['Create profile','Review carriers','Video calls','Confirm'] },{ id: 'medical', name: 'IVF', duration: '2-4 months', weeks: 12, tasks: ['Consultation','Create embryos','Testing','Support screening'] },{ id: 'legal', name: 'Contracts', duration: '2-4 weeks', weeks: 3, tasks: ['Get attorney','Draft contract','Fund escrow','Insurance'] },{ id: 'transfer', name: 'Transfer', duration: '4-6 weeks', weeks: 5, tasks: ['Coordinate','Support carrier','Wait for beta'] },{ id: 'pregnant', name: 'Expecting', duration: '~40 weeks', weeks: 40, tasks: ['Communication plan','Parentage order','Prepare nursery'] },{ id: 'post', name: 'Baby Home', duration: '4-8 weeks', weeks: 6, tasks: ['Welcome baby','Birth certificate','Honor carrier'] }]
};
const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','DC'];
const MOODS = [{ label: 'Great', color: C.success },{ label: 'Good', color: '#8ec99a' },{ label: 'Okay', color: C.warning },{ label: 'Hard', color: '#d49a8a' },{ label: 'Struggling', color: C.accent }];

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
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
      if (token && (type === 'signup' || type === 'email')) {
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
      setScreen('app');
      setShowDailyGuide(true);
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

  const base = { minHeight: '100vh', background: BG, fontFamily: "'SF Pro Display',-apple-system,sans-serif", color: C.text, position: 'relative', overflow: 'hidden' };
  const page = { ...base, padding: 20, paddingBottom: screen === 'app' ? 110 : 20 };
  const container = { maxWidth: 420, margin: '0 auto', position: 'relative', zIndex: 1 };
  const closeModal = () => { setModal(null); setModalData(null); setAiResponse(''); setAiQuery(''); };

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

  const Nav = () => (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '12px 20px 28px' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-around', padding: '12px 8px' }}>
        {[{ id: 'home', icon: Icons.home, label: 'Home' },{ id: 'learn', icon: Icons.learn, label: 'Learn' },{ id: 'support', icon: Icons.heart, label: 'Support' },{ id: 'profile', icon: Icons.profile, label: 'Profile' }].map(n => (
          <div key={n.id} onClick={() => setTab(n.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '8px 16px', borderRadius: 16, background: tab === n.id ? C.accentLight : 'transparent' }}>
            {n.icon(tab === n.id)}
            <span style={{ fontSize: 11, fontWeight: 500, color: tab === n.id ? C.accent : C.textMuted }}>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Loading
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

  // Modals
  if (modal === 'resource' && modalData) return <Modal title={modalData.title}><GlassPill>{modalData.cat}</GlassPill><p style={{ color: C.textMuted, margin: '10px 0 24px', fontSize: 14 }}>{modalData.time} read</p><Glass intensity="strong"><pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{modalData.content}</pre></Glass></Modal>;
  if (modal === 'mood') return <Modal title="How are you today?">{MOODS.map(m => <Glass key={m.label} onClick={() => logMood(m.label)} intensity="normal" style={{ marginBottom: 12, padding: 16 }}><div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ width: 14, height: 14, borderRadius: 7, background: m.color }} /><span style={{ fontSize: 16, fontWeight: 500 }}>{m.label}</span></div></Glass>)}</Modal>;
  if (modal === 'journal') return <Modal title="Journal"><Glass intensity="strong" style={{ marginBottom: 16, padding: 0 }}><textarea value={journalText} onChange={e => setJournalText(e.target.value)} placeholder="What's on your mind?" style={{ width: '100%', minHeight: 140, padding: 16, border: 'none', background: 'transparent', fontSize: 16, outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} /></Glass><GlassButton onClick={saveJ} fullWidth disabled={!journalText.trim()}>Save Entry</GlassButton>{user.journal.length > 0 && <div style={{ marginTop: 32 }}><h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Previous Entries</h3>{[...user.journal].reverse().slice(0, 5).map((j, i) => <Glass key={i} intensity="normal" style={{ marginBottom: 12, padding: 16 }}><div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{new Date(j.date).toLocaleDateString()}</div><p style={{ margin: 0, fontSize: 15 }}>{j.text}</p></Glass>)}</div>}</Modal>;
  if (modal === 'calculator') return <Modal title="Compensation Calculator"><Glass intensity="strong" style={{ marginBottom: 16 }}><div style={{ marginBottom: 20 }}><label style={{ fontSize: 14, color: C.textMuted }}>Base Compensation</label><div style={{ fontSize: 24, fontWeight: 600 }}>${calc.base.toLocaleString()}</div><input type="range" min="35000" max="80000" step="1000" value={calc.base} onChange={e => setCalc(c => ({ ...c, base: +e.target.value }))} style={{ width: '100%', marginTop: 8 }} /></div><div style={{ display: 'flex', gap: 12 }}>{[['csection', 'C-Section', '+$3,500'], ['twins', 'Twins', '+$7,500']].map(([k, l, v]) => <Glass key={k} onClick={() => setCalc(c => ({ ...c, [k]: !c[k] }))} variant={calc[k] ? 'accent' : 'default'} intensity="normal" style={{ padding: 12, flex: '1 1 45%' }}><div style={{ fontWeight: 500, fontSize: 14 }}>{l}</div><div style={{ fontSize: 13, color: C.textMuted }}>{v}</div></Glass>)}</div></Glass><Glass intensity="strong" variant="accent" glow><div style={{ textAlign: 'center' }}><div style={{ fontSize: 14, color: C.textMuted }}>Estimated Total</div><div style={{ fontSize: 32, fontWeight: 700, color: C.accent }}>${calcTotal().toLocaleString()}</div></div></Glass></Modal>;
  if (modal === 'timeline') return <Modal title="Your Timeline">{timeline().map((s, i) => <div key={s.id} style={{ display: 'flex', marginBottom: 16 }}><div style={{ width: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}><div style={{ width: 12, height: 12, borderRadius: 6, background: s.status === 'done' ? C.success : s.status === 'current' ? C.accent : C.textLight }} />{i < timeline().length - 1 && <div style={{ width: 2, flex: 1, background: C.textLight, marginTop: 4 }} />}</div><div style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontWeight: 600 }}>{s.name}</span>{s.status === 'current' && <GlassPill>Now</GlassPill>}</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>{s.start.toLocaleDateString()} → {s.end.toLocaleDateString()}</div></div></div>)}</Modal>;
  if (modal === 'hardMoments') return <Modal title="Hard Moments">{hardMoments.map(h => <Glass key={h.id} onClick={() => { setModal('hardDetail'); setModalData(h); }} intensity="normal" style={{ marginBottom: 12, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 600 }}>{h.title}</span>{Icons.chevron()}</div></Glass>)}</Modal>;
  if (modal === 'hardDetail' && modalData) return <Modal title={modalData.title}><Glass intensity="strong"><pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{modalData.content}</pre></Glass></Modal>;
  if (modal === 'ai') {
    const qs = user.type === 'gc' ? [`Laws in ${user.state}?`, 'Compensation?', 'Requirements?'] : [`Laws in ${user.state}?`, 'Total cost?', 'Find carrier?'];
    return <Modal title="Ask Me Anything"><p style={{ color: C.textMuted, marginBottom: 20, fontSize: 14 }}>I know you're {user.type === 'gc' ? 'a carrier' : 'an IP'} in {user.state}.</p><Glass intensity="strong" style={{ marginBottom: 16, padding: 0 }}><input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && askAi()} placeholder="Type your question..." style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 16, outline: 'none', boxSizing: 'border-box' }} /></Glass><GlassButton onClick={askAi} fullWidth disabled={!aiQuery.trim()}>Ask</GlassButton>{aiResponse && <Glass intensity="strong" style={{ marginTop: 20 }}><pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{aiResponse}</pre></Glass>}{!aiResponse && <div style={{ marginTop: 24 }}><p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>Try:</p>{qs.map((q, i) => <Glass key={i} onClick={() => setAiQuery(q)} intensity="normal" style={{ marginBottom: 8, padding: 12 }}><span style={{ fontSize: 14 }}>{q}</span></Glass>)}</div>}</Modal>;
  }

  // Daily Guide
  if (screen === 'app' && showDailyGuide && dailyFocus.length > 0) return (
    <div style={page}><Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} /><div style={container}><Glass intensity="strong" glow style={{ marginTop: 60, padding: 28 }}><div style={{ background: `linear-gradient(135deg, ${C.accent}, #9070a0)`, borderRadius: 16, padding: 20, marginBottom: 24, color: 'white', textAlign: 'center' }}><div style={{ fontSize: 14, opacity: 0.9 }}>{greet}</div><h2 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>{user.name}</h2><div style={{ fontSize: 14, opacity: 0.8 }}>Day {days} • {cur?.name}</div></div><div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 10 }}>Your Focus Today</div>{dailyFocus[0] && <Glass onClick={() => { setShowDailyGuide(false); if (dailyFocus[0].r) { setModal('resource'); setModalData(RESOURCES[dailyFocus[0].r]); } }} variant="accent" intensity="normal" style={{ padding: 16, marginBottom: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 16, color: C.accent }}>{dailyFocus[0].t}</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{dailyFocus[0].d}</div></div>{dailyFocus[0].r && Icons.chevron()}</div></Glass>}<GlassButton onClick={() => setShowDailyGuide(false)} fullWidth variant="secondary">Explore on my own</GlassButton></Glass></div></div>
  );

  // Welcome
  if (screen === 'welcome') return (
    <div style={page}><Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} /><Orb size={150} top="60%" left="80%" color="rgba(200,170,255,0.35)" blur={60} /><div style={{ ...container, textAlign: 'center', paddingTop: 80 }}>{Icons.logo()}<h1 style={{ fontSize: 36, fontWeight: 700, marginTop: 20, marginBottom: 10 }}>Gestational<span style={{ color: C.accent }}>.ly</span></h1><p style={{ color: C.textMuted, marginBottom: 50, fontSize: 17 }}>Your surrogacy companion</p><Glass intensity="strong" glow style={{ padding: 28, marginBottom: 20 }}><h3 style={{ fontSize: 15, fontWeight: 600, color: C.textMuted, marginBottom: 20 }}>WHAT YOU'LL GET</h3>{['Stage-by-stage guidance', 'Support for hard moments', 'Budget & compensation tools', 'Journal & mood tracking'].map((f, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, textAlign: 'left' }}><div style={{ width: 32, height: 32, borderRadius: 10, background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.heart(true)}</div><span style={{ fontSize: 15 }}>{f}</span></div>)}</Glass><GlassButton onClick={() => setScreen('onboard')} fullWidth size="large">Begin Your Journey</GlassButton></div></div>
  );

  // Onboarding
  if (screen === 'onboard') {
    const onboardSteps = [
      <div key="t"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>I am a...</h2></Glass>{[['gc', 'Gestational Carrier', 'Carrying for IPs'], ['ip', 'Intended Parent', 'Building my family']].map(([k, l, d]) => <Glass key={k} onClick={() => setUser(u => ({ ...u, type: k }))} variant={user.type === k ? 'accent' : 'default'} glow={user.type === k} intensity="normal" style={{ marginBottom: 12, padding: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 17 }}>{l}</div><div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{d}</div></div>{user.type === k && <div style={{ width: 24, height: 24, borderRadius: 12, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.check()}</div>}</div></Glass>)}<GlassButton onClick={() => setStep(1)} disabled={!user.type} fullWidth style={{ marginTop: 24 }}>Continue</GlassButton></div>,
      <div key="s"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Your State</h2></Glass><Glass intensity="strong" style={{ marginBottom: 24, padding: 0 }}><select value={user.state} onChange={e => setUser(u => ({ ...u, state: e.target.value }))} style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 17, outline: 'none' }}><option value="">Select your state</option>{STATES.map(s => <option key={s} value={s}>{s}</option>)}</select></Glass><div style={{ display: 'flex', gap: 12 }}><GlassButton variant="secondary" onClick={() => setStep(0)} style={{ flex: 1 }}>Back</GlassButton><GlassButton onClick={() => setStep(2)} disabled={!user.state} style={{ flex: 2 }}>Continue</GlassButton></div></div>,
      <div key="st"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Current Stage</h2></Glass><div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 24 }}>{stages.map(s => <Glass key={s.id} onClick={() => setUser(u => ({ ...u, stage: s.id }))} variant={user.stage === s.id ? 'accent' : 'default'} glow={user.stage === s.id} intensity="normal" style={{ marginBottom: 10, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</div><div style={{ fontSize: 13, color: C.textMuted }}>{s.duration}</div></div>{user.stage === s.id && <div style={{ width: 24, height: 24, borderRadius: 12, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.check()}</div>}</div></Glass>)}</div><div style={{ display: 'flex', gap: 12 }}><GlassButton variant="secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</GlassButton><GlassButton onClick={() => setStep(3)} disabled={!user.stage} style={{ flex: 2 }}>Continue</GlassButton></div></div>,
      <div key="n"><Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}><h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Your Name</h2></Glass><Glass intensity="strong" style={{ marginBottom: 24 }}><input type="text" value={user.name} onChange={e => setUser(u => ({ ...u, name: e.target.value }))} placeholder="First name" style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 17, outline: 'none', boxSizing: 'border-box' }} /></Glass><div style={{ display: 'flex', gap: 12 }}><GlassButton variant="secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Back</GlassButton><GlassButton onClick={() => { const f = { ...user, startDate: Date.now() }; setUser(f); saveUserProfile(f); setStep(4); }} disabled={!user.name.trim()} style={{ flex: 2 }}>Continue</GlassButton></div></div>,
      <div key="d" style={{ textAlign: 'center', paddingTop: 50 }}><Glass intensity="strong" glow variant="success" style={{ width: 80, height: 80, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', borderRadius: 24 }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="3" strokeLinecap="round"><path d="M4 12l6 6L20 6"/></svg></Glass><h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 10 }}>Welcome, {user.name}</h2><p style={{ color: C.textMuted, marginBottom: 40 }}>Your companion is ready</p><GlassButton onClick={() => { setScreen('app'); setTab('home'); }} fullWidth size="large">Go to Dashboard</GlassButton></div>
    ];
    return <div style={page}><Orb size={180} top="-40px" left="-20px" color="rgba(255,180,150,0.35)" blur={60} /><div style={container}>{onboardSteps[step]}</div></div>;
  }

  // HOME TAB
  if (tab === 'home') return (
    <div style={page}><Orb size={200} top="-60px" left="-30px" color="rgba(255,180,150,0.35)" blur={70} /><Orb size={140} top="45%" left="90%" color="rgba(200,170,255,0.25)" blur={50} /><div style={container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}><div><p style={{ color: C.textMuted, margin: 0, fontSize: 15 }}>{greet}</p><h1 style={{ fontSize: 28, fontWeight: 700, margin: '4px 0 0' }}>{user.name}</h1></div><Glass onClick={() => setModal('mood')} variant={todayMood ? 'success' : 'default'} intensity="normal" glow={!!todayMood} style={{ width: 48, height: 48, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}><div style={{ width: 12, height: 12, borderRadius: 6, background: todayMood ? C.success : C.textLight }} /></Glass></div>
      <Glass onClick={() => setModal('ai')} intensity="normal" style={{ marginBottom: 20, padding: 14, background: 'rgba(128,112,160,0.06)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{Icons.ai()}<span style={{ color: C.textMuted, fontSize: 15 }}>Ask me anything about surrogacy...</span></div></Glass>
      {dailyFocus.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>{Icons.target()}<span style={{ fontSize: 14, fontWeight: 700 }}>Today's Focus</span><GlassPill>{cur?.name}</GlassPill></div>{dailyFocus.slice(0, 2).map((f, i) => <Glass key={i} onClick={() => f.r && (setModal('resource'), setModalData(RESOURCES[f.r]))} intensity={i === 0 ? 'strong' : 'normal'} variant={i === 0 ? 'accent' : 'default'} glow={i === 0} style={{ marginBottom: 10, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 15 }}>{f.t}</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{f.d}</div></div>{f.r && Icons.chevron()}</div></Glass>)}</div>}
      {reminder && <Glass variant={reminder.urgent ? 'warning' : 'default'} intensity="normal" style={{ marginBottom: 20, padding: 16 }}><div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>{Icons.alert()}<div><div style={{ fontWeight: 600, fontSize: 15 }}>{reminder.title}</div><div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{reminder.desc}</div></div></div></Glass>}
      <Glass intensity="strong" style={{ marginBottom: 20 }}><div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><div style={{ position: 'relative' }}><GlassProgress value={pct} size={80} /><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 16, fontWeight: 700 }}>{Math.round(pct)}%</span></div></div><div style={{ flex: 1 }}><div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Day {days} • {cur?.name}</div><div style={{ fontSize: 18, fontWeight: 700 }}>{cur?.duration}</div></div></div><Glass onClick={() => setModal('timeline')} intensity="subtle" style={{ marginTop: 14, padding: 10, borderRadius: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 13, color: C.textSecondary }}>View full timeline</span>{Icons.chevron()}</div></Glass></Glass>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}><span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' }}>Stage Tasks</span><GlassPill color={done === tasks.length ? C.success : C.textMuted}>{done}/{tasks.length}</GlassPill></div>
      <Glass intensity="strong" style={{ marginBottom: 20, padding: 16 }}>{tasks.map((t, i) => <div key={t.id} style={{ marginBottom: i < tasks.length - 1 ? 14 : 0 }}><div onClick={() => toggle(t.id)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}><div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 2, background: t.done ? C.success : 'rgba(255,255,255,0.8)', border: `2px solid ${t.done ? C.success : 'rgba(0,0,0,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.done ? `0 2px 8px ${C.success}40` : 'none' }}>{t.done && Icons.check()}</div><span style={{ fontSize: 14, color: t.done ? C.textLight : C.text, textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span></div></div>)}</Glass>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>Quick Tools</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}><Glass onClick={() => setModal('journal')} intensity="normal" style={{ padding: 14, textAlign: 'center' }}>{Icons.journal()}<div style={{ fontSize: 12, marginTop: 6, fontWeight: 500 }}>Journal</div></Glass><Glass onClick={() => setModal('calculator')} intensity="normal" style={{ padding: 14, textAlign: 'center' }}>{Icons.calculator()}<div style={{ fontSize: 12, marginTop: 6, fontWeight: 500 }}>Calculator</div></Glass><Glass onClick={() => setModal('hardMoments')} intensity="normal" style={{ padding: 14, textAlign: 'center' }}>{Icons.support()}<div style={{ fontSize: 12, marginTop: 6, fontWeight: 500 }}>Support</div></Glass></div>
    </div><Nav /></div>
  );

  // LEARN TAB
  if (tab === 'learn') {
    const cats = [{ k: 'Medical', icon: Icons.medical, items: ['screening', 'medications', 'transfer', 'ivf'] },{ k: 'Legal', icon: Icons.legal, items: ['contract', 'escrow', 'attorneys', 'parentage'] },{ k: 'Financial', icon: Icons.financial, items: ['compensation', 'budget', 'insurance'] },{ k: 'Wellness', icon: Icons.wellness, items: ['relationship', 'therapists'] }];
    return <div style={page}><Orb size={180} top="-40px" left="-20px" color="rgba(255,180,150,0.3)" blur={60} /><div style={container}><h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Learn</h1><p style={{ color: C.textMuted, marginBottom: 24, fontSize: 15 }}>Comprehensive guides for your journey</p><Glass onClick={() => setModal('ai')} intensity="normal" style={{ marginBottom: 28, padding: 14, background: 'rgba(128,112,160,0.06)' }}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{Icons.ai()}<span style={{ color: C.textMuted, fontSize: 15 }}>Ask me anything...</span></div></Glass>{cats.map(c => <div key={c.k} style={{ marginBottom: 28 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>{c.icon()}<span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' }}>{c.k}</span></div>{c.items.map(k => RESOURCES[k] && <Glass key={k} onClick={() => { setModal('resource'); setModalData(RESOURCES[k]); }} intensity="normal" style={{ marginBottom: 10, padding: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: 15 }}>{RESOURCES[k].title}</div><div style={{ fontSize: 13, color: C.textMuted }}>{RESOURCES[k].time} read</div></div>{Icons.chevron()}</div></Glass>)}</div>)}</div><Nav /></div>;
  }

  // SUPPORT TAB
  if (tab === 'support') return <div style={page}><Orb size={160} top="10%" left="80%" color="rgba(200,170,255,0.3)" blur={50} /><div style={container}><h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>Support</h1><p style={{ color: C.textMuted, marginBottom: 28, fontSize: 15 }}>Tools when you need them</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>{[{ icon: Icons.journal, l: 'Journal', d: `${user.journal.length} entries`, a: () => setModal('journal') },{ icon: Icons.calculator, l: 'Calculator', d: 'Estimate', a: () => setModal('calculator') },{ icon: Icons.timeline, l: 'Timeline', d: 'View dates', a: () => setModal('timeline') },{ icon: Icons.support, l: 'Hard Moments', d: 'Support', a: () => setModal('hardMoments') }].map((x, i) => <Glass key={i} onClick={x.a} intensity="normal" style={{ padding: 20, textAlign: 'center' }}><div style={{ marginBottom: 10 }}>{x.icon()}</div><div style={{ fontWeight: 600, fontSize: 15 }}>{x.l}</div><div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{x.d}</div></Glass>)}</div>{user.moods.length > 0 && <div><h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Recent Moods</h3><div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{user.moods.slice(-7).map((m, i) => { const mood = MOODS.find(x => x.label === m.mood); return <div key={i} style={{ width: 36, height: 36, borderRadius: 18, background: mood?.color || C.textLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 10, color: 'white', fontWeight: 600 }}>{new Date(m.date).getDate()}</span></div>; })}</div></div>}</div><Nav /></div>;

  // PROFILE TAB
  if (tab === 'profile') return <div style={page}><Orb size={140} top="5%" left="-10%" color="rgba(255,180,150,0.3)" blur={50} /><div style={container}><h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 28 }}>Profile</h1><Glass intensity="strong" style={{ marginBottom: 20 }}><div style={{ textAlign: 'center', marginBottom: 20 }}><div style={{ width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${C.accent}, #9070a0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 32, color: 'white', fontWeight: 600 }}>{user.name.charAt(0).toUpperCase()}</div><h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>{user.name}</h2><p style={{ color: C.textMuted, margin: '4px 0 0' }}>{session?.user?.email}</p></div><div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 20 }}>{[['Role', user.type === 'gc' ? 'Gestational Carrier' : 'Intended Parent'],['Location', user.state],['Stage', cur?.name],['Day', days]].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}><span style={{ color: C.textMuted }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span></div>)}</div></Glass><Glass intensity="strong" style={{ marginBottom: 20 }}><h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Stats</h3><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}><div><div style={{ fontSize: 24, fontWeight: 700, color: C.accent }}>{Object.values(user.tasks).flat().filter(t => t.done).length}</div><div style={{ fontSize: 12, color: C.textMuted }}>Tasks</div></div><div><div style={{ fontSize: 24, fontWeight: 700, color: C.success }}>{user.moods.length}</div><div style={{ fontSize: 12, color: C.textMuted }}>Moods</div></div><div><div style={{ fontSize: 24, fontWeight: 700, color: C.warning }}>{user.journal.length}</div><div style={{ fontSize: 12, color: C.textMuted }}>Entries</div></div></div></Glass><Glass onClick={handleLogout} intensity="normal" style={{ padding: 16 }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: C.accent }}>{Icons.logout()}<span style={{ fontWeight: 600 }}>Sign Out</span></div></Glass><div style={{ textAlign: 'center', marginTop: 24 }}><p style={{ fontSize: 12, color: C.textLight }}>Gestational.ly v14</p></div></div><Nav /></div>;

  return null;
}

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════
// GESTATIONAL.LY V13 - With User Accounts
// Supabase authentication + data persistence
// ═══════════════════════════════════════════════════════════════

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
// GLASS COMPONENTS
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

const GlassInput = ({ type = 'text', placeholder, value, onChange, style }) => (
  <Glass intensity="strong" style={{ padding: 0, ...style }}>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: 16,
        border: 'none',
        background: 'transparent',
        fontSize: 17,
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        color: C.text,
      }}
    />
  </Glass>
);

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
// ICONS
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
  home: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5V20a1 1 0 001 1h5v-6a1 1 0 011-1h4a1 1 0 011 1v6h5a1 1 0 001-1v-9.5" 
        stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" fill={active ? C.accentLight : 'none'}/>
      <path d="M2 12l10-9 10 9" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  learn: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" fill={active ? C.accentLight : 'none'}/>
      <path d="M8 7h8M8 11h8M8 15h4" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  support: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" fill={active ? C.accentLight : 'none'}/>
      <path d="M12 7v4l2.5 2.5" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  profile: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" fill={active ? C.accentLight : 'none'}/>
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={active ? C.accent : C.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M4 12l6 6L20 6"/></svg>,
  chevron: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>,
  close: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  journal: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/></svg>,
  calculator: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><rect x="7" y="5" width="10" height="5" rx="1"/><path d="M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2M15 18h2"/></svg>,
  timeline: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><path d="M12 2v20M6 6h12M6 12h12M6 18h12"/></svg>,
  ai: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M8 16c1-2 6-2 8 0"/></svg>,
  medical: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><path d="M12 4v16M4 12h16"/></svg>,
  legal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></svg>,
  financial: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 10c0-1.5 1.3-2 3-2s3 .5 3 2-1.3 2-3 2-3 .5-3 2 1.3 2 3 2"/></svg>,
  wellness: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><path d="M12 21C12 21 4 13 4 8.5C4 5.5 6.5 3 9.5 3c1.74 0 3.41.81 4.5 2.09A5.99 5.99 0 0119.5 3C22.5 3 25 5.5 25 8.5c0 4.5-8 12.5-8 12.5" transform="translate(-2.5, 0) scale(0.95)"/></svg>,
  heart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 4 13 4 8.5C4 5.5 6.5 3 9.5 3c1.74 0 3.41.81 4.5 2.09A5.99 5.99 0 0119.5 3C22.5 3 25 5.5 25 8.5c0 4.5-8 12.5-8 12.5" transform="translate(-2.5, 0) scale(0.95)" stroke={C.accent} fill={C.accentLight} strokeWidth="1.5"/></svg>,
  logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  email: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>,
  lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
};

// ═══════════════════════════════════════════════════════════════
// AI KNOWLEDGE BASE (Simplified for space - keep your full version)
// ═══════════════════════════════════════════════════════════════
const buildAIResponse = (query, user) => {
  const q = query.toLowerCase();
  if (q.includes('cost') || q.includes('pay') || q.includes('money') || q.includes('compensation')) {
    return user.type === 'gc' 
      ? `As a gestational carrier, typical compensation ranges from $45,000-$75,000 base, plus benefits. In ${user.state}, rates may vary. Additional compensation includes: monthly allowance ($200-400), transfer fees ($1,000-1,500), C-section fee ($2,500-5,000). Remember to set aside 25-30% for taxes.`
      : `Total surrogacy costs typically range from $100,000-$200,000+. This includes: carrier compensation ($55,000-$95,000), agency fees ($20,000-$35,000), legal ($8,000-$15,000), medical/IVF ($15,000-$35,000), and insurance.`;
  }
  if (q.includes('law') || q.includes('legal') || q.includes('state')) {
    return `In ${user.state}, surrogacy laws vary. California, Nevada, and Illinois are very favorable with pre-birth orders. Some states like Michigan and Louisiana have restrictions. Always work with an ART attorney licensed in your state. Visit AAARTA.org to find qualified attorneys.`;
  }
  if (q.includes('timeline') || q.includes('long') || q.includes('time')) {
    return `A typical surrogacy journey takes 12-18 months from start to baby. Breakdown: Research (2-8 weeks), Matching (1-6 months), Medical/Legal (2-4 months), Transfer cycle (4-6 weeks), Pregnancy (~40 weeks), Post-birth (4-8 weeks).`;
  }
  if (q.includes('screen') || q.includes('require') || q.includes('qualify')) {
    return `Carrier requirements (ASRM guidelines): Age 21-45, BMI under 32-35, at least one prior uncomplicated pregnancy, non-smoker for 12+ months, stable living situation. Medical screening includes blood work, uterine evaluation, and psychological assessment.`;
  }
  return `I'd be happy to help with your surrogacy questions! I can provide information about:\n\n• Compensation and costs\n• State laws and legal requirements\n• Timeline and process\n• Medical screening\n• Contracts and escrow\n• Emotional support\n\nWhat would you like to know more about?`;
};

// ═══════════════════════════════════════════════════════════════
// DATA CONSTANTS
// ═══════════════════════════════════════════════════════════════
const RESOURCES = {
  screening: { title: 'Medical Screening', cat: 'Medical', time: '5 min', content: 'ASRM requirements: Age 21-45, BMI under 32-35, prior pregnancy, non-smoker. Testing includes bloodwork, uterine evaluation, and psych screening.' },
  medications: { title: 'Medication Protocol', cat: 'Medical', time: '4 min', content: 'FET protocol: Lupron (suppression) → Estrace (lining) → PIO (progesterone). Tips: Warm oil, ice area, massage after.' },
  transfer: { title: 'Transfer Day', cat: 'Medical', time: '3 min', content: 'Full bladder, light meal, someone drives. Procedure takes 10-15 minutes. Beta test 9-12 days later.' },
  contract: { title: 'Surrogacy Contracts', cat: 'Legal', time: '5 min', content: 'GSA covers compensation, termination, medical decisions, insurance. Each party needs separate attorney. Sign BEFORE medications.' },
  escrow: { title: 'Escrow & Payments', cat: 'Legal', time: '3 min', content: 'Neutral third party holds funds. Recommended: SeedTrust. NEVER start meds without funded escrow.' },
  attorneys: { title: 'Legal Representation', cat: 'Legal', time: '4 min', content: 'Find ART attorneys at AAARTA.org. Carrier attorney: $1,000-$2,500 (paid by IPs). IP attorney: $6,000-$13,000.' },
  parentage: { title: 'Parentage Orders', cat: 'Legal', time: '4 min', content: 'Pre-birth states: CA, NY, IL, NV, WA. Post-birth: FL, OH, TX. File at weeks 16-20 of pregnancy.' },
  compensation: { title: 'Carrier Compensation', cat: 'Financial', time: '4 min', content: 'Base: $45,000-$75,000. Additional: C-section (+$2,500-5,000), twins (+$5,000-10,000), monthly allowance ($200-400). Set aside 25-30% for taxes.' },
  budget: { title: 'IP Budget Guide', cat: 'Financial', time: '5 min', content: 'Total: $100,000-$200,000+. Carrier ($55-95K), Agency ($20-35K), Legal ($8-15K), IVF ($15-35K), Insurance ($15-40K).' },
  relationship: { title: 'GC-IP Relationship', cat: 'Wellness', time: '4 min', content: 'Discuss early: communication frequency, appointment attendance, delivery plans, post-birth relationship. Trust your instincts during matching.' },
  therapists: { title: 'Mental Health Support', cat: 'Wellness', time: '3 min', content: 'Find support at ASRM Mental Health Group or Psychology Today. Postpartum Support: 1-800-944-4773.' },
};

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

const MOODS = [
  { label: 'Great', color: C.success },
  { label: 'Good', color: '#8ec99a' },
  { label: 'Okay', color: C.warning },
  { label: 'Hard', color: '#d49a8a' },
  { label: 'Struggling', color: C.accent },
];

const DAILY_GUIDE = {
  gc: {
    research: { title: "Let's learn together", message: "Today is about understanding what surrogacy means for you.", step: "Read the Compensation Guide", resource: "compensation" },
    match: { title: "Finding your match", message: "The right IPs are looking for someone just like you.", step: "Review your profile", resource: "relationship" },
    medical: { title: "Screening time", message: "This process ensures everyone's safety and readiness.", step: "Check screening requirements", resource: "screening" },
    legal: { title: "Protecting yourself", message: "Your contract is your most important protection.", step: "Review contract basics", resource: "contract" },
    transfer: { title: "Transfer is coming", message: "You're so close to this incredible moment.", step: "Read transfer day guide", resource: "transfer" },
    pregnant: { title: "You're pregnant!", message: "What an amazing gift you're giving.", step: "Review parentage info", resource: "parentage" },
    post: { title: "You did it", message: "Take time to recover and celebrate yourself.", step: "Read about postpartum support", resource: "therapists" },
  },
  ip: {
    research: { title: "Starting your journey", message: "Every family's path is unique. Let's find yours.", step: "Review the budget guide", resource: "budget" },
    match: { title: "Finding your carrier", message: "The right person is out there.", step: "Learn about the relationship", resource: "relationship" },
    medical: { title: "Creating embryos", message: "Science meeting hope.", step: "Understand the process", resource: "screening" },
    legal: { title: "Legal foundations", message: "Protecting everyone involved.", step: "Review contract guide", resource: "contract" },
    transfer: { title: "Transfer time", message: "Sending hope and love.", step: "Learn about transfer day", resource: "transfer" },
    pregnant: { title: "Your baby is growing", message: "What an incredible time.", step: "Plan for parentage order", resource: "parentage" },
    post: { title: "Baby is home!", message: "Your family is complete.", step: "Honor your carrier", resource: "relationship" },
  }
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  // Auth state
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  // App state
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
  const [saving, setSaving] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadUserProfile(session.user.id);
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        loadUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load user profile from Supabase
  const loadUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data && !error) {
      if (data.user_type) {
        setUser({
          type: data.user_type || '',
          state: data.state || '',
          otherState: data.other_state || '',
          stage: data.stage || '',
          name: data.name || '',
          startDate: data.start_date || null,
          tasks: data.tasks || {},
          moods: data.moods || [],
          journal: data.journal || [],
        });
        setScreen('app');
      } else {
        setScreen('welcome');
      }
    }
  };

  // Save user profile to Supabase
  const saveUserProfile = async (updatedUser) => {
    if (!session) return;
    setSaving(true);
    
    const { error } = await supabase
      .from('user_profiles')
      .update({
        user_type: updatedUser.type,
        state: updatedUser.state,
        other_state: updatedUser.otherState,
        stage: updatedUser.stage,
        name: updatedUser.name,
        start_date: updatedUser.startDate,
        tasks: updatedUser.tasks,
        moods: updatedUser.moods,
        journal: updatedUser.journal,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.user.id);

    if (error) console.error('Error saving profile:', error);
    setSaving(false);
  };

  // Update user and save to database
  const updateUser = (updates) => {
    const newUser = typeof updates === 'function' ? updates(user) : { ...user, ...updates };
    setUser(newUser);
    saveUserProfile(newUser);
  };

  // Auth functions
  const handleSignUp = async () => {
    setAuthError('');
    setAuthMessage('');
    
    const { data, error } = await supabase.auth.signUp({
      email: authEmail,
      password: authPassword,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setAuthMessage('Check your email to confirm your account!');
      setAuthMode('login');
    }
  };

  const handleLogin = async () => {
    setAuthError('');
    setAuthMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });

    if (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser({ type: '', state: '', otherState: '', stage: '', name: '', startDate: null, tasks: {}, moods: [], journal: [] });
    setScreen('welcome');
    setTab('home');
  };

  // Derived state
  const stages = STAGES[user.type] || [];
  const si = stages.findIndex(s => s.id === user.stage);
  const cur = stages[si];
  const pct = stages.length > 1 ? (si / (stages.length - 1)) * 100 : 0;
  const days = user.startDate ? Math.floor((Date.now() - user.startDate) / 86400000) : 0;
  const dailyGuide = DAILY_GUIDE[user.type]?.[cur?.id];

  useEffect(() => {
    if (cur && !user.tasks[cur.id]) {
      const newTasks = { ...user.tasks, [cur.id]: cur.tasks.map((t, i) => ({ id: i, text: t, done: false })) };
      setUser(u => ({ ...u, tasks: newTasks }));
    }
  }, [cur]);

  const tasks = user.tasks[cur?.id] || [];
  const done = tasks.filter(t => t.done).length;
  
  const toggle = id => {
    const newTasks = { ...user.tasks, [cur.id]: user.tasks[cur.id].map(t => t.id === id ? { ...t, done: !t.done } : t) };
    updateUser({ tasks: newTasks });
  };
  
  const logMood = m => { 
    updateUser({ moods: [...user.moods, { date: Date.now(), mood: m }] }); 
    setModal(null); 
  };
  
  const saveJ = () => { 
    if (journalText.trim()) { 
      updateUser({ journal: [...user.journal, { date: Date.now(), text: journalText }] }); 
      setJournalText(''); 
      setModal(null); 
    } 
  };
  
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

  // Styles
  const base = { minHeight: '100vh', background: BG, fontFamily: "'SF Pro Display',-apple-system,sans-serif", color: C.text, position: 'relative', overflow: 'hidden' };
  const page = { ...base, padding: 20, paddingBottom: screen === 'app' ? 110 : 20 };
  const container = { maxWidth: 420, margin: '0 auto', position: 'relative', zIndex: 1 };

  const closeModal = () => { setModal(null); setModalData(null); };

  // Modal wrapper
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

  // Nav component
  const Nav = () => (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '12px 20px 28px' }}>
      <div style={{
        maxWidth: 420, margin: '0 auto',
        background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        borderRadius: 24, border: '1px solid rgba(255,255,255,0.8)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        display: 'flex', justifyContent: 'space-around', padding: '12px 8px',
      }}>
        {[
          { id: 'home', icon: Icons.home, label: 'Home' },
          { id: 'learn', icon: Icons.learn, label: 'Learn' },
          { id: 'support', icon: Icons.support, label: 'Support' },
          { id: 'profile', icon: Icons.profile, label: 'Profile' },
        ].map(n => (
          <div key={n.id} onClick={() => setTab(n.id)} style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer',
            padding: '8px 16px', borderRadius: 16,
            background: tab === n.id ? C.accentLight : 'transparent',
            transition: 'all 0.2s'
          }}>
            {n.icon(tab === n.id)}
            <span style={{ fontSize: 11, fontWeight: 500, color: tab === n.id ? C.accent : C.textMuted }}>{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // AUTH SCREEN
  // ═══════════════════════════════════════════════════════════════
  if (authLoading) {
    return (
      <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          {Icons.logo()}
          <p style={{ marginTop: 20, color: C.textMuted }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={page}>
        <Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} />
        <Orb size={150} top="60%" left="80%" color="rgba(200,170,255,0.35)" blur={60} />
        <div style={container}>
          <div style={{ textAlign: 'center', paddingTop: 60, marginBottom: 50 }}>
            {Icons.logo()}
            <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 16, marginBottom: 8 }}>
              Gestational<span style={{ color: C.accent }}>.ly</span>
            </h1>
            <p style={{ color: C.textMuted, fontSize: 16 }}>Your surrogacy companion</p>
          </div>

          <Glass intensity="strong" glow style={{ marginBottom: 24, padding: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>

            {authError && (
              <div style={{ background: 'rgba(199,125,110,0.15)', padding: 12, borderRadius: 12, marginBottom: 16 }}>
                <p style={{ color: C.accent, fontSize: 14, margin: 0 }}>{authError}</p>
              </div>
            )}

            {authMessage && (
              <div style={{ background: 'rgba(111,175,122,0.15)', padding: 12, borderRadius: 12, marginBottom: 16 }}>
                <p style={{ color: C.success, fontSize: 14, margin: 0 }}>{authMessage}</p>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                {Icons.email()}
                <span style={{ fontSize: 14, color: C.textMuted }}>Email</span>
              </div>
              <GlassInput
                type="email"
                placeholder="your@email.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                {Icons.lock()}
                <span style={{ fontSize: 14, color: C.textMuted }}>Password</span>
              </div>
              <GlassInput
                type="password"
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />
            </div>

            <GlassButton 
              fullWidth 
              size="large"
              onClick={authMode === 'login' ? handleLogin : handleSignUp}
              disabled={!authEmail || !authPassword}
            >
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </GlassButton>
          </Glass>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: C.textMuted, fontSize: 14 }}>
              {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <span 
                onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); setAuthMessage(''); }}
                style={{ color: C.accent, fontWeight: 600, marginLeft: 8, cursor: 'pointer' }}
              >
                {authMode === 'login' ? 'Sign Up' : 'Sign In'}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // MODALS
  // ═══════════════════════════════════════════════════════════════
  if (modal === 'resource' && modalData) return (
    <Modal title={modalData.title}>
      <GlassPill color={C.accent}>{modalData.cat}</GlassPill>
      <p style={{ color: C.textMuted, margin: '10px 0 24px', fontSize: 14 }}>{modalData.time} read</p>
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
        <Glass intensity="strong" style={{ marginBottom: 16, padding: 0 }}>
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="What's on your mind?"
            autoFocus
            style={{
              width: '100%', minHeight: 140, padding: 16, border: 'none',
              background: 'transparent', fontSize: 16, outline: 'none',
              resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box'
            }}
          />
        </Glass>
        <GlassButton onClick={saveJ} fullWidth disabled={!journalText.trim()}>Save Entry</GlassButton>
        
        {user.journal.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Previous Entries</h3>
            {[...user.journal].reverse().slice(0, 5).map((j, i) => (
              <Glass key={i} intensity="normal" style={{ marginBottom: 12, padding: 16 }}>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>
                  {new Date(j.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>{j.text}</p>
              </Glass>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (modal === 'calculator') return (
    <Modal title="Compensation Calculator">
      <p style={{ color: C.textMuted, marginBottom: 24 }}>Estimate your total compensation</p>
      <Glass intensity="strong" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 14, color: C.textMuted }}>Base Compensation</label>
          <div style={{ fontSize: 24, fontWeight: 600 }}>${calc.base.toLocaleString()}</div>
          <input type="range" min="35000" max="80000" step="1000" value={calc.base}
            onChange={e => setCalc(c => ({ ...c, base: +e.target.value }))}
            style={{ width: '100%', marginTop: 8 }} />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[['csection', 'C-Section', '+$3,500'], ['twins', 'Twins', '+$7,500']].map(([k, l, v]) => (
            <Glass key={k} onClick={() => setCalc(c => ({ ...c, [k]: !c[k] }))} 
              variant={calc[k] ? 'accent' : 'default'} intensity="normal" 
              style={{ padding: 12, flex: '1 1 45%' }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{l}</div>
              <div style={{ fontSize: 13, color: C.textMuted }}>{v}</div>
            </Glass>
          ))}
        </div>
      </Glass>
      <Glass intensity="strong" variant="accent" glow>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: C.textMuted }}>Estimated Total</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: C.accent }}>${calcTotal().toLocaleString()}</div>
        </div>
      </Glass>
    </Modal>
  );

  if (modal === 'timeline') return (
    <Modal title="Your Timeline">
      <p style={{ color: C.textMuted, marginBottom: 24 }}>Estimated dates based on your start</p>
      {timeline().map((s, i) => (
        <div key={s.id} style={{ display: 'flex', marginBottom: 16 }}>
          <div style={{ width: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
            <div style={{ 
              width: 12, height: 12, borderRadius: 6, 
              background: s.status === 'done' ? C.success : s.status === 'current' ? C.accent : C.textLight,
            }} />
            {i < timeline().length - 1 && <div style={{ width: 2, flex: 1, background: C.textLight, marginTop: 4 }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</span>
              {s.status === 'current' && <GlassPill color={C.accent}>Now</GlassPill>}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>
              {s.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {s.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );

  if (modal === 'ai') {
    const questions = user.type === 'gc' 
      ? [`What are the surrogacy laws in ${user.state}?`, 'How much can I earn as a carrier?', 'What are the medical requirements?']
      : [`What are the surrogacy laws in ${user.state}?`, 'How much does surrogacy cost total?', 'How do I find a carrier?'];
    
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,252,250,0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', zIndex: 100, overflowY: 'auto', padding: 20 }}>
        <div style={container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Ask Me Anything</h2>
            <Glass onClick={closeModal} intensity="subtle" style={{ padding: 8, borderRadius: 12, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.close()}</Glass>
          </div>
          
          <p style={{ color: C.textMuted, marginBottom: 20, fontSize: 14 }}>
            I know you're {user.type === 'gc' ? 'a gestational carrier' : 'an intended parent'} in {user.state}. Ask me anything!
          </p>
          
          <Glass intensity="strong" style={{ marginBottom: 16, padding: 0 }}>
            <input
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askAi()}
              placeholder="Type your question..."
              autoFocus
              style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 16, outline: 'none', boxSizing: 'border-box' }}
            />
          </Glass>
          <GlassButton onClick={askAi} fullWidth disabled={!aiQuery.trim()}>Ask</GlassButton>
          
          {aiResponse && (
            <Glass intensity="strong" style={{ marginTop: 20 }}>
              <pre style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{aiResponse}</pre>
            </Glass>
          )}
          
          {!aiResponse && (
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>Try asking:</p>
              {questions.map((q, i) => (
                <Glass key={i} onClick={() => { setAiQuery(q); }} intensity="normal" style={{ marginBottom: 8, padding: 12 }}>
                  <span style={{ fontSize: 14 }}>{q}</span>
                </Glass>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // DAILY GUIDE POPUP
  // ═══════════════════════════════════════════════════════════════
  if (screen === 'app' && showDailyGuide && dailyGuide) {
    return (
      <div style={page}>
        <Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} />
        <div style={container}>
          <Glass intensity="strong" glow style={{ marginTop: 60, padding: 28 }}>
            <div style={{ 
              background: `linear-gradient(135deg, ${C.accent}, #9070a0)`,
              borderRadius: 16, padding: 20, marginBottom: 24, color: 'white', textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, opacity: 0.9 }}>Day {days} • {cur?.name}</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '8px 0' }}>Welcome back, {user.name}</h2>
            </div>
            
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{dailyGuide.title}</h3>
            <p style={{ color: C.textMuted, marginBottom: 24, lineHeight: 1.6 }}>{dailyGuide.message}</p>
            
            <Glass intensity="normal" variant="accent" style={{ marginBottom: 24, padding: 16 }}>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>YOUR FIRST STEP TODAY</div>
              <div style={{ fontWeight: 600 }}>{dailyGuide.step}</div>
            </Glass>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <GlassButton variant="secondary" onClick={() => setShowDailyGuide(false)} style={{ flex: 1 }}>
                Explore on my own
              </GlassButton>
              <GlassButton onClick={() => { setShowDailyGuide(false); setModal('resource'); setModalData(RESOURCES[dailyGuide.resource]); }} style={{ flex: 1 }}>
                Let's go
              </GlassButton>
            </div>
          </Glass>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ONBOARDING
  // ═══════════════════════════════════════════════════════════════
  if (screen === 'welcome') return (
    <div style={page}>
      <Orb size={200} top="-50px" left="-30px" color="rgba(255,180,150,0.4)" blur={70} />
      <Orb size={150} top="60%" left="80%" color="rgba(200,170,255,0.35)" blur={60} />
      <div style={{ ...container, textAlign: 'center', paddingTop: 80 }}>
        {Icons.logo()}
        <h1 style={{ fontSize: 36, fontWeight: 700, marginTop: 20, marginBottom: 10 }}>
          Gestational<span style={{ color: C.accent }}>.ly</span>
        </h1>
        <p style={{ color: C.textMuted, marginBottom: 50, fontSize: 17 }}>Your surrogacy companion</p>
        <Glass intensity="strong" glow style={{ padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.textMuted, marginBottom: 20 }}>WHAT YOU'LL GET</h3>
          {['Stage-by-stage guidance', 'Support for hard moments', 'Budget & compensation tools', 'Journal & mood tracking'].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, textAlign: 'left' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icons.heart()}
              </div>
              <span style={{ fontSize: 15 }}>{f}</span>
            </div>
          ))}
        </Glass>
        <GlassButton onClick={() => setScreen('onboard')} fullWidth size="large">Begin Your Journey</GlassButton>
        <p style={{ marginTop: 20, fontSize: 12, color: C.textLight }}>For educational purposes only</p>
      </div>
    </div>
  );

  if (screen === 'onboard') {
    const steps = [
      // Type
      <div key="t">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>I am a...</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>This helps us personalize your journey</p>
        </Glass>
        {[['gc', 'Gestational Carrier', 'Carrying for intended parents'], ['ip', 'Intended Parent', 'Building my family']].map(([k, l, d]) => (
          <Glass key={k} onClick={() => setUser(u => ({ ...u, type: k }))} variant={user.type === k ? 'accent' : 'default'} glow={user.type === k} intensity="normal" style={{ marginBottom: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><div style={{ fontWeight: 600, fontSize: 17 }}>{l}</div><div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{d}</div></div>
              {user.type === k && <div style={{ width: 24, height: 24, borderRadius: 12, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icons.check()}</div>}
            </div>
          </Glass>
        ))}
        <GlassButton onClick={() => setStep(1)} disabled={!user.type} fullWidth style={{ marginTop: 24 }}>Continue</GlassButton>
      </div>,
      // State
      <div key="s">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>Your State</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>Laws vary significantly by location</p>
        </Glass>
        <Glass intensity="strong" style={{ marginBottom: 24, padding: 0 }}>
          <select value={user.state} onChange={e => setUser(u => ({ ...u, state: e.target.value }))}
            style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 17, outline: 'none' }}>
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
      <div key="os">
        <Glass intensity="strong" glow style={{ textAlign: 'center', padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6 }}>{user.type === 'gc' ? "IPs' State" : "Carrier's State"}</h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>If known, otherwise select "Don't know yet"</p>
        </Glass>
        <Glass intensity="strong" style={{ marginBottom: 24, padding: 0 }}>
          <select value={user.otherState} onChange={e => setUser(u => ({ ...u, otherState: e.target.value }))}
            style={{ width: '100%', padding: 16, border: 'none', background: 'transparent', fontSize: 17, outline: 'none' }}>
            <option value="">Select state</option>
            <option value="unknown">Don't know yet</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
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
          <GlassButton onClick={() => { 
            const finalUser = { ...user, startDate: Date.now() };
            setUser(finalUser);
            saveUserProfile(finalUser);
            setStep(5); 
          }} disabled={!user.name.trim()} style={{ flex: 2 }}>Continue</GlassButton>
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
      </div>
    ];
    return (
      <div style={page}>
        <Orb size={180} top="-40px" left="-20px" color="rgba(255,180,150,0.35)" blur={60} />
        <Orb size={120} top="70%" left="85%" color="rgba(200,170,255,0.3)" blur={50} />
        <div style={container}>{steps[step]}</div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // HOME TAB
  // ═══════════════════════════════════════════════════════════════
  if (tab === 'home') return (
    <div style={page}>
      <Orb size={150} top="5%" left="75%" color="rgba(255,180,150,0.35)" blur={55} />
      <Orb size={100} top="40%" left="-10%" color="rgba(200,170,255,0.3)" blur={45} />
      <div style={container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 14, color: C.textMuted }}>Day {days}</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Hi, {user.name}</h1>
          </div>
          <GlassProgress value={pct} />
        </div>

        {/* AI Bar */}
        <Glass onClick={() => setModal('ai')} intensity="normal" style={{ marginBottom: 20, padding: 14, background: 'rgba(128,112,160,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {Icons.ai()}
            <span style={{ color: C.textMuted, fontSize: 15 }}>Ask me anything...</span>
          </div>
        </Glass>

        {/* Current Stage */}
        <Glass intensity="strong" glow style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <GlassPill color={C.accent}>{cur?.name}</GlassPill>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 10 }}>{cur?.duration}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{done}/{tasks.length}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>tasks done</div>
            </div>
          </div>
          <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3 }}>
            <div style={{ height: '100%', width: `${tasks.length ? (done/tasks.length)*100 : 0}%`, background: `linear-gradient(90deg, ${C.accent}, #9070a0)`, borderRadius: 3, transition: 'width 0.5s' }} />
          </div>
        </Glass>

        {/* Tasks */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted }}>TASKS</span>
          </div>
          <Glass intensity="strong" style={{ padding: 16 }}>
            {tasks.map((t, i) => (
              <div key={t.id} style={{ marginBottom: i < tasks.length - 1 ? 14 : 0 }}>
                <div onClick={() => toggle(t.id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginRight: 12, border: `2px solid ${t.done ? C.success : C.textLight}`, background: t.done ? C.success : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {t.done && Icons.check()}
                  </div>
                  <span style={{ fontSize: 15, color: t.done ? C.textLight : C.text, textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
                </div>
              </div>
            ))}
          </Glass>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Glass onClick={() => setModal('mood')} intensity="normal" style={{ padding: 16, textAlign: 'center' }}>
            {Icons.heart()}
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>Log Mood</div>
          </Glass>
          <Glass onClick={() => setModal('journal')} intensity="normal" style={{ padding: 16, textAlign: 'center' }}>
            {Icons.journal()}
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>Journal</div>
          </Glass>
        </div>

        {saving && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span style={{ fontSize: 12, color: C.textMuted }}>Saving...</span>
          </div>
        )}
      </div>
      <Nav />
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // LEARN TAB
  // ═══════════════════════════════════════════════════════════════
  if (tab === 'learn') {
    const cats = [
      { k: 'Medical', icon: Icons.medical, items: ['screening', 'medications', 'transfer'] },
      { k: 'Legal', icon: Icons.legal, items: ['contract', 'escrow', 'attorneys', 'parentage'] },
      { k: 'Financial', icon: Icons.financial, items: ['compensation', 'budget'] },
      { k: 'Wellness', icon: Icons.wellness, items: ['relationship', 'therapists'] },
    ];
    return (
      <div style={page}>
        <Orb size={180} top="-40px" left="-20px" color="rgba(255,180,150,0.3)" blur={60} />
        <div style={container}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Learn</h1>
          <p style={{ color: C.textMuted, marginBottom: 24, fontSize: 15 }}>Guides for your journey</p>
          
          <Glass onClick={() => setModal('ai')} intensity="normal" style={{ marginBottom: 28, padding: 14, background: 'rgba(128,112,160,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {Icons.ai()}
              <span style={{ color: C.textMuted, fontSize: 15 }}>Ask me anything...</span>
            </div>
          </Glass>

          {cats.map(c => (
            <div key={c.k} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                {c.icon()}
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, textTransform: 'uppercase' }}>{c.k}</span>
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
        </div>
        <Nav />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // SUPPORT TAB
  // ═══════════════════════════════════════════════════════════════
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
            { icon: Icons.ai, l: 'Ask AI', d: 'Questions', a: () => setModal('ai') },
          ].map((x, i) => (
            <Glass key={i} onClick={x.a} intensity="normal" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ marginBottom: 10 }}>{x.icon()}</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{x.l}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{x.d}</div>
            </Glass>
          ))}
        </div>

        {/* Recent Moods */}
        {user.moods.length > 0 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Recent Moods</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {user.moods.slice(-7).map((m, i) => {
                const mood = MOODS.find(x => x.label === m.mood);
                return (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: 18, background: mood?.color || C.textLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 10, color: 'white', fontWeight: 600 }}>{new Date(m.date).getDate()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Nav />
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // PROFILE TAB
  // ═══════════════════════════════════════════════════════════════
  if (tab === 'profile') return (
    <div style={page}>
      <Orb size={140} top="5%" left="-10%" color="rgba(255,180,150,0.3)" blur={50} />
      <div style={container}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 28 }}>Profile</h1>
        
        <Glass intensity="strong" style={{ marginBottom: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: 40, background: `linear-gradient(135deg, ${C.accent}, #9070a0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 32, color: 'white', fontWeight: 600 }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>{user.name}</h2>
            <p style={{ color: C.textMuted, margin: '4px 0 0' }}>{session?.user?.email}</p>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 20 }}>
            {[
              ['Role', user.type === 'gc' ? 'Gestational Carrier' : 'Intended Parent'],
              ['Location', user.state],
              ['Stage', cur?.name],
              ['Journey Day', days],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: C.textMuted }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </Glass>

        <Glass intensity="strong" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Journey Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.accent }}>{Object.values(user.tasks).flat().filter(t => t.done).length}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Tasks Done</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.success }}>{user.moods.length}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Moods Logged</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.warning }}>{user.journal.length}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Journal Entries</div>
            </div>
          </div>
        </Glass>

        <Glass onClick={handleLogout} intensity="normal" style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: C.accent }}>
            {Icons.logout()}
            <span style={{ fontWeight: 600 }}>Sign Out</span>
          </div>
        </Glass>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: 12, color: C.textLight }}>Gestational.ly v13</p>
          <p style={{ fontSize: 11, color: C.textLight }}>For educational purposes only</p>
        </div>
      </div>
      <Nav />
    </div>
  );

  return null;
}

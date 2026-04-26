import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const C = {
    bg:          '#fbf7f3',
    surface:     '#fffdfb',
    surface2:    '#f7f3ec',
    border:      '#d9d3cc',
    borderLight: '#e8e4df',
    text:        '#101419',
    muted:       '#5f646a',
    faint:       '#94999e',
    accent:      '#005745',
    accentMid:   '#1b7a66',
    accentLight: '#cdf1e6',
    accentHover: '#004d3a',
};

function HeroButton({ children, onClick, variant = 'primary' }) {
    const [hov, setHov] = React.useState(false);
    const base = {
        display: 'inline-flex', alignItems: 'center', gap: 6,
        borderRadius: 5, fontFamily: 'Inter, sans-serif',
        fontWeight: 500, cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
        letterSpacing: '0.01em', lineHeight: 1,
        fontSize: 13.5, padding: '9px 18px',
    };
    const variants = {
        primary: {
            background: hov ? '#e2f3ee' : '#fff',
            color: C.accent,
            border: 'none',
        },
        ghost: {
            background: hov ? '#006752' : 'transparent',
            color: '#fff',
            border: '1px solid #679c8d',
        },
    };
    return (
        <button
            style={{ ...base, ...variants[variant] }}
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
        >
            {children}
        </button>
    );
}

const sections = [
    {
        title: 'Ajaloost',
        body: `Ingrid Rüütel ja Koit Haugas koostasid teadusliku suunitlusega Eesti Rahvamuusika Andmebaasi 1980.–1990. aastatel, mis koondab ligikaudu 9000 kodeeritud regiviisi koos üldandmetega. Nimetatud andmebaas põhines omakorda Herbert Tampere koostatud viisikartoteegil, mis sisaldas ERA kogude koopiaid ning toimis Eesti Kirjandusmuuseumis kaua parima võimaliku rahvaviiside „andmebaasina". Kartoteek sisaldab eeskätt käsikirjalisi viise ja fonograafisalvestuste noodistusi kuni 1975. aastani. Siinne infosüsteem arendab edasi Rüütli ja Haugase rajatud andmebaasi. Hakkasime seda ette valmistama programmi „Eesti keel ja kultuurimälu" raames 2015, siinne netirakendus valmis 2020–2021.`,
    },
    {
        title: 'Teostajad',
        body: `Eesti Kirjandusmuuseumi Eesti Rahvaluule Arhiivi etnomusikoloog Taive Särg (projektijuht), PhD, digiarhivaar Olga Ivaškevitš.\n\nTallinna Tehnikaülikooli IT-osakonna üliõpilased Kristi Seemen, Martin Paroll, Katrin Avloi (2020), Martin Rajur, Annett Lymar, Jaan Susi (2021), nende juhendaja Erkki Eessaar, PhD.`,
    },
    {
        title: 'Täname',
        body: `„Eesti keel ja kultuurimälu" (2015–2018)\n\nKristi Seemen`,
    },
    {
        title: 'Viitamine',
        body: `Viiside avaldamisel trükis või veebis tuleb viidata Eesti Rahvaluule Arhiivile kui allikmaterjali asukohale ja lisada igale laulule arhiiviviide (vähemalt fondiviide, esitaja, koguja).\n\nAndmebaasile viitamine: Eesti rahvaviiside andmebaas. Eesti Kirjandusmuuseumi Eesti Rahvaluule Arhiiv. Tartu, 2021.\n\nKontakt: taive@folklore.ee`,
    },
];

const stats = [
    { n: '~4 000', label: 'kaherealist regiviisi' },
    { n: '~9 000', label: 'kodeeritud regiviisi' },
    { n: '1980–90', label: 'andmebaas alustatud' },
    { n: '2021', label: 'veebis avaldatud' },
];

const quickLinks = [
    { label: 'Sirvi kõiki viise', path: '/viisid' },
    { label: 'Klassifikaatorid', path: '/klassifikaatorid' },
    { label: 'Isikud', path: '/isikud' },
];

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Grid item xs={12} style={{
            background: C.bg,
            color: C.text,
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* Hero */}
            <div style={{
                background: C.accent,
                padding: '56px 32px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }}>
                    {[30, 44, 58, 72, 86].map(y => (
                        <div key={y} style={{ position: 'absolute', left: 0, right: 0, top: `${y}%`, height: 1, background: '#fff' }} />
                    ))}
                    <svg style={{ position: 'absolute', right: 80, top: '15%', opacity: 0.4 }} width="180" height="200" viewBox="0 0 180 200">
                        <ellipse cx="40" cy="160" rx="22" ry="16" fill="#fff" transform="rotate(-20 40 160)" />
                        <line x1="59" y1="156" x2="59" y2="40" stroke="#fff" strokeWidth="4" />
                        <path d="M59 40 Q130 55 110 95" stroke="#fff" strokeWidth="3.5" fill="none" />
                        <ellipse cx="130" cy="145" rx="22" ry="16" fill="#fff" transform="rotate(-20 130 145)" />
                        <line x1="149" y1="141" x2="149" y2="25" stroke="#fff" strokeWidth="4" />
                    </svg>
                </div>
                <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
                    <p style={{
                        fontFamily: 'EB Garamond, serif',
                        fontSize: 13, fontWeight: 400,
                        color: '#b4d7cc',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: 12,
                    }}>
                        Eesti Rahvaviiside Andmebaas
                    </p>
                    <h1 style={{
                        fontFamily: 'EB Garamond, serif',
                        fontSize: 54, fontWeight: 500, lineHeight: 1.1,
                        color: '#fff', letterSpacing: '-0.01em',
                        maxWidth: 680, marginBottom: 20, margin: '0 0 20px',
                    }}>NORA</h1>
                    <p style={{
                        fontSize: 15.5, lineHeight: 1.7,
                        color: '#cbe5dd',
                        maxWidth: 680, marginBottom: 6,
                    }}>
                        Andmebaas vahendab muusikapärimust Eesti Kirjandusmuuseumi Eesti Rahvaluule Arhiivi (ERA) kogudest. Siit leiab eesti rahvalauluviiside üleskirjutused ja helisalvestused ning kodeeritud meloodiad.
                    </p>
                    <p style={{
                        fontSize: 14, lineHeight: 1.7,
                        color: '#b1cbc3',
                        maxWidth: 640, marginBottom: 28,
                    }}>
                        Viise on võimalik vaadata noodistusena, kuulata MIDI-failina ja soovi korral matemaatiliste meetoditega analüüsida. Viisidele juurde on lisatud üldandmed, mõningad muusikalised tunnused ja laulutekstide arhiiviviited.
                    </p>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <HeroButton onClick={() => navigate('/viisid')}>
                            Sirvi viise →
                        </HeroButton>
                        <HeroButton variant="ghost" onClick={() => navigate('/otsing')}>
                            Otsing
                        </HeroButton>
                    </div>
                </div>
            </div>

            {/* Stats strip */}
            <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                <div style={{
                    maxWidth: 1100, margin: '0 auto',
                    padding: '20px 32px',
                    display: 'flex', gap: 48, flexWrap: 'wrap',
                }}>
                    {stats.map(s => (
                        <div key={s.n}>
                            <div style={{
                                fontFamily: 'EB Garamond, serif',
                                fontSize: 26, fontWeight: 500,
                                color: C.accent,
                            }}>{s.n}</div>
                            <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* About sections */}
            <div style={{
                maxWidth: 1100, margin: '0 auto',
                padding: '48px 32px 64px',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 48,
            }}>
                <div>
                    {sections.map((s, i) => (
                        <div
                            key={s.title}
                            style={{
                                marginBottom: 40,
                                paddingBottom: 40,
                                borderBottom: i < sections.length - 1 ? `1px solid ${C.border}` : 'none',
                            }}
                        >
                            <h2 style={{
                                fontFamily: 'EB Garamond, serif',
                                fontSize: 22, fontWeight: 500,
                                color: C.text, marginBottom: 12,
                            }}>{s.title}</h2>
                            {s.body.split('\n\n').map((para, j) => (
                                <p key={j} style={{
                                    fontSize: 14.5, lineHeight: 1.8,
                                    color: j === 0 ? C.text : C.muted,
                                    marginBottom: 10,
                                }}>
                                    {para}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div>
                    <div style={{
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 8,
                        padding: 24,
                        marginBottom: 20,
                    }}>
                        <h3 style={{
                            fontFamily: 'EB Garamond, serif',
                            fontSize: 17, fontWeight: 500,
                            marginBottom: 14,
                        }}>Kiirlingid</h3>
                        {quickLinks.map((l, i) => (
                            <div
                                key={l.label}
                                onClick={() => navigate(l.path)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '10px 0',
                                    borderBottom: i < quickLinks.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                                    cursor: 'pointer',
                                    color: C.accent,
                                    fontSize: 14,
                                }}
                            >
                                {l.label}
                                <span style={{ fontSize: 12, opacity: 0.6 }}>→</span>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        background: C.accentLight,
                        border: '1px solid #acd9cc',
                        borderRadius: 8,
                        padding: 24,
                    }}>
                        <h3 style={{
                            fontFamily: 'EB Garamond, serif',
                            fontSize: 16, fontWeight: 500,
                            color: C.accent,
                            marginBottom: 8,
                        }}>Kontakt</h3>
                        <p style={{
                            fontSize: 13.5,
                            color: C.accent,
                            lineHeight: 1.6,
                        }}>taive@folklore.ee</p>
                    </div>
                </div>
            </div>
        </Grid>
    );
};

export default HomePage;

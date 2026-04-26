import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { tokens as C } from '../../theme';

const LocationHeader = () => {
    const { t } = useTranslation('common');
    const location = useLocation();
    const path = location.pathname.slice(1).split('/').filter(Boolean);

    if (path.length === 0 || ['login', 'otsing'].includes(path[0])) return null;

    const crumbs = [];
    let acc = '';
    let lastTitle = '';

    for (let i = 0; i < path.length; i++) {
        const seg = path[i];
        acc += '/' + seg;
        const isId = !isNaN(parseInt(seg, 10)) || /^[0-9a-fA-F-]{36}$/.test(seg);
        if (isId) {
            crumbs.push({ label: 'ID: ' + seg, to: null });
            lastTitle = 'ID: ' + seg;
        } else if (seg === 'uus') {
            crumbs.push({ label: t('location.uus'), to: null });
            lastTitle = t('location.uus');
        } else {
            const label = t('location.' + seg, { defaultValue: seg });
            const isLast = i === path.length - 1;
            crumbs.push({ label, to: isLast ? null : acc });
            lastTitle = label;
        }
    }

    return (
        <div style={{
            width: '100%',
            maxWidth: 1160,
            margin: '0 auto',
            padding: '40px 32px 0',
        }}>
            {crumbs.length > 1 && (
                <nav aria-label="breadcrumb" style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>
                    {crumbs.slice(0, -1).map((c, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <span style={{ margin: '0 8px', color: C.faint }}>›</span>}
                            {c.to ? (
                                <Link to={c.to} style={{ color: C.accent, textDecoration: 'none' }}>{c.label}</Link>
                            ) : (
                                <span>{c.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            )}
            <h1 style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 38,
                fontWeight: 500,
                color: C.text,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                margin: 0,
                paddingBottom: 24,
                borderBottom: `1px solid ${C.border}`,
            }}>
                {lastTitle}
            </h1>
        </div>
    );
};

export default LocationHeader;

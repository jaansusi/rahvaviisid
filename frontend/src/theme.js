import { createTheme } from '@mui/material/styles';

export const tokens = {
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
    danger:      '#a03f40',
    dangerLight: '#ffe1df',
};

const noraTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: tokens.accent,
            dark: tokens.accentHover,
            light: tokens.accentLight,
            contrastText: '#ffffff',
        },
        secondary: {
            main: tokens.accentMid,
        },
        error: {
            main: tokens.danger,
            light: tokens.dangerLight,
        },
        background: {
            default: tokens.bg,
            paper: tokens.surface,
        },
        text: {
            primary: tokens.text,
            secondary: tokens.muted,
            disabled: tokens.faint,
        },
        divider: tokens.border,
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontSize: 14,
        h1: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 500, letterSpacing: '-0.01em' },
        h2: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 500, letterSpacing: '-0.01em' },
        h3: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 500 },
        h4: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 500, fontSize: 32 },
        h5: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 500 },
        h6: { fontFamily: "'EB Garamond', Georgia, serif", fontWeight: 500 },
        button: {
            textTransform: 'none',
            fontWeight: 500,
            letterSpacing: '0.01em',
        },
    },
    shape: {
        borderRadius: 5,
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 5,
                    padding: '7px 16px',
                    boxShadow: 'none',
                },
                outlinedPrimary: {
                    borderColor: tokens.accent,
                    color: tokens.accent,
                    '&:hover': {
                        background: tokens.accentLight,
                        borderColor: tokens.accent,
                    },
                },
                containedPrimary: {
                    background: tokens.accent,
                    color: '#fff',
                    '&:hover': {
                        background: tokens.accentHover,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 5,
                    backgroundColor: tokens.surface,
                    '& fieldset': {
                        borderColor: tokens.border,
                    },
                    '&:hover fieldset': {
                        borderColor: tokens.accentMid,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: tokens.accent,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: tokens.muted,
                    '&.Mui-focused': { color: tokens.accent },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: tokens.surface,
                },
                outlined: {
                    borderColor: tokens.border,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: { borderColor: tokens.border },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: 13.5,
                    '&:hover': { background: tokens.surface2 },
                    '&.Mui-selected': {
                        background: tokens.accentLight,
                        color: tokens.accent,
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    color: tokens.muted,
                    '&.Mui-selected': { color: tokens.accent },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: { backgroundColor: tokens.accent },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: tokens.border,
                    '&.Mui-checked': { color: tokens.accent },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: tokens.border,
                    '&.Mui-checked': { color: tokens.accent },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: `1px solid ${tokens.border}`,
                    borderRadius: 8,
                    backgroundColor: tokens.surface,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13.5,
                    '--DataGrid-rowBorderColor': tokens.borderLight,
                    '--DataGrid-containerBackground': tokens.surface,
                },
                columnHeaders: {
                    backgroundColor: tokens.surface,
                    borderBottom: `2px solid ${tokens.border}`,
                },
                columnHeader: {
                    backgroundColor: tokens.surface,
                },
                columnHeaderTitle: {
                    fontSize: 11,
                    fontWeight: 600,
                    color: tokens.faint,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                },
                cell: {
                    borderBottom: `1px solid ${tokens.borderLight}`,
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: 15,
                    color: tokens.text,
                    '&:focus, &:focus-within': { outline: 'none' },
                },
                row: {
                    '&:hover': { backgroundColor: '#f9f2e9' },
                },
                footerContainer: {
                    borderTop: `1px solid ${tokens.border}`,
                    backgroundColor: tokens.surface,
                },
                columnSeparator: { display: 'none' },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: tokens.surface,
                    color: tokens.text,
                    boxShadow: 'none',
                    borderBottom: `1px solid ${tokens.border}`,
                },
            },
        },
    },
});

export default noraTheme;

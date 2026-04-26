import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '50vh' }}>
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            {this.props.fallbackTitle || 'Something went wrong'}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {this.props.fallbackMessage || 'An unexpected error occurred. Please try refreshing the page.'}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => window.location.reload()}
                        >
                            Refresh
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

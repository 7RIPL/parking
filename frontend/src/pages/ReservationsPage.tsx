import React from 'react';
import ReservationHistory from '../components/ReservationHistory';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReservationsPage: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleAuthAction = () => {
        if (isAuthenticated) {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h4">Мои бронирования</Typography>
                <Button variant="outlined" color="error" onClick={handleAuthAction}>
                    {isAuthenticated ? 'Выйти' : 'Войти'}
                </Button>
            </Box>
            <Button
                variant="contained"
                onClick={() => navigate('/parking-spots')}
                sx={{ mb: 2 }}
            >
                К парковочным местам
            </Button>
            <ReservationHistory />
        </Container>
    );
};

export default ReservationsPage;

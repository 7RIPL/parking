import React from 'react';
import ReservationHistory from '../components/ReservationHistory';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReservationsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Мои бронирования
            </Typography>
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
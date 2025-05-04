import React from 'react';
import ParkingSpotTable from '../components/ParkingSpotTable';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ParkingSpotsPage: React.FC = () => {
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
                <Typography variant="h4">Парковочные места</Typography>
                <Button variant="outlined" color="error" onClick={handleAuthAction}>
                    {isAuthenticated ? 'Выйти' : 'Войти'}
                </Button>
            </Box>
            <Button
                variant="contained"
                onClick={() => navigate('/reservations')}
                sx={{ mb: 2 }}
            >
                Мои бронирования
            </Button>
            <ParkingSpotTable />
        </Container>
    );
};

export default ParkingSpotsPage;

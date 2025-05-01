import React from 'react';
import ParkingSpotTable from '../components/ParkingSpotTable';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ParkingSpotsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Парковочные места
            </Typography>
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
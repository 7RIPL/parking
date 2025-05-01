import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Container } from '@mui/material';
import { getParkingSpots } from '../services/parking-spots';
import { ParkingSpot } from '../types';
import ReservationDialog from './ReservationDialog';

const ParkingSpotTable: React.FC = () => {
    const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
    const [search, setSearch] = useState('');
    const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const spots = await getParkingSpots();
                setParkingSpots(spots);
            } catch (err) {
                console.error('Ошибка загрузки парковочных мест:', err);
            }
        };
        fetchSpots();
    }, []);

    const handleReservationCreated = () => {
        // Отправляем событие для обновления бронирований в ReservationHistory
        window.dispatchEvent(new Event('reservationUpdated'));
        setSelectedSpot(null); // Закрываем диалог
    };

    const filteredSpots = parkingSpots.filter(spot =>
        spot.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container sx={{ mt: 4 }}>
            <TextField
                label="Поиск по локации"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Локация</TableCell>
                        <TableCell>Действие</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredSpots.map(spot => (
                        <TableRow key={spot.id}>
                            <TableCell>{spot.id}</TableCell>
                            <TableCell>{spot.location}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => setSelectedSpot(spot)}
                                >
                                    Забронировать
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedSpot && (
                <ReservationDialog
                    parkingSpot={selectedSpot}
                    onClose={() => setSelectedSpot(null)}
                    onReservationCreated={handleReservationCreated}
                />
            )}
        </Container>
    );
};

export default ParkingSpotTable;
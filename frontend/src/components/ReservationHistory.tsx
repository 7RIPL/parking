import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography } from '@mui/material';
import { getReservations, cancelReservation } from '../services/reservations';
import { Reservation } from '../types';
import { format } from 'date-fns';

const ReservationHistory: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const fetchReservations = async () => {
        try {
            const data = await getReservations();
            setReservations(data);
        } catch (err) {
            console.error('Ошибка загрузки бронирований:', err);
        }
    };

    useEffect(() => {
        fetchReservations();

        const handleReservationUpdated = () => {
            fetchReservations();
        };

        window.addEventListener('reservationUpdated', handleReservationUpdated);

        return () => {
            window.removeEventListener('reservationUpdated', handleReservationUpdated);
        };
    }, []);

    const handleCancel = async (reservationId: number) => {
        try {
            await cancelReservation(reservationId);
            await fetchReservations();
        } catch (err) {
            console.error('Ошибка отмены бронирования:', err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Мои бронирования
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Место</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell>Время</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell>Действие</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map(res => (
                        <TableRow key={res.id}>
                            <TableCell>{res.parkingSpot.location}</TableCell>
                            <TableCell>{format(new Date(res.reserved_date), 'dd.MM.yyyy')}</TableCell>
                            <TableCell>{res.reserved_time}</TableCell>
                            <TableCell>{res.status === 'booked' ? 'Забронировано' : 'Отменено'}</TableCell>
                            <TableCell>
                                {res.canCancel && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleCancel(res.id)}
                                    >
                                        Отменить
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default ReservationHistory;
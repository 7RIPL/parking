import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    TextField, MenuItem, Select, InputLabel, FormControl, Typography
} from '@mui/material';
import { format, isValid } from 'date-fns';
import { ParkingSpot } from '../types';
import { getAvailableTimes } from '../services/parking-spots';
import { createReservation } from '../services/reservations';

interface ReservationDialogProps {
    parkingSpot: ParkingSpot;
    onClose: () => void;
    onReservationCreated?: () => void;
}

const ReservationDialog: React.FC<ReservationDialogProps> = ({ parkingSpot, onClose, onReservationCreated }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedDate && isValid(selectedDate)) {
            const fetchTimes = async () => {
                try {
                    const dateString = format(selectedDate, 'yyyy-MM-dd');
                    const times = await getAvailableTimes(parkingSpot.id, dateString);
                    setAvailableTimes(times);
                    setSelectedTime('');
                } catch (err) {
                    setError('Ошибка загрузки временных слотов');
                }
            };
            fetchTimes();
        } else {
            setAvailableTimes([]);
            setSelectedTime('');
        }
    }, [selectedDate, parkingSpot.id]);

    const handleSubmit = async () => {
        if (!selectedDate || !isValid(selectedDate)) {
            setError('Выберите корректную дату');
            return;
        }
        if (!selectedTime) {
            setError('Выберите время');
            return;
        }

        try {
            const [h, m = '00'] = selectedTime.split(':');
            const formattedTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;

            await createReservation({
                parkingSpotId: parkingSpot.id,
                reserved_date: format(selectedDate, 'yyyy-MM-dd'),
                reserved_time: formattedTime,
            });
            if (onReservationCreated) {
                onReservationCreated();
            }
            onClose();
        } catch (err) {
            setError('Ошибка при бронировании');
        }
    };

    const shouldDisableDate = (date: Date) => {
        const now = new Date();
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Запретить даты до сегодняшнего дня
        if (dateOnly < today) return true;

        // Запретить сегодня, если уже слишком поздно (например, после 23:00)
        if (dateOnly.getTime() === today.getTime() && now.getHours() >= 23) {
            return true;
        }

        return false;
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Бронирование места: {parkingSpot.location}</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Дата"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        const newDate = value ? new Date(value) : null;
                        if (newDate && !shouldDisableDate(newDate)) {
                            setSelectedDate(newDate);
                            setError('');
                        } else {
                            setSelectedDate(null);
                        }
                    }}
                    inputProps={{
                        min: format(new Date(), 'yyyy-MM-dd'),
                    }}
                />
                {selectedDate && availableTimes.length > 0 && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Время</InputLabel>
                        <Select
                            value={selectedTime}
                            onChange={(e) => {
                                setSelectedTime(e.target.value as string);
                                setError('');
                            }}
                            label="Время"
                        >
                            {availableTimes.map(time => (
                                <MenuItem key={time} value={time}>{time}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                {selectedDate && availableTimes.length === 0 && (
                    <Typography>Нет доступных временных слотов</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} disabled={!selectedTime} variant="contained">
                    Забронировать
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReservationDialog;

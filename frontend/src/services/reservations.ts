import axios from 'axios';
import { Reservation } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const createReservation = async (data: {
    parkingSpotId: number;
    reserved_date: string;
    reserved_time: string;
}) => {
    const response = await axios.post(`${API_URL}/reservations`, data, getAuthHeader());
    return response.data;
};

export const getReservations = async (): Promise<Reservation[]> => {
    const response = await axios.get(`${API_URL}/reservations`, getAuthHeader());
    return response.data;
};

export const cancelReservation = async (reservationId: number) => {
    const response = await axios.delete(`${API_URL}/reservations/${reservationId}`, getAuthHeader());
    return response.data;
};
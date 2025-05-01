import axios from 'axios';
import { ParkingSpot } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getParkingSpots = async (): Promise<ParkingSpot[]> => {
    const response = await axios.get(`${API_URL}/parking-spots`, getAuthHeader());
    return response.data;
};

export const getAvailableTimes = async (parkingSpotId: number, date: string): Promise<string[]> => {
    const response = await axios.get(
        `${API_URL}/parking-spots/${parkingSpotId}/available-times?date=${date}`,
        getAuthHeader(),
    );
    return response.data;
};
// src/services/vehicle.service.js
import api from '../../utils/api.js';

export const addVehicle = async (vehicleData) => {
    const response = await api.post('/vehicles.json', vehicleData);
    return response.data;
};

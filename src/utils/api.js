import axios from 'axios';

const api = axios.create({
    baseURL: 'https://raw.githubusercontent.com/1ASI0730-2510-4381-G5-RENT2GO/rent2go-fake-api/main/db.json',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

// components/ReservationManagement.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Reservation } from '../interfaces/reservation.interface';
import ReservationTable from './ReservationTable';


const ReservationManagement: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/reservations');
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:8080/reservations/${id}`);
            console.log(response.data);
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    }

    return (
        <div>
            <ReservationTable reservations={reservations}  onAdd={function (reservation: Reservation): void {
                throw new Error('Function not implemented.');
            }} onUpdate={function (reservation: Reservation): void {
                throw new Error('Function not implemented.');
            }} onDelete={handleDelete} />
        </div>
    );
};

export default ReservationManagement;

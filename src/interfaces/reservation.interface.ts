export interface Reservation {
    id: number;
    firstName: string;
    email: string;
    phone: string;
}

export interface ReservationTableProps {
    reservations: Reservation[];
    onAdd: (reservation: Reservation) => void;
    onUpdate: (reservation: Reservation) => void;
    onDelete: (id: number) => void;
}

export interface ReservationModalProps {
    reservation: Reservation | null;
    isOpen: boolean;
    onClose: () => void;
}
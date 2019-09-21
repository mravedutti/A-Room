export interface Room {
    id?: string;
    title?: string;
    description?: string;
    address?: string;
    photoURL?: Array<string>;
    price?: number;
    createdAt?: number;
    userId?: string;
    reservations?: Array<string>;
}

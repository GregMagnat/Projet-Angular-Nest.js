export interface Reservation {
  id?: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  date: string;
  hour_start: string;
  hour_end: string;
  categoryId: number;
  createdAt?: string;
}

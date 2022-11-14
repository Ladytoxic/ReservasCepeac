export default interface Reserva {
    id?: string;
    nombre: string;
    email: string;
    telefono?: number;
    cantidad: number;
    fechaCreacion: Date;
}
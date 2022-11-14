import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Reserva from '../Interface/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  // Agregar reserva
  agregarReserva(reserva: Reserva) {
    const Ref = collection(this.firestore, 'CePEAC');
    return addDoc(Ref, reserva);
  }
  // Obtener Reservas
  obtenerReservas(): Observable<Reserva[]> {
    const Ref = collection(this.firestore, 'CePEAC');
    return collectionData(Ref, { idField: 'id' }) as Observable<Reserva[]>;
  }
  // Borrar Reserva
  borrarReserva(reserva:Reserva) {
    const Ref = doc(this.firestore, `CePEAC/${reserva.id}`);
    return deleteDoc(Ref);
  }
  // Obtener por ID 
  obtenerReserva(id: string) {
    const Ref = doc(this.firestore, `CePEAC/${id}`);
    return docData(Ref, { idField: 'id' });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private ReservationCollection: AngularFirestoreCollection<Reservation>;

  constructor(private afs: AngularFirestore) {
    this.ReservationCollection = this.afs.collection<Reservation>('Reservation');
  }

  addReservation(reservation: Reservation) {
    this.ReservationCollection.add(reservation).then(docRef => {
      console.log("Document written with ID: ", docRef.id)
      return docRef;
      //console.log("You can now also access .this as expected: ", this.foo)
  })
  .catch(error => console.error("Error adding document: ", error))
  }

  foo(arg0: string, foo: any) {
    throw new Error("Method not implemented.");
  }

  getReservation(id: string) {
    return this.ReservationCollection.doc<Reservation>(id).valueChanges();
  }

  deleteReservation(id: string) {
    return this.ReservationCollection.doc(id).delete;
  }

}
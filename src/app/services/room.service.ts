import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Room } from '../interfaces/room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private RoomsCollection: AngularFirestoreCollection<Room>;


  constructor(private afs: AngularFirestore) {
    this.RoomsCollection = this.afs.collection<Room>('Rooms');
   }

  getRooms() {
    return this.RoomsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addRoom(room: Room) {
    return this.RoomsCollection.add(room);
  }

  getRoom(id: string) {
    return this.RoomsCollection.doc<Room>(id).valueChanges();
  }

  updateRoom(id: string, room: Room) {
    return this.RoomsCollection.doc<Room>(id).update(room);
  }

  deleteRoom(id: string) {
    return this.RoomsCollection.doc(id).delete();
  }

  addReservation(id: string, reservation: string){
    
  }

}

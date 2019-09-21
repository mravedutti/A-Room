//Tools import
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

//Interfaces import
import { Room } from 'src/app/interfaces/room';
import { Reservation } from 'src/app/interfaces/reservation';

//Services import
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import { ReservationService } from '../../services/reservation.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private roomId: string = null;
  public room: Room = {};
  public reservation: Reservation = {
    key: null,
    roomId: null,
    guestId: null,
    date: null,
    startTime: null,
    endTime: null
  };
  private loading: any;
  private roomSubscription: Subscription;
  public startTime: string;
  public endTime: string;
  public date: string;
  public CurrDateMS: number;
  public CurrDateISO: string;
  public guestID: string;
  public docRef: AngularFirestore;

  constructor(
    private roomService: RoomService,
    private authService: UserService,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    this.roomId = this.activatedRoute.snapshot.params['id'];
    try {
      this.guestID = this.authService.getAuth().currentUser.uid;
      console.log (this.guestID);
    } catch {
      console.log("Por Favor entre em sua conta.")
    }

    this.CurrDateMS = new Date().getTime();
    this.CurrDateISO = new Date(this.CurrDateMS).toISOString();
    console.log(this.CurrDateMS);
    console.log(this.CurrDateISO);

    if (this.roomId) this.loadRoom();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.roomSubscription) this.roomSubscription.unsubscribe();
  }

  loadRoom() {
    this.roomSubscription = this.roomService.getRoom(this.roomId).subscribe(data => {
      this.room = data;
    });
    console.log(this.room);
  }

  async submitReservation() {
    // Check if selected date is after current date (implement later)
    if (this.CurrDateMS == new Date(this.date).getTime()) {
      this.presentToast('Selecione uma data futura');
    } else if (this.startTime > this.endTime) {
      this.presentToast('A hora de início deve ser antes do fim');
    } else {
      this.reserve();
    }
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }

  async reserve() {
    await this.presentLoading();

    this.reservation.roomId = this.roomId;
    this.reservation.guestId = this.authService.getAuth().currentUser.uid;
    this.reservation.date = new Date(this.date).getTime();
    this.reservation.startTime = new Date(this.startTime).getTime();
    this.reservation.endTime = new Date(this.endTime).getTime();
    try {
      // Creates a new reservation
      console.log(this.reservation);
      await console.log(this.reservationService.addReservation(this.reservation));
      this.presentToast('Reserva realizada com sucesso')

      // Add Reservation key user ID profile and Room profile
      //await this.roomService.addReservation(this.roomId, )

      await this.loading.dismiss();
    }
    catch{

      this.presentToast('Erro ao tentar salvar sua reserva, tente novamente :(');
      this.loading.dismiss();
    }
  }

}
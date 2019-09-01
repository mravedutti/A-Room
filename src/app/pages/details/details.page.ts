import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/interfaces/room';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private roomId: string = null;
  public room: Room = {};
  private loading: any;
  private roomSubscription: Subscription;
  private currencyPipe: CurrencyPipe

  constructor(
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: UserService,
    private toastCtrl: ToastController
  ) {
    this.roomId = this.activatedRoute.snapshot.params['id'];

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

  Rent() {
    try {
      this.room.userId = this.authService.getAuth().currentUser.uid;
      console.log(this.room);
    } catch {
      this.presentToast("Você deve se conectar a uma conta para executar esta operação")
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  getCurrency(amount: number, currency: string) {
    return this.currencyPipe.transform(amount, currency, true, '1.2-2');
  }
}
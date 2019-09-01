import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/interfaces/room';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public rooms = new Array<Room>();
  private roomSubscription: Subscription;

  sliderOpts = {
    zoom: false,
    slidesPerView: 0,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 300
  };

  imagens = [
    "https://www.livingspaces.com/globalassets/images/lp/2018/03/03_06_living_room_3d.jpg",
    "http://resolve40.com/v/2017/01/if-you-try-small-living-room-decorating-ideas-with-l-shaped-couch-and-small-coffee-table-also-bamboo-flooring-plus-jute-rug-there-are-also-large-mirror.jpg"
  ];

  constructor(
    private authService: UserService,
    private loadingCtrl: LoadingController,
    private roomService: RoomService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.roomSubscription = this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  
}

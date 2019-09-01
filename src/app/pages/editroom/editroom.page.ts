import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/interfaces/room';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editroom',
  templateUrl: './editroom.page.html',
  styleUrls: ['./editroom.page.scss'],
})
export class EditroomPage implements OnInit {
  private roomId: string = null;
  public room: Room = {};
  private loading: any;
  private roomSubscription: Subscription;

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
  }


  async saveRoom() {
    await this.presentLoading();


    this.room.userId = this.authService.getAuth().currentUser.uid;
    console.log(this.room.userId);

    if (this.roomId) {
      try {
        await this.roomService.updateRoom(this.roomId, this.room);
        await this.loading.dismiss();


        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.room.createdAt = new Date().getTime();


      try {
        console.log(this.room);
        await this.roomService.addRoom(this.room);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
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

}




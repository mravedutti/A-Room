import { Component, OnInit} from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user'; 
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public userLogin: User = {};
  private loading: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: UserService,
    private router: Router
  ) { }
  
  
  ngOnInit() {
  }

  async login () {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      console.log(this.authService);
      this.router.navigateByUrl("/home");
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async Anonym (){
    this.router.navigateByUrl("/home");
  }
/*
  async Register () {
    await this.presentLoading();
    
    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }"
*/

  async Register () {
    this.router.navigateByUrl("/register");
  }

  async presentLoading () {
    this.loading = await this.loadingCtrl.create({message: 'Aguarde!'});
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}

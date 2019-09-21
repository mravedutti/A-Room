import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private authService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async logOut() {
    await this.authService.logout();
    this.router.navigateByUrl("");
  }

}

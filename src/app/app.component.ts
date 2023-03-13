import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  token = ''

  showImg = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  createUser() {
    this.userService.create({
      name: 'Daniel',
      email: 'daniel@daniel.com',
      password: 'daniel'
    })
    .subscribe(data => {
      console.log(data);

    })
  }

  login() {
    this.authService.login('daniel@daniel.com', 'daniel')
    .subscribe(data => {
      this.token = data.access_token
    })
  }

  onLoaded(img: string) {
    // console.log('lOG PADRE', img);
  }

  toogleImg() {
    // console.log('Ejecuntando toogle');
    this.showImg = !this.showImg
  }

}

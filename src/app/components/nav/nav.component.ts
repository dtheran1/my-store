import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from '../../services/store.service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  activeMenu = false;
  counter = 0

  profile: User | null = null

  constructor(
    private storeService: StoreService,
    private loginAndProfile: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })
  }

  toogleMenu() {
    this.activeMenu = !this.activeMenu
  }

  logAndProfile() {
    this.loginAndProfile.loginAndGetProfile('daniel@daniel.com', 'daniel')
    .subscribe(data => {
      this.profile = data
    })
  }

}

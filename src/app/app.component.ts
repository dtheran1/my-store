import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  showImg = true;

  onLoaded(img: string) {
    console.log('lOG PADRE', img);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  toogleImg() {
    console.log('Ejecuntando toogle');
    this.showImg = !this.showImg
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  // datos del compon
  // img: string = 'Daniel'
  @Input()img: string = '' // Input representa los props

}

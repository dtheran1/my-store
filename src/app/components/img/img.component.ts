import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  // datos del compon
  // img: string = 'Daniel'
  @Input() img: string = '' // Input representa los props
  @Output() loaded = new EventEmitter<string>()
  imageDefault: string ='../../../assets/pexels-photo-14940646.jpeg'

  imgError() {
    this.img = this.imageDefault
  }

  imgLoaded() {
    console.log('loaded');
    this.loaded.emit(this.img);
  }

}

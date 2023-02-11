import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  // datos del compon
  // img: string = 'Daniel'
  @Input() img: string = '' // Input representa los props
  @Output() loaded = new EventEmitter<string>()
  imageDefault: string ='../../../assets/pexels-photo-14940646.jpeg'

  constructor() {
    // before render
    // No correr cod async
    // El contructor solo se ejecuta una vez
    console.log('Constructor', this.img);
  }

  ngOnChanges() {
    //Before y durante Render
    // es un wach de los inputs
    // se ejecuta cada vez que se actualice un valor del componente
    console.log('ngOnChanges', this.img);
  }

  ngOnInit(): void {
    // before render
    // aqui si podemos ejecutar codigo async, feching de datos, apis
    // solo corre una vez once time
    console.log('Init', this.img);
  }

  ngAfterViewInit(): void {
    // corre despues del render
    // handler children aqui manipulamos a los hijos del compo
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // sirve para eliminar este componente de la interfaz
    console.log('ngOnDestroy');
  }

  imgError() {
    this.img = this.imageDefault
  }

  imgLoaded() {
    console.log('loaded');
    this.loaded.emit(this.img);
  }

}

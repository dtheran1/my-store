import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  // datos del compon
  // img: string = 'Daniel'
  // @Input() img: string = '' // Input representa los props

  img = ''

  // Tambien podemos hacer un set para asegurarnos que un Input tuvo algun cambio.
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') // Este 'img' es un alias para que en el componente padre sea llamado con este alias
  set changeImg(newImg: string) {
    this.img = newImg
    console.log('change just img =>', this.img);
    // code
  }

  @Output() loaded = new EventEmitter<string>()
  imageDefault ='../../../assets/pexels-photo-14940646.jpeg'

  // counter = 0

  // counterFn: number | undefined

  constructor() {
    // before render
    // No correr cod async
    // El contructor solo se ejecuta una vez
    console.log('Constructor', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    //Before y durante Render
    // es un wach de los inputs
    // se ejecuta cada vez que se actualice un valor del componente
    // console.log('ngOnChanges', this.img);
    console.log('ngOnChanges', changes);
  }

  ngOnInit(): void {
    // before render
    // aqui si podemos ejecutar codigo async, feching de datos, apis
    // solo corre una vez once time
    console.log('Init', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1
    //   console.log(this.counter, 'run counter');
    // }, 1000)
  }

  ngAfterViewInit(): void {
    // corre despues del render
    // handler children aqui manipulamos a los hijos del compo
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // sirve para eliminar este componente de la interfaz
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn)
  }

  imgError() {
    this.img = this.imageDefault
  }

  imgLoaded() {
    console.log('loaded');
    this.loaded.emit(this.img);
  }
}

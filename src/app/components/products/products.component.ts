import { Component } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/models/product.model';

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'
import { switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  total = 0
  myShoppingCart:Product[] = []
  products: Product[] = [];
  productChosen: Product ={
    id: '',
    price: 0,
    images: [''],
    title: '',
    description: '',
    category: {
      id: '',
      name: ''
    }
  }

  today = new Date()

  date= new Date(2021, 1, 21)

  showProductDetail = false

  limit = 10;
  offset= 0

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10,0) // Como es una peticion asyncrona lo devemos ejecutar desde el init
    .subscribe(data => {
      this.products = data
      this.offset += this.limit


    }) // El subscribe es un observable que maneja angular
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading'
    this.showProductDetail = true

    this.productsService.getProduct(id).subscribe(data => {
      this.statusDetail = 'success'
      this.productChosen = data
    },
    response => {
      console.log('Error: ' + response);
      this.statusDetail = 'error'
    })
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => {
        return this.productsService.update(product.id, {title:'Titulo cambiado'})
      })
    )
    .subscribe(data=> {
      console.log(data)
    })

    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const [read, update] = response
      console.log(read, update);

    })
  }

  createNewProduct () {
    const dto: CreateProductDTO = {
      title: 'Nueo producto',
      description: 'bla bla bla ',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 1
    }
    this.productsService.create(dto).subscribe(data => {
      this.products.unshift(data)
    })
  }

  updateProduct() {
    const changes: Partial<CreateProductDTO> = {
      title: 'CR77777777',
    }

    const id = this.productChosen.id

    this.productsService.update(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id)
      this.products[productIndex] = data
      this.productChosen = data
    })
  }

  deleteProduct() {
    const id = this.productChosen.id
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === id)
      this.products.splice(productIndex, 1)
      this.showProductDetail = false
    })
  }

  loadMore () {
    this.productsService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data)
      this.offset += this.limit
    })
  }
}

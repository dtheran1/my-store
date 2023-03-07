import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  total = 0
  myShoppingCart:Product[] = []
  products: Product[] = [];

  today = new Date()

  date= new Date(2021, 1, 21)

  showProductDetail = false

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts() // Como es una peticion asyncrona lo devemos ejecutar desde el init
    .subscribe(data => {
      // console.log(data)
      this.products = data
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
    console.log(id);
    this.productsService.getProduct(id).subscribe(data => {
      console.log(data);
      // this.showProductDetail = true
    })

  }
}

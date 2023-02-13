import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs' // Con esta lib tenemos todos los patrones de observables
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart:Product[] = []

  // con BehaviorSubject convertimos en un observable esta variable Con esto le damos reactividad
  private myCart = new BehaviorSubject<Product[]>([])
  myCart$ = this.myCart.asObservable();

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart) // Con next transmitimos a los que estan suscriptions a este store
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0)
  }
}

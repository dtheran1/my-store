import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CreateProductDTO, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL='https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams()
    if (limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', limit)
    }

    return this.http.get<Product[]>(this.apiURL, { params }) // en este punto podemos tipar lo que nos devuelve el request
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiURL}`, {
      params: { limit, offset }
    })
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiURL}/${id}`)
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiURL, dto)
  }

  update(id: string, dto: Partial <CreateProductDTO>){
    return this.http.put<Product>(`${this.apiURL}/${id}`, dto)
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiURL}/${id}`)
  }
}

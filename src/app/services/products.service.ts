import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http'
import { CreateProductDTO, Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { catchError, map, throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL=`${environment.API_URL}/api/products`

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

    // .pipe(
    //   map(products => products.map(item => { // Agregando un nuevo campo desde el front, el map viene del rxjs
    //     return {
    //       ...item,
    //       taxes: .19* item.price
    //     }
    //   }))
    // )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiURL}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse)=> {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server')
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe')
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No tienes acceso a esto')
        }

        return throwError('Ups algo salio mal')
      })
    )
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

  fetchReadAndUpdate(id: string, dto: Partial<CreateProductDTO>) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }
}

import { Injectable } from "@angular/core";
import { IProduct } from "./IProduct";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      map(products => products.filter(product => product.productId === id)[0]), // Using filter and selecting the first element
      catchError(this.handleError)
    );
  }

    DoesIDExist(id: number): Observable < boolean > {
      return this.http.get<IProduct[]>(this.productUrl).pipe(
        map(data => {
          const product = data.find(product => product.productId === id);
          return product !== undefined;
        }),
        catchError(this.handleError)
      );
    }

  private handleError(err: HttpErrorResponse) {
    ``
    // in a real world app, we may send the server some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side of network error occurred. Handle it accordingly
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
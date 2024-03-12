import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router, private productService: ProductService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = Number(route.paramMap.get('id'));

    return this.productService.DoesIDExist(id).pipe(
      map(result => {
        if (isNaN(id) || !result) {
          alert('Invalid product id');
          return this.router.createUrlTree(['/products']);
        }
        return true;
      })
    );
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //   const id = Number(route.paramMap.get('id'));

  //   this.productService.DoesIDExist(id).subscribe({
  //     next: result => {
  //       if (isNaN(id) || !result) {
  //         alert('Invalid product id');
  //         this.router.navigate(['/products']);
  //         return false;
  //       }
  //       return true;
  //     },
  //     error: err => this.errorMessage = err
  //   });
  //   return true;
  // };
}

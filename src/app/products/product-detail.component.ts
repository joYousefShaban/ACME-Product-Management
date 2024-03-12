import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './IProduct';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product Detail";
  product: IProduct | undefined;
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pageTitle += `: ${id}`;

    this.sub = this.productService.getProductById(id).subscribe({
      next: product => {
        this.product = product;
        console.log('Product:', product);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}

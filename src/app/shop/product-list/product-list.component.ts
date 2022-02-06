import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BucketProduct } from 'src/app/models/bucket-product-model';
import { Product } from 'src/app/models/product-model';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  tobu$: Observable<BucketProduct[]>;
  products$: Observable<Product[]>;

  constructor(private service: ProductListService) { }

  ngOnInit(): void {
    this.products$ = this.service.getProducts();
  }

  addToBucket(product: Product): void {
    this.service.addProduct(product);
  }
}

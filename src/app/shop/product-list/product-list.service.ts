import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product-model';
import { BucketService } from '../bucket/bucket.service';

@Injectable()
export class ProductListService {
  private readonly productSubject: Subject<Product[]>;

  private productList: Product[] = [
    { 'name': 'Rubik\'s cube', 'cost': 550 },
    { 'name': 'Gray shirt', 'cost': 699.99 },
    { 'name': 'Handmade Mask "Covid, please stop"', 'cost': 50 },
    { 'name': 'Pen', 'cost': 15.5 }
  ];

  constructor(private bucketService: BucketService) {
    this.productSubject = new BehaviorSubject(this.productList);
  }

  getProducts(): Observable<Product[]> {
    return this.productSubject.asObservable();
  }

  addProduct(product: Product): void {
    this.bucketService.convertToBucketProduct(product);
  }
}

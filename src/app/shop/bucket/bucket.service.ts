import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BucketProduct } from 'src/app/models/bucket-product-model';
import { Product } from 'src/app/models/product-model';

@Injectable()
export class BucketService {
  private readonly bucketListSubject$: Subject<BucketProduct[]>;

  private bucketList: BucketProduct[] = [];
  constructor() {
    this.bucketListSubject$ = new BehaviorSubject(this.bucketList);
  }

  getBucketList(): Observable<BucketProduct[]> {
    return this.bucketListSubject$.asObservable();
  }

  refreshBucketList(): void {
    this.bucketListSubject$.next(this.bucketList);
  }

  convertToBucketProduct(product: Product): void {

    if (this.bucketList.map(data => data.product).includes(product)) {
      alert(`Продукт ${product.name} уже в корзине вообще то`);
    }
    else {
      const productToBuy: BucketProduct = {
        'product': product, 'quantity': 1
      };
      this.bucketList.push(productToBuy);
    }
    this.refreshBucketList();
  }

  increaseQuantity(bucketProduct: BucketProduct): void {
    bucketProduct.quantity += 1;
    this.refreshBucketList();
  }

  decreaseQuantity(bucketProduct: BucketProduct): void {
    bucketProduct.quantity -= 1;
    if (bucketProduct.quantity < 1) {
      this.bucketList = this.bucketList.filter(x => x !== bucketProduct);
    }
    this.refreshBucketList();
  }
}

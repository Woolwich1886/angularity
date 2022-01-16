import { Component, OnInit } from '@angular/core';
import { BucketProduct } from 'src/app/models/bucket-product-model';
import { Product } from 'src/app/models/product-model';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {

  totalCost: number;
  bucketList: BucketProduct[];
  productToBuyList: Product[];

  constructor() { }

  ngOnInit(): void {
    this.totalCost = 0;
    this.bucketList = [];
    this.productToBuyList = [];
  }

  convertToBucketProduct(product: Product) {
    console.log(product)
    if (this.productToBuyList.includes(product)) {
      alert(`Продукт ${product.name} уже в корзине вообще то`)
    }
    else {
      const productToBuy: BucketProduct = {
        'product': product, 'quantity': 1
      }
      this.bucketList.push(productToBuy)
      this.productToBuyList.push(product)
      product.cost ? this.totalCost += product.cost : null
    }
  }

  increaseQuantity(bucketProduct: BucketProduct): void {
    bucketProduct.quantity += 1;
    bucketProduct.product.cost ? this.totalCost += bucketProduct.product.cost : null
  }

  decreaseQuantity(bucketProduct: BucketProduct): void {
    bucketProduct.quantity -= 1;
    bucketProduct.product.cost ? this.totalCost -= bucketProduct.product.cost : null
    if (bucketProduct.quantity < 1) {
      this.bucketList = this.bucketList.filter(x => x !== bucketProduct);
      this.productToBuyList = this.productToBuyList.filter(x => x !== bucketProduct.product);
    }
  }

}


import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Output()
  productToBucket: EventEmitter<Product> = new EventEmitter<Product>()

  productList: Product[] = [
    {'name': 'Rubik\'s cube', 'cost': 550},
    {'name': 'Gray shirt', 'cost': 699.99},
    {'name': 'Handmade Mask "Covid, please stop"', 'cost': 50},
    {'name': 'Pen', 'cost': 15.5}
  ]
  products$: Observable<Product[]> 

  constructor() { }

  ngOnInit(): void {
    this.products$ = of(this.productList)
  }

  addToBucket(product: Product): void {
    this.productToBucket.emit(product)
  }
}

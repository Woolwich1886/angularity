import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BucketProduct } from 'src/app/models/bucket-product-model';
import { BucketService } from './bucket.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketComponent implements OnInit, OnChanges {

  totalCost$: Observable<number>;
  bucketList$: Observable<BucketProduct[]>;

  constructor(private service: BucketService) { }

  ngOnInit(): void {
    //TODO: использовать ngForm и FormArray, имплементация ControlValueAccessor???
    this.bucketList$ = this.service.getBucketList();
    this.totalCost$ = this.bucketList$.pipe(
      map(data => data.reduce(
        (acc, curr) => acc + (curr.product.cost ? curr.product.cost * curr.quantity : 0), 0
      )));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  increaseQuantity(bucketProduct: BucketProduct): void {
    this.service.increaseQuantity(bucketProduct);
  }

  decreaseQuantity(bucketProduct: BucketProduct): void {
    this.service.decreaseQuantity(bucketProduct);
  }
  addtt() {
    this.service.convertToBucketProduct({ 'name': 'asdasda', 'cost': 151 });
  }

}


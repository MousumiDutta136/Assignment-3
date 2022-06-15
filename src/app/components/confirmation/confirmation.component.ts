import { Component, Input, OnInit } from '@angular/core';
import { DataStoreService } from 'src/app/services/data-store.service';
import { take , filter} from 'rxjs';
import { ProductData } from 'src/app/models/product.interface';
import { OrderData } from 'src/app/models/order.interface';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  orderNumber: string = '';
  orderTotal: any = 0;
  total: any = 0;
  orderDetails: OrderData = {
    orderNumber: '',
    total: ''
  };

  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.dataStore.cartItems$.pipe(
      filter(x => x.length > 0),
      take(1)
      ).subscribe((cartItems: ProductData[]) => {
        cartItems.forEach(item => {
          this.total = this.total + +item.price.substring(1);
        })
        this.total = '$' + this.total;
        this.orderNumber = Math.ceil(Math.random()* 100000000).toString();
        this.orderDetails.total = this.total;
        this.orderDetails.orderNumber = this.orderNumber;
        this.dataStore.addToOrder(this.orderDetails);
    });
    this.dataStore.clearCart();
  }
}

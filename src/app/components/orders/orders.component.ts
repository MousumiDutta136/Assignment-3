import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderData } from 'src/app/models/order.interface';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders!: OrderData[];

  ordersSubscription!: Subscription;
  constructor(private dataStore: DataStoreService, private productsService: ProductsService) { }

  ngOnInit(): void {
    //this.productsService.getOrderData();
    this.ordersSubscription = this.dataStore.orders$.subscribe(orders => {
      this.orders = orders;
    })
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}

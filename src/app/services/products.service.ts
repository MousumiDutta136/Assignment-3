import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { OrderData } from '../models/order.interface';
import { ProductData } from '../models/product.interface';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private dataStore: DataStoreService) {
    this.getProducts();
    this.getOrderData();
  }

  getProducts() {
    this.http.get<ProductData[]>('/assets/product-data.json').pipe(
      take(1)
    ).subscribe((res: ProductData[]) => {
      this.dataStore.setFullProductsList(res);
      this.dataStore.setProducts(res);
    })
  };

  getOrderData() {
    this.http.get<OrderData[]>('/assets/order-data.json').pipe(
      take(1)
    ).subscribe((res: OrderData[]) => {
      this.dataStore.setOrders(res);
    })
  }

  clearCart() {
    this.dataStore.clearCart();
  }

  addToCart(item: ProductData) {
    this.dataStore.addToCart(item);
  }
}

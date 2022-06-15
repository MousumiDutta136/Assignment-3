import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { OrderData } from '../models/order.interface';
import { ProductData } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private _products: BehaviorSubject<ProductData[] | any> = new BehaviorSubject(null);
  products$: Observable<ProductData[]> = this._products.asObservable();

  private _orders: BehaviorSubject<OrderData[] | any> = new BehaviorSubject(null);
  orders$: Observable<OrderData[]> = this._orders.asObservable();

  private _cartItems: BehaviorSubject<ProductData[] | any> = new BehaviorSubject([]);
  cartItems$: Observable<ProductData[]> = this._cartItems.asObservable();
  private fullProductList!: ProductData[];
  total = 0;


  constructor() { }

  setProducts(products: ProductData[]) {
    this._products.next(products);
  }

  setOrders(orders: OrderData[]) {
    this._orders.next(orders);
  }

  clearCart() {
    this._cartItems.next([]);
  }

  addToCart(item: ProductData) {
    this._cartItems.pipe(
      take(1)
    ).subscribe((cartItems: ProductData[]) => {
      cartItems.push(item);
      this._cartItems.next(cartItems);
    });

  }

  addToOrder(item: OrderData) {
    this._orders.pipe(
      take(1)
    ).subscribe((orderItems: OrderData[]) => {
      orderItems.push(item);
      this._orders.next(orderItems);
      console.log(orderItems);
    });
  }

  filterProducts(text: string) {
    this._products.pipe(
      take(1)
    ).subscribe(products => {
      if (text === "") {
        this._products.next(this.fullProductList)
      } else {
        const filteredProducts = products.filter((product: ProductData) => {
          const lowerCaseText = text.toLowerCase();
          const productName = product.name.toLowerCase();
          return productName.includes(lowerCaseText)
        })

        this._products.next(filteredProducts);
      }
    })
  }

  setFullProductsList(products: ProductData[]) {
    this.fullProductList = products;
  }
}

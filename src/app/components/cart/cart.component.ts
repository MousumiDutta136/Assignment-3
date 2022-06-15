import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$!: Observable<ProductData[]>;


  constructor(private dataStore: DataStoreService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems$ = this.dataStore.cartItems$;
  }

  clearCart() {
    this.dataStore.clearCart();
  }

  checkoutCart() {

    this.router.navigateByUrl('/checkout');


  }
}

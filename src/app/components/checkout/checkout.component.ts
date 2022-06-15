import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take , filter} from 'rxjs';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductData } from 'src/app/models/product.interface';
import { CreditCardValidator } from 'src/app/Validators/customValidation';


@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  form!: FormGroup;
  total: any = 0;
  Country: any = ['US', 'Canada'];
  Cardtype: any = ['VISA', 'MasterCard'];

  constructor(private router: Router, private dataStore: DataStoreService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      cardType: new FormControl('', Validators.required),
      creditCardNo: new FormControl('', [Validators.required, CreditCardValidator()]),
      expiry: new FormControl('', Validators.required),
      cvc: new FormControl('', [Validators.required, CreditCardValidator()]),
      nameOnCard: new FormControl('', Validators.required)
    })

    this.dataStore.cartItems$.pipe(
      filter(x => x.length > 0),
      take(1)
      ).subscribe((cartItems: ProductData[]) => {
        cartItems.forEach(item => {
          this.total = this.total + +item.price.substring(1);
        })
        this.total = '$' + this.total;
    })
  }

  submit() {
      const values = this.form.value;
      console.log(values);
    this.router.navigateByUrl('/confirmation');
  }
}

import { StoreService } from './../../service/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import BillInfo from 'src/app/model/billInfo.model';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import Constant from 'src/app/service/constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  products: Product[] = this.cart.productsInCart;
  billInfo: BillInfo = {...Constant.DefaultBillInfo};
  total: number = 0;

  $sub!: Subscription;

  constructor(private store: StoreService, private cart: CartService, private route: Router) {}

  ngOnInit(): void {
    this.cart.getCart()
    this.$sub = this.cart.productsInCartData.subscribe(list => {
      let total = 0;
      list.forEach(item => total += (item.price * item.amount));

      this.products = list;
      this.total = Number(total.toFixed(2));
    });
  }

  ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  onSubmit(): void {
    this.billInfo.total = this.total;

    this.store.updateBillInfo(this.billInfo);
    this.cart.clearCart();
    this.route.navigate(['/confirmation']);
  }

}

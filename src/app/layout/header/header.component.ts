import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  numberProductInCart: number = 0;

  $sub!: Subscription

  constructor(private store: StoreService, private cart: CartService) { }

  ngOnInit(): void {
    this.$sub = this.cart.productsInCartData.subscribe(list => {
      let total = 0;
      list.forEach((item: Product) => total += item.amount);
      this.numberProductInCart = total;
    })
  }

  ngOnDestroy(): void {
      this.$sub?.unsubscribe();
  }

}

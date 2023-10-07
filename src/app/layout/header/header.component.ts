import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  numberProductInCart: number = 0;

  $sub!: Subscription

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.$sub = this.store.productsInCartData.subscribe(list => {
      let total = 0;
      list.forEach(item => total += item.amount);
      this.numberProductInCart = total;
    })
  }

  ngOnDestroy(): void {
      this.$sub?.unsubscribe();
  }

}

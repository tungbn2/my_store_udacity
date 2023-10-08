import { CartService } from 'src/app/service/cart.service';
import { Product } from './../../../model/product.model';
import { StoreService } from './../../../service/store.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() product!: Product;
  @Output() adjustCartItemEvent = new EventEmitter();
  currentCounter: number = 0;

  constructor(private store: StoreService, private cart: CartService) {}

  ngOnInit(): void {}

  changeAmountProduct(event: any): void {
    if (this.product) this.cart.changeAmountProduct(this.product?.id, Number(event?.target.value));
  }

  removeProduct(){
    this.cart.removeFromCart(this.product.id);
  }
}

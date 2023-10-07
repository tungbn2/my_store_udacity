import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product!: Product;
  @Output() onAddingToCartEvent = new EventEmitter();

  amount:number = 1;

  constructor(private route: Router, private store: StoreService) {}

  ngOnInit(): void {}

  onChangeAmount(event: any) {
    this.amount = Number(event.target.value);
  }

  goToDetail() {
    this.route.navigate([`/product-item/${this.product.id}`]);
  }

  addProductToCart(addProduct: Product) {
    addProduct.amount = this.amount;
    this.store.addToCart(addProduct);
  }
}

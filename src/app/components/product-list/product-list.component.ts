import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];

  constructor(
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.store.getProductList().subscribe((list) => {
      this.productList = list;
    });
  }

}

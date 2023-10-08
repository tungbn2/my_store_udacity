import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  products: Product[] = [];
  product: Product = {
    id: 0,
    name: "",
    description: "",
    url: "",
    price: 0,
    amount: 0,
  };

  amount: number = 1;
  id: string | null = '';

  constructor(private store: StoreService, private cart: CartService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.store.getProductList().subscribe((allProducts) => {
      this.products = allProducts.map((product) => ({
        ...product,
        counter: 1,
      }));

      const findingProduct = this.products.find(
        (p) => p.id === Number(this.id)
      );
      if (findingProduct) {
        this.product = findingProduct;
      }
      console.log(allProducts, findingProduct);
    });
  }

  onChangeAmount(event: any) {
    this.amount = Number(event);
  }

  addProductToCart() {
    this.product.amount = this.amount;
    if (this.product) this.cart.addToCart(this.product);
  }
}

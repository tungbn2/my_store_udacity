import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import Constant from './constant';
import BillInfo from '../model/billInfo.model';
import { BehaviorSubject, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  localStorage = window.localStorage;
  productsInCart: Product[] = [];
  billingInformation: BillInfo = {
    userName: '',
    address: '',
    creditCardNumber: '',
    total: 0,
  }

  // Subject
  productsInCartData = new BehaviorSubject<Product[]>([]);

  constructor(private httpClient: HttpClient) { }

  getProductList(){
    return this.httpClient.get<Product[]>(Constant.StoreData).pipe(
      map((list) => list.map(item => {
        item.amount = 1;
        return item;
      }))
    );
  }

  getProductById(id: number){
    return this.httpClient.get<Product>(`${Constant.StoreData}/${id}`);
  }

  getCart(){
    const data = this.localStorage.getItem(Constant.KeyOfCart);
    let cart: Product[] = [];
    if (!data) {
      this.localStorage.setItem(Constant.KeyOfCart, JSON.stringify([]));
    } else {
      cart = JSON.parse(data);
    }

    this.productsInCart = cart;
    this.productsInCartData.next(this.productsInCart);
    return this.productsInCart;
  }

  addToCart(product: Product){
    this.getCart();

    let isProductInCart: Boolean = false;

    for (let index = 0; index < this.productsInCart.length; index++) {
      if (product.id == this.productsInCart[index].id){
        let amountOld = this.productsInCart[index].amount;
        this.productsInCart[index].amount = amountOld + product.amount;
        isProductInCart = true;
        break;
      }
    };

    if(!isProductInCart) {
      this.productsInCart.push(product);
    };

    this.localStorage.setItem(Constant.KeyOfCart, JSON.stringify(this.productsInCart));
    this.productsInCartData.next(this.productsInCart);

    const message = `${product.name} has been added to your cart.`;
    alert(message);
  }

  changeAmountProduct(productId: number, changedAmount: number){
    let productName: string = "";

    for (let index = 0; index < this.productsInCart.length; index++) {
      if (productId == this.productsInCart[index].id){
        this.productsInCart[index].amount = changedAmount;
        productName = this.productsInCart[index].name;
        break;
      }
    };

    this.localStorage.setItem(Constant.KeyOfCart, JSON.stringify(this.productsInCart));
    this.productsInCartData.next(this.productsInCart);

    const message = `${productName} has been changed to your cart.`;
    alert(message);
  }

  removeFromCart(productId: number){
    this.getCart();

    this.productsInCart = this.productsInCart.filter(
      (product) => product.id != productId
    );

    this.localStorage.setItem(Constant.KeyOfCart, JSON.stringify(this.productsInCart));
    this.productsInCartData.next(this.productsInCart);

    alert(`Item is removed from cart!`);

    return this.productsInCart;

  }

  clearCart() {
    this.localStorage.clear();
    this.productsInCart = [];
    this.productsInCartData.next(this.productsInCart);
  }

  updateBillInfo(info: BillInfo) {
    this.billingInformation = {...info};
  }

  generateFinalResult(): BillInfo {
    this.productsInCart = new Array();
    return this.billingInformation;
  }

}

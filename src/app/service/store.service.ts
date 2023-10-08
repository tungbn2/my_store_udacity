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
  billingInformation: BillInfo = {
    userName: '',
    address: '',
    creditCardNumber: '',
    total: 0,
  }

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

  updateBillInfo(info: BillInfo) {
    this.billingInformation = {...info};
  }

  generateFinalResult(): BillInfo {
    return this.billingInformation;
  }

}

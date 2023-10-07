import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import BillInfo from 'src/app/model/billInfo.model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  billInformation: BillInfo = {
    total: 0,
    address: '',
    creditCardNumber: '',
    userName: '',
  };

  constructor(private StoreService: StoreService, private route: Router) {}

  ngOnInit(): void {
    this.billInformation = this.StoreService.generateFinalResult();
  }

  onBack(): void {
    this.route.navigate(['']);
  }

}

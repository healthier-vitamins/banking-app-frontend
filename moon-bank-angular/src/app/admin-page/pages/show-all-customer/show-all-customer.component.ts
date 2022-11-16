import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BankAccount } from 'src/app/models/bank-account';
import { Customer } from 'src/app/models/customer';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-show-all-customer',
  templateUrl: './show-all-customer.component.html',
  styleUrls: ['./show-all-customer.component.css'],
})
export class ShowAllCustomerComponent implements OnInit {
  displayedColumns = [
    '#',
    'email',
    'firstName',
    'lastName',
    'phone',
    'city',
    'accBal',
    'accType',
    'dateCreated',
  ];
  listOfBankAcc?: BankAccount[];
  customer: Customer = new Customer();
  // dataSource = this.listOfBankAcc;

  constructor(
    private bankAccService: BankAccountService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getBankAccounts();
  }

  getBankAccounts() {
    this.bankAccService.getAllBankAccount().subscribe({
      next: (res: any) => {
        this.listOfBankAcc = res as BankAccount[];
        console.log(this.listOfBankAcc);
        // this.dataSource = this.listOfBankAcc;
      },
      error: (err) => {
        if (err.status === 204) {
          alert('Database is empty');
        }
      },
    });
  }

  edit(element: object) {
    const modalRef = this.modalService.open(EditModalComponent, { size: 'xl' });
    modalRef.componentInstance.sentInBankAcc = element;
  }
}

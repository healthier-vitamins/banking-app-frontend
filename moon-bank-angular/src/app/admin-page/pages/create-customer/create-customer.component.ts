import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from 'src/app/models/bank-account';
import { Customer } from 'src/app/models/customer';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { defaultSelectOptionValidator } from '../../validators/defaultSelectOptionValidator';
import { onlyNumAndDotValidator } from '../../validators/onlyNumAndDotValidator';
import { onlyNumValidator } from '../../validators/onlyNumValidator';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  bankAcc?: BankAccount = new BankAccount();
  customer?: Customer = new Customer();

  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bankAccService: BankAccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: [
      '',
      [Validators.required, onlyNumValidator(), Validators.maxLength(8)],
    ],
    city: ['', Validators.required],
    accType: ['--Select Option--', defaultSelectOptionValidator()],
    accBal: ['', [Validators.required, onlyNumAndDotValidator()]],
  });

  get firstName() {
    return this.customerForm.get('firstName');
  }

  get lastName() {
    return this.customerForm.get('lastName');
  }

  get email() {
    return this.customerForm.get('email');
  }

  get phone() {
    return this.customerForm.get('phone');
  }

  get city() {
    return this.customerForm.get('city');
  }

  get accType() {
    return this.customerForm.get('accType');
  }

  get accBal() {
    return this.customerForm.get('accBal');
  }

  isInvalid(controlName: string) {
    let formControl = this.customerForm.get(controlName);
    return {
      'is-invalid':
        this.isSubmitted &&
        (formControl?.hasError('required') ||
          formControl?.hasError('defaultSelectOptionValidator') ||
          formControl?.hasError('onlyNumAndDotValidator') ||
          formControl?.hasError('maxlength') ||
          formControl?.hasError('onlyNumValidator')),
    };
  }

  onSubmit() {
    this.isSubmitted = true;
    const formData = this.customerForm.getRawValue();

    this.customer!.custEmail = formData.email;
    this.customer!.custFirstName = formData.firstName;
    this.customer!.custLastName = formData.lastName;
    this.customer!.custPhone = formData.phone;
    this.customer!.custCity = formData.city;
    this.bankAcc!.accBal = formData.accBal;
    this.bankAcc!.accType = formData.accType;
    this.bankAcc!.customer = this.customer;

    if (this.customerForm.valid) {
      this.bankAccService.saveBankAccount(this.bankAcc).subscribe({
        next: (res) => {
          console.log(res);
          this.customerForm.reset();
          this.accType!.setValue('--Select Option--');
          this.router.navigate(['admin/all-customer']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 406) {
            alert('Username is taken, please try again');
          }
        },
      });
    }
  }

  resetForm() {
    this.isSubmitted = false;
    this.customerForm.reset();
    this.accType!.setValue('--Select Option--');
  }
}

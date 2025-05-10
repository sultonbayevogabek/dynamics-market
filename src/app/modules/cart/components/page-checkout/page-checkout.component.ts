import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './page-checkout.component.html'
})

export class PageCheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;

  private destroy$: Subject<void> = new Subject();

  constructor(
    public cart: CartService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      userType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      comment: ['']
    });

    this.checkoutForm.get('userType')?.valueChanges.subscribe(userType => {
      const companyNameControl = this.checkoutForm.get('companyName');

      if (userType === 'legal') { // Если выбрано "Юридическое лицо"
        companyNameControl?.setValidators(Validators.required);
      } else {
        companyNameControl?.clearValidators();
        companyNameControl?.setValue('');
      }

      companyNameControl?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

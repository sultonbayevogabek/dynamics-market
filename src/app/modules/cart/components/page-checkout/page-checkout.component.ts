import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { firstValueFrom, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { ICartItem } from '@shared/interfaces/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './page-checkout.component.html'
})

export class PageCheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  items: ICartItem[] = [];

  private destroy$: Subject<void> = new Subject();

  constructor(
    public cart: CartService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    this.initForm();
    console.log(this.getCartItems());
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

  async getCartItems() {
    const response = await firstValueFrom(
      this.cart.getList({
        page: 1,
        limit: 1000
      })
    )

    this.items = response?.data;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

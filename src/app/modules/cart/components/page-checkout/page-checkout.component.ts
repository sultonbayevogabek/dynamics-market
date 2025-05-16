import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { firstValueFrom, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { ICartItem } from '@shared/interfaces/cart';
import { IUser } from '@shared/interfaces/user.interface';
import { ToasterService } from '@shared/services/toaster.service';
import { OrdersService } from '@shared/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './page-checkout.component.html'
})

export class PageCheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  items: ICartItem[] = [];
  loading = true;

  private destroy$: Subject<void> = new Subject();

  constructor(
    public cart: CartService,
    public order: OrdersService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToasterService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    this.initForm();
    await this.setUserData();
    await this.getCartItems();
  }

  async setUserData() {
    const user: IUser | null = await firstValueFrom(
      this.authService.currentUser$
    );

    this.checkoutForm.patchValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone
    });
    this.checkoutForm.updateValueAndValidity();
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      customerType: [ 'legal', Validators.required ],
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      companyName: [ '', [ Validators.required ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      phone: [ '', Validators.required ],
      comment: [ '' ],
      terms: [ false, Validators.requiredTrue ]
    });

    this.checkoutForm.get('customerType')?.valueChanges.subscribe(customerType => {
      const companyNameControl = this.checkoutForm.get('companyName');

      if (customerType === 'legal') { // Если выбрано "Юридическое лицо"
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
    );

    this.items = response?.data;
    this.loading = false;
  }

  async checkout() {
    if (!this.items.length) {
      await this.toaster.warning('your.shopping.cart.is.empty');
      return;
    }

    if (this.checkoutForm.invalid) {
      await this.toaster.warning('please.fill.required.fields');
      return;
    }

    if (this.checkoutForm.disabled) {
      return;
    }

    this.checkoutForm.disable();
    this.checkoutForm.updateValueAndValidity();

    const payload = this.checkoutForm.getRawValue();
    const response = await firstValueFrom(
      this.order.create(payload)
    );

    if (response?.statusCode === 201) {
      await this.toaster.success('order.created.successfully.with.contact');
      await this.router.navigate(['cart', 'thank-you', response?.orderCode]);
      return;
    }

    this.checkoutForm.enable();
    this.checkoutForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

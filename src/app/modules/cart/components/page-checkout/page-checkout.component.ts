import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { firstValueFrom, lastValueFrom, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { ICartItem } from '@shared/interfaces/cart';
import { IUser } from '@shared/interfaces/user.interface';

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
    await this.setUserData();
    await this.getCartItems();
  }

  async setUserData() {
    const user: IUser | null = await firstValueFrom(
      this.authService.currentUser$
    )
    console.log(user);

    this.checkoutForm.patchValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phone
    })
    this.checkoutForm.updateValueAndValidity()
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      userType: ['legal', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      comment: [''],
      terms: [false, Validators.requiredTrue]
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

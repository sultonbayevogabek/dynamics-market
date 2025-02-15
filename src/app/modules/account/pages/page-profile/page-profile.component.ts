import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { ToasterService } from '@shared/services/toaster.service';
import { ProfileService } from '@shared/services/profile.service';
import { IUser } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html'
})

export class PageProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [ Validators.required ]),
    lastName: new FormControl(null, [ Validators.required ]),
    email: new FormControl(null, [ Validators.required ]),
    phone: new FormControl('+998 ', [ Validators.required ]),
    telegram: new FormControl(null),
    gender: new FormControl('male'),
    address: new FormControl(null)
  });
  customPatterns = {
    N: { pattern: new RegExp('[a-zA-Z\'‘’]') }
  };
  currentUser!: IUser | null;

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private profileService: ProfileService
  ) {
  }

  async ngOnInit() {
    await this.setInitialValue();
  }

  async setInitialValue() {
    this.currentUser = await firstValueFrom(this.authService.currentUser$);

    this.profileForm.patchValue({
      firstName: this.currentUser?.firstName,
      lastName: this.currentUser?.lastName,
      email: this.currentUser?.email,
      phone: this.currentUser?.phone ?? '+998 ',
      telegram: this.currentUser?.telegram,
      gender: this.currentUser?.gender ?? 'male',
      address: this.currentUser?.address,
    });
  }

  async updateUserData() {
    const form = this.profileForm;

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();

    const payload = {
      ...form.value,
      phone: `+998${ form.value.phone }`
    };

    try {
      const response = await firstValueFrom(
        this.profileService.updateUserData(payload)
      );

      if (response && response.token) {
        form.enable();
        this.authService.token = response.token;
        this.authService.currentUser$.next({
          ...this.currentUser,
          ...payload
        });
        await this.toasterService.success('changes.successfully.saved');
      }
    } catch (error) {
      form.enable();
    }
  }
}

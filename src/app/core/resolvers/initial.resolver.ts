import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { IUser } from '@shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class InitialResolver implements Resolve<any> {
  constructor(
    private authService: AuthService,
  ) {}

  resolve(): Observable<IUser | unknown> {
    return this.authService.getUserWithToken();
  }
}

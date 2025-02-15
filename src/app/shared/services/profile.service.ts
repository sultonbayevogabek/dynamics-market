import { Injectable } from '@angular/core';
import { RequestService } from '@shared/services/request.service';
import { IUser } from '@shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class ProfileService extends RequestService {
  updateUserData(payload: IUser) {
    return this.request<{ token: string }>('user/update', payload)
  }
}

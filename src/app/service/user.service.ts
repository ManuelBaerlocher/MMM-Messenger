import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new User();
  name!: string;

  constructor(public authService: AuthenticationService, public firestore: AngularFirestore) {
  }

}

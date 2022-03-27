import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.class';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new User();
  name!: string;


  constructor(
    public authService: AuthenticationService,
    public firestore: AngularFirestore,
    private usersService: UsersService
  ) {

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'uid' })
      .subscribe((changes: any) => {
        this.user = changes;
        console.log("userservice", changes, this.usersService.currentUserProfile$)
      })
  }

  editUser() {
    console.log('Authservice', this.authService.currentUser$)

    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        console.log('Adding user finisihed', result)
      })
  }
}

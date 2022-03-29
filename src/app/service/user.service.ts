import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = new User();
  allUsers = [];



  constructor(public firestore: AngularFirestore) {

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'uid' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      })
  }

  editUser() {
    this.firestore
      .collection('users')
      .add(this.users.toJSON())
      .then((result: any) => {
        console.log('Adding user finisihed', result)
      })
  }
}

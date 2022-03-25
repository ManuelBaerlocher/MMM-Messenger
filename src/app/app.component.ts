import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './service/authentication.service';

import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$ = this.userService.currentUserProfile$;

  items: Observable<any[]>;
  users: any = [];


  

  channellist = ['Channel 1', 'Channel 2'];
 

  constructor(
    public authService: AuthenticationService, 
    private router: Router,
    private userService: UsersService,
    public firestore: AngularFirestore
  ) {

    this
      .firestore
      .collection('users')
      .valueChanges()
      .subscribe((tests: any) => {
        this.users = tests
        console.log('testManuel', this.users)

      })
  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
    })
  }
}

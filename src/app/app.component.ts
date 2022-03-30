import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { Channel } from './models/channel.class';


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
  clickButton = false;
  channel = new Channel();
  allChannels: any = [];
  allUsers: any = [];






  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private userService: UsersService,
    public firestore: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.firestore
      .collection('channels', ref =>
        ref.orderBy('nameCase', 'asc'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      })

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.users = changes;
      })

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
        console.log(this.allUsers)
      })


  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
    })
  }

  openDialog() {
    this.dialog.open(DialogAddChannelComponent)
  }

  deleteChannel() {
    console.log('delete Channel')
  }

}

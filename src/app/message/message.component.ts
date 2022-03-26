import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

import { AuthenticationService } from '../service/authentication.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;

  users: any = [];

  posts: Array<any>
  newmassage: string

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public userService: UsersService,
    public authService: AuthenticationService,
  ) {

    this.posts = [

      { user: 'Manuel', date: '25.03.22, 22.05 Uhr', message: 'hallo' },
      { user: 'Max', date: '24.03.22, 21.05 Uhr', message: 'hallo2' }

    ]


  }

  ngOnInit(): void {
  }

  newPost() {

    this.posts.push({ user: 'Max', date: '24.03.22, 21.05 Uhr', message: this.newmassage })
    console.log('newPost', this.posts)

  }

  deletePost(i) {
    this.posts.splice(i, 1)
    console.log('deltePost', i)
  }

}

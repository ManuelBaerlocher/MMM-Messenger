import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message.class';

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

  allUsers: any = [];

  message = new Message();
  messageId: any = ''

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public authService: AuthenticationService,
    private userService: UsersService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute,

  ) {

    this.posts = [

      { user: 'Manuel', date: '25.03.22, 22.05 Uhr', message: 'hallo' },
      { user: 'Max', date: '24.03.22, 21.05 Uhr', message: 'hallo2' }

    ]


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.messageId = paramMap.get('id');
      this.checkChat();

      this.firestore
        .collection('users')
        .valueChanges({ idField: 'customIdName' })
        .subscribe((changes: any) => {
          this.allUsers = changes;
          console.log(this.allUsers)
        })
    })
  }

  newPost() {

    this.posts.push({ user: 'Max', date: '24.03.22, 21.05 Uhr', message: this.newmassage })
    console.log('newPost', this.posts)

  }

  deletePost(i) {
    this.posts.splice(i, 1)
    console.log('deltePost', i)
  }


  //Test Chat Function Manuel

  checkChat() {
    this.message.userId1 = this.messageId;
    this.message.userId2 = this.authService.currentUserId;

    console.log('onclick', this.message.userId1, this.message.userId2)

    
    this.getChat()
    this.newChat()
  }

  newChat() {

    this.firestore
      .collection('messages')
      .add(this.message.toJSON())
      .then((result: any) => {
        console.log('new Chat', result)
      });


  }

  getChat() {
    this.firestore
      .collection('messages')
      .doc(this.messageId)
      .valueChanges()
      .subscribe((message: any) => {
        this.message = new Message(message);
        console.log(this.message)
      })

    this.firestore
      .collection('messages')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      })

  }

}

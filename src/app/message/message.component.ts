import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message.class';
import { Post } from '../models/post.class';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {


  users: any = [];
  posts: Array<any>
  newmessage: string;
  // allUsers: any = [];
  message = new Message();
  post = new Post();

  allMessages: any = [];
  userId: any = '';
  chatFound: boolean = false;
  chatId: string = '';
  allPosts: any = [];



  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);



  constructor(
    public userService: UserService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
  ) {



    this.posts = [

      { user: 'Manuel', date: '25.03.22, 22.05 Uhr', message: 'hallo' },
      { user: 'Max', date: '24.03.22, 21.05 Uhr', message: 'hallo2' }

    ]


  }



  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id')
      this.loadAllMessages();
    });



  }










  newPost() {
    this.post.userId = this.authService.currentUserId
    // this.checkUser();
    // this.checkDate();

    this.firestore
      .collection('messages')
      .doc(this.chatId)
      .collection('posts')
      .add(this.post.toJSON());
  }

  checkUser() {
    this.post.userId = this.authService.currentUserId
    for (let i = 0; i < this.userService.allUsers.length; i++) {
      let uid: string = this.userService.allUsers[i].uid;

      if (this.post.userId == uid) {
        this.post.userName = this.userService.allUsers[i].displayName
        this.checkUserImg(i)
      }
    }
  }

  checkUserImg(i) {
    if (this.userService.allUsers[i].photoURL == undefined) {
      this.post.userImg = 'assets/img/user-placeholder.png';
    } else {
      this.post.userImg = this.userService.allUsers[i].photoURL;
    }
  }

  checkDate() {
    const formatDate = new Intl.DateTimeFormat("de", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }




  deletePost(i) {
    this.posts.splice(i, 1)
    console.log('deltePost', i)
  }


  //Test Chat Function Manuel







  checkChat() {

    this.message.userId1 = this.userId
    this.message.userId2 = this.authService.currentUserId;

    // this.newChat();
    this.isChatTrue();
  }

  loadAllMessages() {
    this.firestore
      .collection('messages')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allMessages = changes;
        console.log('allMessages loaded', this.allMessages, 'laenge', this.allMessages.length, this.userId)
        this.checkChat();
      })
  }



  // loadAllMessages() {
  //   this.firestore
  //     .collection('users')
  //     .doc(this.userId)
  //     .collection('message')
  //     .valueChanges({ idField: 'customIdName' })
  //     .subscribe((changes: any) => {
  //       this.allMessages = changes;
  //       console.log('allMessages loaded', this.allMessages, 'laenge', this.allMessages.length, this.userId)
  //       this.checkChat();

  //     })
  // }

  isChatTrue() {
    if (this.allMessages.length == 0) {
      console.log('keine Dateien Vorhanden');
    } else if (this.message.userId2 == '') {
      console.log('userId ist Leer!')
    } else {
      this.isChatFound();

      if (this.chatFound) {
        console.log('teffer ', this.chatFound, ' chatId', this.chatId);
        this.getChat()
        // routerLink="['/message/' + user.customIdName]
        // this.router.navigate(['/home']);

      } else {
        console.log('kein Treffer ', this.chatFound, ' chatId', this.chatId);
        // this.newChat()
      }
    }
  }


  isChatFound() {
    for (let i = 0; i < this.allMessages.length; i++) {
      let userId1 = this.allMessages[i].userId1;
      let userId2 = this.allMessages[i].userId2;
      let customId = this.allMessages[i].customIdName;

      if (userId1 == this.message.userId1 && userId2 == this.message.userId2) {
        this.chatId = customId;
        this.chatFound = true;
        break;

      } else if (userId2 == this.message.userId1 && userId1 == this.message.userId2) {

        this.chatId = customId;
        this.chatFound = true
        break;

      } else {
        this.chatId = '';
        this.chatFound = false
      }
    }
  }

  getChat() {
    this.firestore
      .collection('messages')
      .doc(this.chatId)
      .collection('posts', ref =>
        ref.orderBy('time', 'asc'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.post = new Post(changes);
        this.allPosts = changes;
        console.log('get Chat', this.post)
      })

  }

  newChat() {

    this.firestore
      .collection('messages')

      .add(this.message.toJSON())
      .then((result: any) => {
        console.log('new Chat', result)
      });


  }



}



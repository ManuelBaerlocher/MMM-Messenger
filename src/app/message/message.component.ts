import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { DialogEditPostComponent } from '../dialog-edit-post/dialog-edit-post.component';
import { Message } from '../models/message.class';
import { Post } from '../models/post.class';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  chatUser: ''
  message = new Message();
  post = new Post();
  allMessages: any = [];
  userId: any = '';
  chatFound: boolean = false;
  chatId: any = '';
  allPosts: any = [];
  users: any = [];
  photoUrl: string = '';
  filePath:string;
  postImageUrl;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public userService: UserService,
    public dialog: MatDialog,
    public storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id')
      this.loadAllMessages();




    });


  }


  loadPosts() {
    this.firestore
      .collection('messages')
      .doc(this.chatId)
      .collection('posts', ref =>
        ref.orderBy('time', 'asc'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allPosts = changes;
      })
  }

  checkUserHeadImg() {

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.users = changes;
        this.checkHeadUserForeach()
      })


  }

  checkHeadUserForeach() {
    this.users.forEach(element => {

      if (this.userId == element.uid) {
        console.log('test', element.photoURL)
        if (element.photoURL == undefined) {
          this.photoUrl = 'assets/img/user-placeholder.png';
        } else {
          this.photoUrl = element.photoURL;
        }
      }

    });
  }

  checkChatUser() {

    for (let i = 0; i < this.userService.allUsers.length; i++) {
      let uid: string = this.userService.allUsers[i].uid;

      if (this.userId == uid) {
        this.chatUser = this.userService.allUsers[i].displayName
        this.checkUserImg(i)
      }
    }
  }

  newPost() {
    this.post.userId = this.authService.currentUserId
    this.post.time = Date.now();
    this.checkUser();
    this.checkDate();


    this.firestore
      .collection('messages')
      .doc(this.chatId)
      .collection('posts')
      .add(this.post.toJSON());
    this.post.content = '';
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

    this.post.date = formatDate.format(new Date())
  }

  deletePost(id) {
    this.firestore
      .collection('messages')
      .doc(this.chatId)
      .collection('posts')
      .doc(id)
      .delete()
      .then(res => {
      })
  }

  checkChat() {
    this.message.userId1 = this.userId
    this.message.userId2 = this.authService.currentUserId;

    this.isChatAvailable();
  }

  loadAllMessages() {
    this.firestore
      .collection('messages')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allMessages = changes;
        this.checkChat();
        this.checkChatUser();
        this.checkUserHeadImg();
      })
  }

  isChatAvailable() {
    if (this.allMessages.length == 0) {
    } else if (this.message.userId2 == '') {
    } else {
      this.isChatFound();
      if (this.chatFound) {
        this.loadPosts()
      } else {
        this.newChat()
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


  newChat() {

    this.firestore
      .collection('messages')

      .add(this.message.toJSON())
      .then((result: any) => {
        console.log('new Chat', result)
      });
  }


  openDialog(id, content) {

    const dialog = this.dialog.open(DialogEditPostComponent)
    dialog.componentInstance.post = new Post(this.post.toJSON());
    dialog.componentInstance.post.postId = id;
    dialog.componentInstance.post.content = content;
    dialog.componentInstance.function = 'messages'
    dialog.componentInstance.channelId = this.chatId

  }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  uploadImage(event) {
    const file = event.target.files[0];
    const filePath = '/postImages/image' + Math.random()*1000000;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
     task.snapshotChanges().pipe(
         finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url =>{
            this.post.images.push(url);
          } )
         })
      )
     .subscribe()
   }
  }






import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { DialogEditPostComponent } from '../dialog-edit-post/dialog-edit-post.component';
import { Channel } from '../models/channel.class';
import { Post } from '../models/post.class';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  channelId: any = '';
  channel: Channel = new Channel();
  post: Post = new Post();
  allPosts: any = [];

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public userService: UserService,
    public auth: AngularFireAuth,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      this.checkCurrentUser();
      this.getChannel();
      //this.getPost();
      this.getAllPosts();
    })

  }

  checkCurrentUser() {
    this.auth.currentUser.then((result: any) => {
      console.log('user', result.uid)

    });

  }

  getAllPosts() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('posts', ref =>
        ref.orderBy('time', 'asc'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allPosts = changes;
      })
  }

  // getPost() {
  //   this.firestore
  //     .collection('channels')
  //     .doc(this.channelId)
  //     .collection('posts', ref =>
  //       ref.orderBy('time', 'asc'))
  //     .valueChanges({ idField: 'customIdName' })
  //     .subscribe((changes: any) => {
        
  //     })
  // }

  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      })
  }

  newPost() {

    this.post.userId = this.authService.currentUserId

    this.post.time = Date.now();
    this.checkUser();
    this.checkDate();


    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('posts')
      .add(this.post.toJSON());
    this.post.content = ''
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

  // answerToPost(id) {
  //   this.post.userId = this.authService.currentUserId
  //   this.checkUser();
  //   this.checkDate();

  //   this.firestore
  //     .collection('channels')
  //     .doc(this.channelId)
  //     .collection('posts')
  //     .doc(id)
  //     .collection('answers')
  //     .add(this.post.toJSON());
  //   this.post.content = ''
  // }

  deletePost(id) {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('posts')
      .doc(id)
      .delete()
      .then(res => {
      })
  }



  editPost(id) {
    this.loadEditPost(id);

  }

  loadEditPost(id) {
    //  this.firestore
    //   .collection('channels')
    //   .doc(this.channelId)
    //   .collection('posts')
    //   .doc(id)
    //   .valueChanges({ idField: 'customIdName' })
    //   .subscribe((post: any) => {
    //     this.post = new Post(post);


    //   })

     this.openDialog(id)
  }

  openDialog(id) {

    const dialog = this.dialog.open(DialogEditPostComponent)
    dialog.componentInstance.post = new Post(this.post.toJSON());
    dialog.componentInstance.post.postId = id;
    dialog.componentInstance.channelId = this.channelId

  }
}
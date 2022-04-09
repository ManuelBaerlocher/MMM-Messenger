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
import { AuthService } from '../service/auth.service';
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

  thread: boolean = false;
  threadId: string = ''
  threadPost: Post = new Post();
  threadAnswers: any = [];
  answer: Post = new Post();

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public authS: AuthService,
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
      this.getChannel();
      this.getAllPosts();
      
    })

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

  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      })
  }


  async newPost() {
    this.post.userId = await this.authS.checkUserId();
    this.post.userName = await this.authS.checkUserDisplayName();
    this.post.userImg = await this.authS.checkUserPhotoUrl();
    this.post.time = Date.now();
    this.post.date = this.checkDate();

    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('posts')
      .add(this.post.toJSON());
    this.post.content = ''
  }

  checkDate() {
    const formatDate = new Intl.DateTimeFormat("de", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatDate.format(new Date())
  }

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


  answerToPost(id) {
    console.log('answer', id, this.allPosts);
    this.thread = true;
    this.threadId = id

    this.allPosts.forEach(thread => {
      if (id == thread.customIdName) {
        this.threadPost = thread;
        console.log(this.threadPost);
        this.getAllAnswers(id);

      }

    });
  }

  getAllAnswers(id) {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('posts')
      .doc(id)
      .collection('threads', ref =>
        ref.orderBy('time', 'asc'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.threadAnswers = changes;

      })
  }

  async newAnswer() {
    this.answer.userId = await this.authS.checkUserId();
    this.answer.userName = await this.authS.checkUserDisplayName();
    this.answer.userImg = await this.authS.checkUserPhotoUrl();
    this.answer.time = Date.now();
    this.answer.date = this.checkDate();

    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('posts')
      .doc(this.threadId)
      .collection('threads')
      .add(this.answer.toJSON())
      .then(res => {
        this.answer.content = ''
        this.getAllAnswers(this.threadId)
      })
  }

  closeThread() {
    this.thread = false;
  }

  openDialog(id, content) {

    const dialog = this.dialog.open(DialogEditPostComponent)
    dialog.componentInstance.post = new Post(this.post.toJSON());
    dialog.componentInstance.post.postId = id;
    dialog.componentInstance.post.content = content;
    dialog.componentInstance.channelId = this.channelId
    dialog.componentInstance.function = 'channels'

  }
}
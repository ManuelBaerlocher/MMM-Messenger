import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { user } from 'rxfire/auth';
import { Channel } from '../models/channel.class';
import { Post } from '../models/post.class';
import { User } from '../models/user.class';

import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { UsersService } from '../service/users.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  channelId: any = '';
  channel: Channel = new Channel();
  post = new Post();
  time: Date;
  allPosts: any = [];
  ;

  users: any = [];

  posts: Array<any>
  newmassage: string

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public usersService: UsersService,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    public firestore: AngularFirestore,
    public userService: UserService,
  ) {




  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      this.getChannel();

      console.log(this.userService.user.id)
      
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

    this.firestore
      .collection('posts')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allPosts = changes;
      })
  }

  newPost() {
    // this.post.time = this.time.getTime();
    this.post.channelId = this.channelId;
    // this.post.userId = this.user.uid
    console.log(this.post)




    this.firestore
      .collection('posts')
      .add(this.post.toJSON())
      .then((result: any) => {
        console.log('Adding Post finisihed', result)
      });
  }

  deletePost(i) {
    console.log('post clear')
  }

}
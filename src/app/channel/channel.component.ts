import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../models/channel.class';

import { AuthenticationService } from '../service/authentication.service';
import { UsersService } from '../service/users.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  channelId: any = '';
  channel: Channel = new Channel();

  user$ = this.userService.currentUserProfile$;

  users: any = [];

  posts: Array<any>
  newmassage: string

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public userService: UsersService,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) {

    this.posts = [

      { user: 'Manuel', date: '25.03.22, 22.05 Uhr', message: 'hallo' },
      { user: 'Max', date: '24.03.22, 21.05 Uhr', message: 'hallo2' }

    ]


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      this.getChannel();
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

  newPost() {

    this.posts.push({ user: 'Max', date: '24.03.22, 21.05 Uhr', message: this.newmassage })
    console.log('newPost', this.posts)

  }

  deletePost(i) {
    this.posts.splice(i, 1)
    console.log('deltePost', i)
  }

}
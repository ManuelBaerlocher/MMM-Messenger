import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from '../models/channel.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  channel = new Channel();

  constructor(public dialogRef: MatDialogRef<DialogAddChannelComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  saveChannel() {
    
    console.log('current Channel', this.channel)

   
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result: any) => {
        console.log('Adding Channel finisihed', result)
        this.dialogRef.close();
      });
  }
}

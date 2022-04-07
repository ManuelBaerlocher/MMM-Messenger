import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.class';


@Component({
  selector: 'app-dialog-edit-post',
  templateUrl: './dialog-edit-post.component.html',
  styleUrls: ['./dialog-edit-post.component.scss']
})
export class DialogEditPostComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  channelId: string = '';
  post: Post = new Post();
  function: string = '';



  constructor(public dialogRef: MatDialogRef<DialogEditPostComponent>, private firestore: AngularFirestore,
  ) { }



  ngOnInit(): void {
  }



  onNoClick() {
    this.dialogRef.close();
  }

  editPost() {
    this.post.edit = ', Edited'
    this.firestore
      .collection(this.function)
      .doc(this.channelId)
      .collection('posts')
      .doc(this.post.postId)
      .update({
        content: this.post.content,
        edit : this.post.edit
      })
      .then(() => {
        this.dialogRef.close();
      })
  }
}





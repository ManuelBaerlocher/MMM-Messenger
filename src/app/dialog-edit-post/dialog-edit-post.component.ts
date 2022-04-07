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
  channelId;
  post: Post = new Post();


  constructor(public dialogRef: MatDialogRef<DialogEditPostComponent>, private firestore: AngularFirestore,
  ) { }



  ngOnInit(): void {
    

  }

  onNoClick() {
    this.dialogRef.close();
  }

  editPost() {

    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('posts')
      .doc(this.post.postId)
      .update({  content: this.post.content  })
      .then(() => {
        this.dialogRef.close();
      })
  }
}





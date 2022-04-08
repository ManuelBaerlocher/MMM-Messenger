import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dialog-add-display-name',
  templateUrl: './dialog-add-display-name.component.html',
  styleUrls: ['./dialog-add-display-name.component.scss']
})
export class DialogAddDisplayNameComponent implements OnInit {
  displayName: string = ''

  constructor(public dialogRef: MatDialogRef<DialogAddDisplayNameComponent>, public auth: AngularFireAuth,) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {

  }
  saveName() {
    this.auth.currentUser.then((result: any) => {
      result.updateProfile({
        displayName: this.displayName,
      }).then((result: any) => {
        console.log(result)
        this.dialogRef.close();
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concatMap, tap } from 'rxjs';
import { ProfileUser } from '../models/user-profile';
import { ImageUploadService } from '../service/image-upload.service';
import { UsersService } from '../service/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.userService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  uploadImage(event: any, user: ProfileUser) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Image is Uploading',
          success: 'Image Uploaded',
          error: 'There was an error while Uploading this Image',
        }
        ),
        concatMap((photoURL) => this.userService.updateUser({ uid: user.uid, photoURL }))
      ).subscribe();
  }

  saveProfile() {
    const profileData = this.profileForm.value;
    this.userService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: 'Updating data...',
        success: 'Data has been updated',
        error: 'There was an eroor while updating the data'
      })
    )
    .subscribe();
  }

  autofill(){
    var me =  (document.getElementById("code") as HTMLInputElement).value;
    console.log(me);
  }
}

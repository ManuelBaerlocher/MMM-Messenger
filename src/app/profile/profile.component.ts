import { Component, OnInit } from '@angular/core';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { User } from 'firebase/auth';
import { concatMap } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { ImageUploadService } from '../service/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.authService.currentUser$;

  constructor(
    private authService: AuthenticationService, 
    private imageUploadService: ImageUploadService, 
    private toast: HotToastService,
    ) { }

  ngOnInit(): void {
  }

  uploadImage(event:any, user: User) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe(
        {
          loading: 'Image is Uploading',
          success: 'Image Uploaded',
          error: 'There was an error while Uploading this Image'
        }
      ),
      concatMap((photoURL) => this.authService.updateProfileData({photoURL}))
    ).subscribe();
  }
}

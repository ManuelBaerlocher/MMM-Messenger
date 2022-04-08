import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SnackBarLoginComponent } from '../snack-bar-login/snack-bar-login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DialogAddDisplayNameComponent } from '../dialog-add-display-name/dialog-add-display-name.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })




  constructor(
    private router: Router,
    public authS: AuthService,
    private _snackBar: MatSnackBar,
    public auth: AngularFireAuth,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  submit() {
    if (!this.loginForm.valid) {
      console.log('test')
    } else {
      const { email, password } = this.loginForm.value;
      this.auth.signInWithEmailAndPassword(email, password).then((result: any) => {
        if (result.user.displayName == null) {
          this.dialog.open(DialogAddDisplayNameComponent)
          this.router.navigate([''])
        } else {
          this.router.navigate([''])
          this._snackBar.openFromComponent(SnackBarLoginComponent, {
            data: 'Welcome ' + result.user.displayName,
            duration: 5000,
          });
        }
      })
        .catch((error) => {
          this._snackBar.openFromComponent(SnackBarLoginComponent, {
            data: error.code,
            duration: 5000,
          });
        });
    }
  }

  anoymous() {
    this.auth.signInAnonymously().then((result: any) => {
      console.log(result)
      this.dialog.open(DialogAddDisplayNameComponent)
      this.router.navigate([''])

    });
  }
}


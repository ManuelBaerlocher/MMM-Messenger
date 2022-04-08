import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { SnackBarLoginComponent } from '../snack-bar-login/snack-bar-login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  test = []
  errorMessage: string = ""

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }


  changeUserName() {
    this.auth.currentUser.then((result: any) => {
      result.updateProfile({
        displayName: "Manuel Bärlocher",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/mmm-messenger.appspot.com/o/images%2Fprofile%2FLsqPMQVJ1ZhVcKcHAAxkq9vX9qS2?alt=media&token=40ac35d5-9f28-47bc-8bce-df9896eea157"
      }).then((result: any) => {
        this.checkCurrentUser()
      });
    });
  }


  checkCurrentUser() {

    this.auth.currentUser.then((result: any) => {
      result.displayName
      console.log('user', result)
      return result.displayName;
    });

  }

  checkDisplayName() {
    this.auth.onAuthStateChanged((user: any) => {
      if (user) {
        user.updateDisplayName(user)
        console.log(user)
        return user._delegate.displayName
      } else {
        return "Username fehlt"
      }
    });
  }

  testManuel() {
    this.auth.currentUser.then((test) => {
      console.log('test', test);

    })



  }

  logout() {
    this.auth.signOut().then((result: any) => {
      console.log('new Chat', result)
      this.router.navigate([''])
    });;

  }

  google() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result: any) => {

      this.test = result
      console.log('google', this.test)
      this.router.navigate([''])
    });
  }

  anoymous() {
    this.auth.signInAnonymously().then((result: any) => {

      this.test = result

      console.log('anoymous', this.test)

      this.router.navigate([''])

    });
  }

  // mail(email, password) {

  //   this.auth.signInWithEmailAndPassword(email, password).then((result: any) => {
  //     this.router.navigate([''])
  //     this._snackBar.openFromComponent(SnackBarLoginComponent, {
  //       data: 'Welcome ' + result.user.displayName,
  //       duration: 5000,
  //     });
  //   })
  //     .catch((error) => {
  //       this._snackBar.openFromComponent(SnackBarLoginComponent, {
  //         data: error.code,
  //         duration: 5000,
  //       });
  //     });
  // }
}

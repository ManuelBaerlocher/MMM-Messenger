import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  test = []
  errorMessage: string = ""

  constructor(
    public auth: AngularFireAuth,
    private router: Router,

  ) { }


  changeUserName(name) {
    this.auth.currentUser.then((result: any) => {
      result.updateProfile({
        displayName: name,
        // photoURL: "https://firebasestorage.googleapis.com/v0/b/mmm-messenger.appspot.com/o/images%2Fprofile%2FLsqPMQVJ1ZhVcKcHAAxkq9vX9qS2?alt=media&token=40ac35d5-9f28-47bc-8bce-df9896eea157"
      }).then((result: any) => {
        this.checkCurrentUser()
      });
    });
  }


  checkCurrentUser() {
    let name: string = ''
    this.auth.currentUser.then((result: any) => {
      name = result.displayName

    });
    return name
  }

  checkUserDisplayName() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user: any) => {
        if (user) {
          console.log(user)
          resolve(user.displayName)
        } else {
        }
      });
    })
  }

  checkUserId() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user: any) => {
        if (user) {
          resolve(user.uid)
        } else {
        }
      });
    })
  }

  checkUserPhotoUrl() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user: any) => {
        if (user) {
          if (user.photoURL == null) {
            resolve('assets/img/user-placeholder.png')
          } else {
            resolve(user.photoURL)
          }
        } else {
        }
      });
    })
  }



  checkUser(id) {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user: any) => {
        if (user) {
          resolve(id)
        } else {
        }
      });
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
}

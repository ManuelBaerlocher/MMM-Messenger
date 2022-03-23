import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, UserCredential, UserInfo } from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedin = false;
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  logout() {
    this.loggedin = false;
    return from(this.auth.signOut());
  }
}

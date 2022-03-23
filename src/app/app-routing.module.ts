import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './profile/profile.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectToHome) },
  { path: 'signUp', component: SignUpComponent, ...canActivate(redirectToHome) },
  { path: 'home', component: HomeComponent, ...canActivate(redirectToLogin) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin) },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

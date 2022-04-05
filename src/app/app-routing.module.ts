import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { ChannelComponent } from './channel/channel.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectToHome) },
  { path: 'signUp', component: SignUpComponent, ...canActivate(redirectToHome) },
  { path: 'home', component: HomeComponent, ...canActivate(redirectToLogin) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin) },
  { path: 'message/:id', component: MessageComponent, ...canActivate(redirectToLogin) },
  { path: 'channel/:id', component: ChannelComponent, ...canActivate(redirectToLogin) },
  { path: 'impressum', component: ImpressumComponent, ...canActivate(redirectToLogin) },
  { path: 'data-protection', component: DataProtectionComponent, ...canActivate(redirectToLogin) },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

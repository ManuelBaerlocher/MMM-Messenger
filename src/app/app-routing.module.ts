import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { ChannelComponent } from './channel/channel.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  { path: 'signUp', component: SignUpComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'message/:id', component: MessageComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'channel/:id', component: ChannelComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'impressum', component: ImpressumComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'data-protection', component: DataProtectionComponent, ...canActivate(redirectUnauthorizedToLogin) },

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

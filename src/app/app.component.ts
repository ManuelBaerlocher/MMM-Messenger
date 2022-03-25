import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$ = this.userService.currentUserProfile$;
  title = 'mmm-messenger';
  public loggedin = false;
  channellist = ['Channel 1', 'Channel 2'];
  userlist =['User 1', 'User 2'];

  constructor(
    public authService: AuthenticationService, 
    private router: Router,
    private userService: UsersService,  
  ) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
    })
  }
}

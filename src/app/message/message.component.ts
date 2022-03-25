import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { AuthenticationService } from '../service/authentication.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;

  users: any = [];
  
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public userService: UsersService,
    public authService: AuthenticationService, 
  ) {
    

  }

  ngOnInit(): void {
  }

}

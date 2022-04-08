import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-snack-bar-login',
  templateUrl: './snack-bar-login.component.html',
  styleUrls: ['./snack-bar-login.component.scss'],

})
export class SnackBarLoginComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}

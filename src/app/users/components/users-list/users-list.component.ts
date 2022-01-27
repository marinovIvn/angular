import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AllUsers } from '../../models/users.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allusers: AllUsers[] = [];

  hasPermissions: boolean | undefined;

  constructor(
    private authService: AuthService,
    private usersService: UsersService

  ) { }
  ngOnInit(): void {
    this.hasPermissions = this.authService.showAllusersPremission('admin');


    this.usersService.getAllUsers$().subscribe({
      next: (response: AllUsers[]) => {
        console.log(response);
        this.allusers = response;
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      }

    });
  }
}

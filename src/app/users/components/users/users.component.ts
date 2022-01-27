import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  static forChild(routes: import("@angular/router").Route[]): any[] | import("@angular/core").Type<any> {
    throw new Error("Method not implemented.");
  }
  constructor() { }

  ngOnInit(): void {
  }

}

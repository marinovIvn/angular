import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  static forChild(routes: import("@angular/router").Route[]): any[] | import("@angular/core").Type<any> {
      throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit(): void {
  }

}

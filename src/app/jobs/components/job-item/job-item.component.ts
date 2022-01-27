import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
//import { EventEmitter } from 'stream';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent  implements OnInit{

  hasNotPremission: boolean | undefined;

  @Input() job!: Job;

  @Output() deleteClicked = new EventEmitter<number>();
  
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.hasNotPremission = this.authService.hasNotPermissions('user');
  }

  onDelete(): void {
    this.deleteClicked.emit(this.job.id);
  }

}

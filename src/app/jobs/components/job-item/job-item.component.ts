import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { EventEmitter } from 'stream';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent {

  @Input() job!: Job;

  @Output() deleteClicked = new EventEmitter<number>(); 

  onDelete(): void {
    this.deleteClicked.emit(this.job.id);
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private JobsService: JobsService) {

  }

  ngOnInit(): void {
    this.JobsService.getJobs$().subscribe({
      next: (response: Job[]) => {
        //console.log(response);
        this.jobs = response;
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      }

    });

  }
  onDelete(id: number): void{
    this.JobsService.deleteJob$(id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(job => job.id != id);
      }
    });
  }

}







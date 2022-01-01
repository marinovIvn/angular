import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Job } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder, 
    private jobService: JobsService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm(); 
    // get value for edit
    this.route.params.pipe(

      switchMap((params) => {
        const id = params['id'];
        if (id) {
          return this.jobService.getJob$(id);
        }
        return of();
      }),

      takeUntil(this.destroy$)

    ).subscribe({
      next: (response) => {
         this.buildForm(response);
      }
    });

    
  }

  //destroy if user leave page
  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const job = this.formGroup.value as Job;

    let request$;

    if (!job.id) {
      request$ = this.jobService.postJob$(job);
      
    } else{
      request$ = this.jobService.putJob$(job);
    }
    request$.subscribe({
      next: () => {
        this.router.navigate(['/main', 'jobs']);
      }
    });
    //console.log(this.formGroup);
  }

  // init form
  private buildForm(job?: Job): void {
    this.formGroup = this.fb.group({
      id: job?.id,
      title: [job?.title || '', [Validators.required]],
      description: [job?.description || ''],
      author: [job?.author || '', [Validators.required]]
    });
  }

}

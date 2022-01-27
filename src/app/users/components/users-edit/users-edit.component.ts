import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AllUsers } from '../../models/users.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  formGroup!: FormGroup;

  @Input() user!: AllUsers;

  destroy$ = new Subject<boolean>();

  @Output() deleteClicked = new EventEmitter<number>();
  authService: any;
  

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.buildForm();
    // get value for edit
    this.route.params.pipe(

      switchMap((params) => {

    
        const {id} = JSON.parse(AuthService.getCurrentUser());
     

        if (id) {
          return this.userService.getUser$(id);
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
    const user = this.formGroup.value as AllUsers;

    let request$;

    request$ = this.userService.putUser$(user);
    console.log(user);
    
    request$.subscribe({
      next: () => {
        this.router.navigate(['/main', 'jobs']);
      }
    });
    //console.log(this.formGroup);
  }

  // init form
  private buildForm(user?: AllUsers): void {

    console.log(this.formGroup);

    this.formGroup = this.fb.group({
      id: user?.id,
      username: [user?.username || '', [Validators.required]],
      password: [user?.password || '', [Validators.required]],
      email: user?.email,
      role: user?.role
    });
  }

  deleteUser(): void {
    const user = this.formGroup.value as AllUsers;
    //console.log(user.id)

    if (confirm("Are you sure you want to delete user with ID - " + user.id + " and username - " + user.username + "?")) {

      this.userService.deleteUser$(user.id).subscribe(
        (res) => console.log(res)
        );
      localStorage.removeItem('loggedUser');
      this.router.navigate(['/auth', 'login']);
     
      
    }
  


    

  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSevice: AuthService
    ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(): void{
    const body = this.formGroup.value as Login;
    this.authSevice.login$(body).subscribe({
      next: (user: User) => {
        // set user in local storage
        this.authSevice.setLoggedUserInLocalStorage(user);
        this.router.navigate(['/main']);
      }
    })
  }

}

import { HttpHeaders } from "@angular/common/http";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { User } from "../auth/models/user.model";
import { AuthService } from "../auth/services/auth.service";
import { AllUsers } from "../users/models/users.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Input() user!: User;

    hasUser: boolean | undefined;

    destroy$ = new Subject<boolean>();
    

    constructor (
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        

        this.authService.getHasUser$().pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (hasUser) => {
                this.hasUser = hasUser;
                //console.log(hasUser);
            }
        })  

        
    }
    
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/auth', 'login']);
    }
}

function body(body: any) {
    throw new Error("Function not implemented.");
}

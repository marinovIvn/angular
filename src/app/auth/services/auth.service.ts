import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    hasNotPermissionsForUser(arg0: string) {
      throw new Error('Method not implemented.');
    }

    hasUser$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient){

    }

    login$(data: Login): Observable<any> {
        return this.http.get<User[]>(environment.apiUrl + '/users').pipe(
            map( (response: User[]) =>{
                
                const user = response.find((u => u.username === data.username && u.password === data.password));
                if (!user){
                    return null;
                }
                
                return user;
                
            })
        )
    }
    static getCurrentUser(): any {
        return localStorage.getItem('loggedUser');
    }
    

    logout(): void {
       localStorage.removeItem('loggedUser'); 
       this.setHasUser(false);
    }

    
    
    setLoggedUserInLocalStorage(user: User): void {
        delete user.password;
        delete user.email;

        localStorage.setItem('loggedUser', JSON.stringify(user));

        this.setHasUser(true);


    }

    setLoggedUserFromLocalStorage(): User {

        const loggedUsers = JSON.parse(localStorage.getItem('loggedUser')!);
        if (loggedUsers) {
            this.setHasUser(true);
        }
        return loggedUsers;
    }

    getHasUser$(): Observable<boolean> {
        return this.hasUser$.asObservable();
    }

    setHasUser(value: boolean): void {
        this.hasUser$.next(value);
    }

    hasNotPermissions(role: string): boolean{
        const loggedUser = this.setLoggedUserFromLocalStorage();
        return loggedUser.role !== role;
    }

    showAllusersPremission(role: string): boolean {
        const loggedUser = this.setLoggedUserFromLocalStorage();
        return loggedUser.role === role;
    }

}
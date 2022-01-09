import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
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

    
    setLoggedUserInLocalStorage(user: User): void {
        delete user.password;
        delete user.email;

        localStorage.setItem('loggedUser', JSON.stringify(user));


    }

    setLoggedUserFromLocalStorage(): User {

        const loggedUsers = JSON.parse(localStorage.getItem('loggedUser')!);

        return loggedUsers;
    }

    hasNotPermissions(role: string): boolean{
        const loggedUser = this.setLoggedUserFromLocalStorage();
        return loggedUser.role !== role;
    }

}
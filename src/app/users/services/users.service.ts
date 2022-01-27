import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AllUsers } from "../models/users.model";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(private http: HttpClient) {

    }
    getAllUsers$(): Observable<AllUsers[]> {
        return this.http.get<AllUsers[]>(environment.apiUrl + '/users');
    };

    getUser$(id: number): Observable<AllUsers> {
        return this.http.get<AllUsers>((environment.apiUrl + '/users/' + (id)));
    }

    putUser$(user: AllUsers): Observable<AllUsers> {
        return this.http.put<AllUsers>((environment.apiUrl + '/users/' + (user.id)), user);
    }

    deleteUser$(id: number): Observable<void> {
        return this.http.delete<void>((environment.apiUrl + '/users/' + (id)));
    }
}
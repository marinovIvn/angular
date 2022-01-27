import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersComponent } from "./components/users/users.component";
import { UsersEditComponent } from "./components/users-edit/users-edit.component";
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersRoutingModule } from "./users-routing-module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        UsersEditComponent,
        UsersListComponent

    ]
})
export class UsersModule {

}
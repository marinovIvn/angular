import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AclGuard } from "../guards/acl.guard";
import { UsersEditComponent } from "./components/users-edit/users-edit.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { UsersComponent } from "./components/users/users.component";

const routes: Route[] = [
    {
        path: '',
        component: UsersComponent,
        children: [

            {
                path: 'users',
                component: UsersListComponent
            },
           
            {
                path: 'users/change',
                component: UsersEditComponent,
            
                
            },
            {
                path: 'users/change/:id',
                component: UsersEditComponent, 

            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'users'
            },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class UsersRoutingModule {

}
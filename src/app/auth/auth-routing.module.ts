import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { LoginComponent } from "./components/login/login.component";

const routers: Route[] = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routers)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule{

}
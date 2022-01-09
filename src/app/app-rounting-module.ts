import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NonAuthGurd } from "./guards/non-auth.guard";

const routes: Route[] = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canLoad: [NonAuthGurd]
    },

    {
        path: 'main',
        loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule),
        canLoad: [AuthGuard]
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
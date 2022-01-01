import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { JobFormComponent } from "./components/job-form/job-form.component";
import { JobsListComponent } from "./components/jobs-list/jobs-list.component";
import { JobsComponent } from "./components/jobs/jobs.component";

const routes: Route[] = [
    {
        path: '',
        component: JobsComponent,
        children: [
            {
                path: 'jobs',
                component: JobsListComponent
            },
            { 
                path: 'jobs/edit',
                component: JobFormComponent
            },
            {
                path: '/jobs/edit/id',
                component: JobFormComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'jobs'
            },
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class JobsRoutingModule{

}
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { JobFormComponent } from "./components/job-form/job-form.component";
import { JobItemComponent } from "./components/job-item/job-item.component";
import { JobsListComponent } from "./components/jobs-list/jobs-list.component";
import { JobsComponent } from "./components/jobs/jobs.component";
import { JobsRoutingModule } from "./jobs-routing-module";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        JobsRoutingModule
    ],
    declarations: [
        JobsListComponent,
        JobFormComponent,
        JobItemComponent,
        JobsComponent
    ]
})
export class JobsModule {

}
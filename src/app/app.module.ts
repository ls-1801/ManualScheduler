import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {OrderByPipe, TestbedComponent} from './slots/testbed.component';
import {rxStompServiceFactory} from "./rx-stomp-service-factory";
import {RxStompService} from "./rx-stomp.service";
import {SchedulingComponent} from './scheduling/scheduling.component';
import {JobsComponent} from './jobs/jobs.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { SlotBasedBuilderComponent } from './scheduling/slot-based-builder/slot-based-builder.component';
import { JobStateFilterPipe } from './scheduling/job-state-filter.pipe';
import { TestbedSelectorComponent } from './slot-selector/testbed-selector.component';
import { SchedulingSelectorComponent } from './scheduling-selector/scheduling-selector.component';
import { JobComponent } from './jobs/job/job.component';
import { SchedulingBuilderComponent } from './scheduling/scheduling-builder/scheduling-builder.component';
import { QueueBasedBuilderComponent } from './scheduling/queue-based-builder/queue-based-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    TestbedComponent,
    SchedulingComponent,
    JobsComponent,
    SlotBasedBuilderComponent,
    JobStateFilterPipe,
    OrderByPipe,
    TestbedSelectorComponent,
    SchedulingSelectorComponent,
    JobComponent,
    SchedulingBuilderComponent,
    QueueBasedBuilderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

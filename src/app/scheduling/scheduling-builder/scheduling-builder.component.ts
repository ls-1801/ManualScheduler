import {Component, OnInit} from '@angular/core';
import {ExternalSchedulerInterfaceService} from "../../interface/external-scheduler-interface.service";
import {Observable} from "rxjs";
import {ExternalScheduling, ExternalTestbed} from "../../interface/ExternalScheduling";

@Component({
  selector: 'app-scheduling-builder',
  templateUrl: './scheduling-builder.component.html',
  styleUrls: ['./scheduling-builder.component.css']
})
export class SchedulingBuilderComponent implements OnInit {

  testbeds$: Observable<Array<ExternalTestbed>>;

  schedulingSpec: any = {
    testBed: null,
    name: null,
    slots: null,
    jobStatus: null,
    state: null,
    queue: null
  }
  schedulingMode: "queue" | "slots" = "slots";


  constructor(private externalInterface: ExternalSchedulerInterfaceService) {
    this.testbeds$ = this.externalInterface.listTestbeds();
  }

  ngOnInit(): void {

  }

  specChange($event: any) {
    if (this.schedulingMode === 'slots') {
      this.schedulingSpec.slots = $event
    } else {
      this.schedulingSpec.queue = $event
    }
  }

  create() {
    let scheduling: ExternalScheduling = {
      testBed: this.schedulingSpec.testBed.name,
      slots: this.schedulingMode === 'slots' ? this.schedulingSpec.slots : null,
      name: this.schedulingSpec.name,
      state: "InitialState",
      jobStatus: [],
      queue: this.schedulingMode === 'queue' ? this.schedulingSpec.queue : null,
    }
    this.externalInterface.createScheduling(scheduling).subscribe((s) => {
      this.reset();
    })
  }

  reset() {
    this.schedulingSpec = {
      testBed: null,
      name: null,
      slots: null,
      jobStatus: null,
      state: null,
      queue: null
    };
  }
}

import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExternalBatchJob, ExternalSlotScheduling, ExternalTestbed} from "../../interface/ExternalScheduling";
import {ExternalSchedulerInterfaceService} from "../../interface/external-scheduler-interface.service";
import {map} from "rxjs";

@Component({
  selector: 'app-queue-based-builder',
  templateUrl: './queue-based-builder.component.html',
  styleUrls: ['./queue-based-builder.component.css']
})
export class QueueBasedBuilderComponent implements OnInit {

  jobs: Array<String> = []

  @Output()
  specChange = new EventEmitter();

  @Input()
  testbed?: ExternalTestbed;

  availableJobs: Array<ExternalBatchJob> = []

  constructor(private externalInterface: ExternalSchedulerInterfaceService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Change")
    // @ts-ignore
    this.testbed = changes.testbed.currentValue;
    this.jobs = [];
    this.availableJobs = [];
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.externalInterface.listJobs().pipe(
      map(jbn => Object.values(jbn))
    )
      .subscribe((jobs) => this.availableJobs = jobs)
  }


  updateOutput() {
    this.specChange.emit(this.jobs);
  }

  addJob(availableJob: ExternalBatchJob) {
    this.jobs.push(availableJob.name);
    this.updateOutput();
  }

  reorder(jobIndex: number, positionInc: number) {
    if (positionInc == 1 && jobIndex == 0) {
      return;
    }
    if (positionInc == -1 && jobIndex == this.jobs.length - 1) {
      return;
    }


    let tmp = this.jobs[jobIndex - positionInc];
    this.jobs[jobIndex - positionInc] = this.jobs[jobIndex];
    this.jobs[jobIndex] = tmp;

    this.updateOutput();
  }

  remove(ji: number) {
    this.jobs.splice(ji, 1);
    this.updateOutput();
  }
}

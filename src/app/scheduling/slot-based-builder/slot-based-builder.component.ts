import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExternalBatchJob, ExternalSlotScheduling, ExternalTestbed} from "../../interface/ExternalScheduling";
import {ExternalSchedulerInterfaceService} from "../../interface/external-scheduler-interface.service";
import {map} from "rxjs";

@Component({
  selector: 'app-slot-based-builder',
  templateUrl: './slot-based-builder.component.html',
  styleUrls: ['./slot-based-builder.component.css']
})
export class SlotBasedBuilderComponent implements OnInit, OnChanges {

  strict: boolean = true;

  spec: ExternalSlotScheduling = {
    mode: '',
    jobs: []
  };

  @Output()
  specChange = new EventEmitter();

  @Input()
  testbed?: ExternalTestbed;

  get nNodes(): number {
    return Object.keys(this.testbed!!.slotsByNode).length
  }

  get nSlots(): number {
    var slotsPerNode = Object.keys(this.testbed!!.slotsByNode[Object.keys(this.testbed!!.slotsByNode)[0]]).length;
    return this.nNodes * slotsPerNode;
  }

  jobs: Array<{ name: string, slots: Array<boolean> }> = [];

  availableJobs: Array<ExternalBatchJob> = []

  constructor(private externalInterface: ExternalSchedulerInterfaceService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // @ts-ignore
    this.testbed = changes.testbed.currentValue;
    this.spec = {
      mode: '',
      jobs: []
    };
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

  toggle(job: { name: string; slots: Array<boolean> }, i: number) {
    console.log(i, job.slots);
    job.slots[i] = !job.slots[i];

    this.updateOutput();
  }


  updateOutput() {
    let toIndices = (bools: Array<boolean>) => {
      let indices = [];
      for (let i = 0; i < bools.length; i++) {
        if (bools[i]) indices.push(i);
      }

      return indices;
    }

    this.spec.mode = this.strict ? "STRICT" : "RELAXED";
    this.spec.jobs = this.jobs.map(item => {
      return {name: item.name, slots: toIndices(item.slots)}
    });
    this.specChange.emit(this.spec);
  }

  filterAvailableJobs() {
    return this.availableJobs.filter(job => this.spec.jobs.filter(job1 => job.name === job1.name).length == 0);
  }

  addJob(availableJob: ExternalBatchJob) {
    this.jobs.push({name: availableJob.name, slots: new Array(this.nSlots).fill(false)});
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

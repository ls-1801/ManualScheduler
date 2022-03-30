import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExternalSchedulerInterfaceService} from "../interface/external-scheduler-interface.service";
import {Observable} from "rxjs";
import {ExternalScheduling, ExternalTestbed} from "../interface/ExternalScheduling";


@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  @Input()
  schedulingName: string = "";

  @Output()
  onDelete = new EventEmitter();

  scheduling$?: Observable<ExternalScheduling>
  testbed$?: Observable<ExternalTestbed>

  constructor(private externalInterface: ExternalSchedulerInterfaceService) {
  }

  delete() {
    this.externalInterface.deleteScheduling(this.schedulingName)
      .subscribe(() => {
        console.log("deleted");
        this.onDelete.emit(true);
      });
  }

  subscribeToTestbed(scheduling: ExternalScheduling){
    this.testbed$ = this.externalInterface.getTestbed(scheduling.testBed);
  }

  ngOnInit(): void {
    this.scheduling$ = this.externalInterface.getScheduling(this.schedulingName);

    this.scheduling$.subscribe({
      next: (scheduling) => this.subscribeToTestbed(scheduling),
      complete: () => this.onDelete.emit(true)
    });
  }

  hasJobsWithState(scheduling: ExternalScheduling, stateName: string) {
    return scheduling.jobStatus.filter(js => js.state === stateName).length > 0;
  }
}

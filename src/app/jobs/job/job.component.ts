import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExternalSchedulerInterfaceService} from "../../interface/external-scheduler-interface.service";
import {Observable} from "rxjs";
import {ExternalBatchJob} from "../../interface/ExternalScheduling";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  @Input()
  jobName: string = "";
  @Output("removed")
  removeEvent = new EventEmitter();

  job$?: Observable<ExternalBatchJob>


  constructor(private externalInterface: ExternalSchedulerInterfaceService) {
  }


  ngOnInit(): void {
    this.job$ = this.externalInterface.getJob(this.jobName);

    this.job$.subscribe({
      complete: () => this.removeEvent.emit(true)
    });
  }

}

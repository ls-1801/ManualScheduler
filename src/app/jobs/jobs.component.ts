import {Component, OnInit} from '@angular/core';
import {ExternalSchedulerInterfaceService} from "../interface/external-scheduler-interface.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobNames: Set<string> = new Set<string>();

  constructor(private externalInterface: ExternalSchedulerInterfaceService) {

  }

  ngOnInit(): void {
    this.externalInterface.listJobs()
      .subscribe(jobs => {
        this.jobNames = new Set(Object.values(jobs).map(job => job.name));
      });
    this.externalInterface.listenForJobs().subscribe(modification => {
      let jobName = modification.resource;
      if (modification.action === "DELETED") {
        this.jobNames.delete(jobName);
      } else {
        this.jobNames.add(jobName);
      }
    });
  }
}

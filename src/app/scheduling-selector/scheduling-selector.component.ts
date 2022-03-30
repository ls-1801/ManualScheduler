import {Component, OnInit} from '@angular/core';
import {ExternalSchedulerInterfaceService} from "../interface/external-scheduler-interface.service";

@Component({
  selector: 'app-scheduling-selector',
  templateUrl: './scheduling-selector.component.html',
  styleUrls: ['./scheduling-selector.component.css']
})
export class SchedulingSelectorComponent implements OnInit {

  schedulingNames: Set<string> = new Set<string>();
  selectedSchedulings: { [index: string]: boolean } = {};


  constructor(private externalInterface: ExternalSchedulerInterfaceService) {


  }

  ngOnInit() {
    this.externalInterface.listSchedulings()
      .subscribe(schedulings => {
        this.schedulingNames = new Set(schedulings.map(scheduling => scheduling.name));
        this.schedulingNames.forEach(schedulingName => {
          this.selectedSchedulings[schedulingName] = true;
        })
      });
    this.externalInterface.listenForSchedulings().subscribe(modification => {
      let schedulingName = modification.resource;
      if (modification.action === "DELETED") {
        console.log("DELETED", schedulingName)
        this.schedulingNames.delete(schedulingName)
        delete this.selectedSchedulings[schedulingName];
        console.log(this.schedulingNames)
      }
      if (modification.action === "ADDED") {
        this.schedulingNames.add(schedulingName)
        this.selectedSchedulings[schedulingName] = true;
      }

      if (modification.action === "MODIFIED") {
        this.schedulingNames.add(schedulingName)
        if (this.selectedSchedulings[schedulingName] == undefined) {
          this.selectedSchedulings[schedulingName] = true;
        }
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {ExternalSchedulerInterfaceService} from "../interface/external-scheduler-interface.service";

@Component({
  selector: 'app-slot-selector',
  templateUrl: './testbed-selector.component.html',
  styleUrls: ['./testbed-selector.component.css']
})
export class TestbedSelectorComponent implements OnInit {

  testbedNames: Set<string> = new Set<string>();
  selectedTestbeds: { [index: string]: boolean } = {};


  constructor(private externalInterface: ExternalSchedulerInterfaceService) {


  }

  ngOnInit() {
    this.externalInterface.listTestbeds()
      .subscribe(testbeds => {
        this.testbedNames = new Set(testbeds.map(testbed => testbed.name));
        this.testbedNames.forEach(testbedName => {
          this.selectedTestbeds[testbedName] = true;
        })
      });
    this.externalInterface.listenForTestbeds().subscribe(modification => {
      let testbedName = modification.resource;
      if (modification.action === "DELETED") {
        this.testbedNames.delete(testbedName)
        delete this.selectedTestbeds[testbedName];
      }
      if (modification.action === "ADDED") {
        this.testbedNames.add(testbedName)
        this.selectedTestbeds[testbedName] = true;
      }

      if (modification.action === "MODIFIED") {
        this.testbedNames.add(testbedName)
        if (this.selectedTestbeds[testbedName] == undefined) {
          this.selectedTestbeds[testbedName] = true;
        }
      }
    });
  }
}

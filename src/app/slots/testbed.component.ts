import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {orderBy} from 'lodash';
import {ExternalSchedulerInterfaceService} from "../interface/external-scheduler-interface.service";
import {Observable} from "rxjs";
import {ExternalTestbed} from "../interface/ExternalScheduling";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, sortBy: string, order?: string): any[] {
    const sortOrder = order ? order : 'asc'; // setting default ascending order

    // @ts-ignore
    return orderBy(array, [sortBy], [sortOrder]);
  }
}

@Component({
  selector: 'app-testbed',
  templateUrl: './testbed.component.html',
  styleUrls: ['./testbed.component.css']
})
export class TestbedComponent implements OnInit {

  @Input()
  testbedName: string = "";
  @Output("removed")
  removeEvent = new EventEmitter();

  testbed$?: Observable<ExternalTestbed>;

  constructor(private externalInterface: ExternalSchedulerInterfaceService) {

  }

  ngOnInit(): void {
    this.testbed$ = this.externalInterface.getTestbed(this.testbedName)
    this.testbed$.subscribe({complete: () => this.removeEvent.emit(true)});
  }

  getNodes(testbed: ExternalTestbed) {
    var nodes = Object.keys(testbed.slotsByNode);
    nodes.sort((n1, n2) => testbed.slotsByNode[n1][0].nodeId - testbed.slotsByNode[n2][0].nodeId);

    return nodes;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import {ExternalBatchJobSchedulingStatus} from "../interface/ExternalScheduling";

@Pipe({
  name: 'jobStateFilter'
})
export class JobStateFilterPipe implements PipeTransform {


  transform(value: ExternalBatchJobSchedulingStatus[], state = "InQueue"): ExternalBatchJobSchedulingStatus[] {
    return value.filter(jobState => jobState.state.toLowerCase() === state.toLowerCase());
  }

}

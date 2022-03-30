import { TestBed } from '@angular/core/testing';

import { ExternalSchedulerInterfaceService } from './external-scheduler-interface.service';

describe('ExternalSchedulerInterfaceService', () => {
  let service: ExternalSchedulerInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalSchedulerInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

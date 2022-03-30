import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueBasedBuilderComponent } from './queue-based-builder.component';

describe('QueueBasedBuilderComponent', () => {
  let component: QueueBasedBuilderComponent;
  let fixture: ComponentFixture<QueueBasedBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueBasedBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueBasedBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

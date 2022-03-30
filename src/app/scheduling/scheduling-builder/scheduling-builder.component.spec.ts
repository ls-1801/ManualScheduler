import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingBuilderComponent } from './scheduling-builder.component';

describe('SchedulingBuilderComponent', () => {
  let component: SchedulingBuilderComponent;
  let fixture: ComponentFixture<SchedulingBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

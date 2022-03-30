import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingSelectorComponent } from './scheduling-selector.component';

describe('SchedulingSelectorComponent', () => {
  let component: SchedulingSelectorComponent;
  let fixture: ComponentFixture<SchedulingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

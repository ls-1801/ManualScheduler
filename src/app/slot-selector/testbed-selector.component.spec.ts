import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedSelectorComponent } from './testbed-selector.component';

describe('SlotSelectorComponent', () => {
  let component: TestbedSelectorComponent;
  let fixture: ComponentFixture<TestbedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestbedSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestbedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

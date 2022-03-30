import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotBasedBuilderComponent } from './slot-based-builder.component';

describe('SlotBasedBuilderComponent', () => {
  let component: SlotBasedBuilderComponent;
  let fixture: ComponentFixture<SlotBasedBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotBasedBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotBasedBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

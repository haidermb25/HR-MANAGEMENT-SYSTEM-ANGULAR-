import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceBoardComponent } from './attendance-board.component';

describe('AttendanceBoardComponent', () => {
  let component: AttendanceBoardComponent;
  let fixture: ComponentFixture<AttendanceBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendDialogBoxComponent } from './attend-dialog-box.component';

describe('AttendDialogBoxComponent', () => {
  let component: AttendDialogBoxComponent;
  let fixture: ComponentFixture<AttendDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendDialogBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

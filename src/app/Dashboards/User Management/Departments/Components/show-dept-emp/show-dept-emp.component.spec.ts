import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeptEmpComponent } from './show-dept-emp.component';

describe('ShowDeptEmpComponent', () => {
  let component: ShowDeptEmpComponent;
  let fixture: ComponentFixture<ShowDeptEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDeptEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDeptEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

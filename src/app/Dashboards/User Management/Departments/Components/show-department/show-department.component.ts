import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditDepartmentComponent } from '../add-edit-department/add-edit-department.component';
import { deptModel } from '../../Models/deptModel';
import { DepartmentServiceService } from '../../Services/department-service.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-department',
  standalone: true,
  imports: [
    CommonModule,
    AddEditDepartmentComponent,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './show-department.component.html',
  styleUrl: './show-department.component.css'
})
export class ShowDepartmentComponent {

  /*Declare the variables and objects*/
  array: string[] = ['Ali', 'Ahmad', 'Ali', 'Ahmad', 'Ali', 'Ahmad', 'Ali', 'Ahmad', 'Ali', 'Ahmad'];
  showDepartment: boolean = false;
  deptData: deptModel[] = [];
  deptId: number = -1;
  searchString:string=""
  //This is the constructor
  constructor(
    private deptService: DepartmentServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router // Inject the Router
  ) {}

  //On initializing the component
  ngOnInit(): void {
    this.showDeptData();
  }

  //Here we show departments in the div
  async showDeptData() {
    await this.deptService.getDeptData()
      .then((data: deptModel[]) => {
        this.deptData = data;
      },
      (err) => {
        console.error("Error Message", err);
      });
    this.cdr.detectChanges();
  }

  /*Edit the department*/
  editDepartment(deptId: number) {
    this.deptId = deptId;
    this.showDepartmentBox();
  }

  /*Delete the department data*/
  deleteDepartment(employeeId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deptService.deleteDepartment(employeeId)
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.showDeptData();
          })
          .catch((error) => {
            Swal.fire({
              title: "Problem!",
              text: "There is some problem in deletion.",
              icon: "error"
            });
          });
      }
    });
  }

  /*Show the department name on the base of the variable names*/
  showDepartmentBox() {
    this.showDepartment = true;
  }

  /*Close the department name on the base of the variable names*/
  closeDepartmentBox() {
    this.showDepartment = false;
    this.cdr.detectChanges();
    this.showDeptData();
  }
  /*Search the department*/
  searchDept(){
      this.deptService.searchDept(this.searchString)
                      .then((data:deptModel[])=>{
                                        this.deptData=data
                                    },
                            (error)=>{
                                        console.error("Error Message: ",error)
                                    })
  }
  /*Here we change the component*/
  showDeptEmp(id:number,name:string) {
    this.router.navigate(['/sideBar/deptEmp',id,name]); // Use the router to navigate
  }
}

import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentServiceService } from '../../Services/department-service.service';
import { userModel } from '../../../Employees/Models/user-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { deptModel } from '../../Models/deptModel';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-edit-department',
  standalone: true,
  imports: [
            CommonModule,
            ReactiveFormsModule],
  templateUrl: './add-edit-department.component.html',
  styleUrl: './add-edit-department.component.css'
})
export class AddEditDepartmentComponent {

  employeeData:userModel[]=[]
  @Output() dialogEmitter=new EventEmitter()
  @Input() deptId!:number 
  deptForm!:FormGroup
  //This is the constructor
  constructor(private deptService:DepartmentServiceService,private _fb:FormBuilder){}

  //Initializer
  ngOnInit(): void {
    this.deptForm=new FormGroup({
      deptName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      deptHeadId:new FormControl('')
    })
    this.loadEmployeeData()
  }

  //Get the value on changes
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['deptId']&&changes['deptId'].currentValue){
        this.deptId=changes['deptId'].currentValue
        this.loadData()
        this.loadEmployeeData()
    }
  } 


  //Here we load the data in the form
  loadData() {
    this.deptService.getDeptById(this.deptId)
      .then((data: deptModel[]) => {
        this.deptForm.patchValue({
          deptName: data[0].deptName,
          deptHeadId: data[0].departmentHeadId
        });
      }, (error) => {
        console.log("Error Message: ", error);
      });
  }
  

  //Add data in the database
  AddDept(){
    const deptValue=this.deptForm.value

    const department=new deptModel()
    department.deptName=deptValue.deptName
    department.departmentHeadId=deptValue.deptHeadId?Number(deptValue.deptHeadId):null
    if(this.deptId==-1){
        this.deptService.addDept(department)
                        .then((data)=>{
                                  this.closeDepartmentDialog()
                                  Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Your work has been saved",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                },
                              (error)=>{
                                Swal.fire({
                                  icon: "error",
                                  title: "Oops...",
                                  text: "Something went wrong!",
                                  footer: '<a href="#">Why do I have this issue?</a>'
                                });
                                }
                              )
        }
        else{
          department.departmentId=this.deptId
          this.deptService.updateDept(department)
                        .then((data)=>{
                                  this.closeDepartmentDialog()
                                  Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Your work has been saved",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                },
                              (error)=>{
                                Swal.fire({
                                  icon: "error",
                                  title: "Oops...",
                                  text: "Something went wrong!",
                                  footer: '<a href="#">Why do I have this issue?</a>'
                                });
                                }
                              )
        }
      this.deptId=-1
      this.deptForm.reset()
  }

  //Load Employee Data in the select box
   async loadEmployeeData(){
    await this.deptService.getEmployeeDataByDept(this.deptId)
                          .then((data:userModel[])=>{
                                          this.employeeData=data
                                        },
                                (error)=>{
                                          console.error("Error Message: ",error)
                                        })
  }
  //Function to close the dialog box
  closeDepartmentDialog(){
    this.deptForm.reset()
     this.dialogEmitter.emit()     
  }

  //Get the Controls
  get value(){
    return this.deptForm.controls;
  }
}

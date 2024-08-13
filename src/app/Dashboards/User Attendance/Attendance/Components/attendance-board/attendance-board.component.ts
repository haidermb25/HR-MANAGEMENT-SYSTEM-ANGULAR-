import { Component } from '@angular/core';
import { DepartmentServiceService } from '../../../../User Management/Departments/Services/department-service.service';
import { deptModel } from '../../../../User Management/Departments/Models/deptModel';
import { CommonModule } from '@angular/common';
import { userModel } from '../../../../User Management/Employees/Models/user-model';
import { AttendDialogBoxComponent } from '../attend-dialog-box/attend-dialog-box.component';
import { FormsModule } from '@angular/forms';
import { AttendanceServiceService } from '../../Services/attendance-service.service';
import { attendanceDay } from '../../Models/attendanceDay';
import { attendanceRecord } from '../../Models/attendanceRecord';
import e from 'express';
@Component({
  selector: 'app-attendance-board',
  standalone: true,
  imports: [CommonModule,
            AttendDialogBoxComponent,
            FormsModule
           ],
  templateUrl: './attendance-board.component.html',
  styleUrl: './attendance-board.component.css'
})
export class AttendanceBoardComponent {
      /*Declare the variable*/
      selectedDate!:Date
      employeeDataLength!:number
      deptData:deptModel[]=[]
      employeeAttendance!:attendanceRecord
      attendDay!:attendanceDay
      attendDayId!:number
      empData:userModel[]=[]
      deptId:number=0
      attendNone:boolean=false;
      attendPresent:boolean=false;
      attendApsent:boolean=false;
      attendLeave:boolean=true;
      showattend:boolean=false;
      /*End*/
    
    
      //This is the constructor
    constructor(private deptService:DepartmentServiceService,private attendService:AttendanceServiceService){}

    //This is the initialization function
    ngOnInit(): void {
      this.loadDepartmentData()
    }

    //Load the departments
    loadDepartmentData(){
      this.deptService.getDeptData()
                      .then((data:deptModel[])=>{
                                                  this.deptData=data
                                                },
                             (error)=>{
                                        console.error("There is some problem")
                                      })
    }


    //Get the department id
    getDeptId(event:Event){
        this.deptId=Number((event.target as HTMLSelectElement).value)
    }
    

    //Check the attendance Condition
    async checkAttendanceDay(date: Date): Promise<boolean> {
      try {
          const data = await this.attendService.getAttendanceDayInfo(date)
          if(data.length > 0){
            this.attendDayId=data[0].attendanceDayId?data[0].attendanceDayId:0
            return true
          }
          else{
            return false
          }
      } catch (error) {
          console.error("There is some error", error);
          return false;
      }
  }
  
   //Load the employees of the department
   async getDepartmentEmployee(){
       await this.deptService.getDeptEmployee(this.deptId)
                    .then((data:userModel[])=>{
                                                this.empData=data
                                                this.employeeDataLength=this.empData.length
                            
                                              },
                          (error)=>{
                                      console.error("There is some problem")
                                   })
  }

  //Store the department employee
  async storeDepartmentEmployee() {
    if (await this.checkAttendanceDay(this.selectedDate)) {
       alert("Hello EveryOne")
        const result=this.attendService.getEmployeeAttendanceInfo(this.attendDayId,this.deptId)
                                       .then((data:attendanceRecord[]|null)=>{
                                                        console.log(data)
                                                     },
                                             (error)=>{
                                                          console.error(error)
                                                      }  
                                            )
        }
      else{  
              //Get the employee of the given department and show
              await this.getDepartmentEmployee();
              
              // Save the day in the attendanceDay in the table
              this.attendDay=new attendanceDay()
              this.attendDay.attendanceDayDate = this.selectedDate; // No need for await here
              try {
                    const data = await this.attendService.insertAttendanceDay(this.attendDay);
                    this.attendDay = data;
      
                  } catch (error) {
                      console.log('Error Message:', error);
                  }
              console.log("Employee Data: ",this.empData)
              console.log(this.employeeDataLength)
              this.employeeAttendance=new attendanceRecord()
              this.employeeAttendance.attendanceDayId=this.attendDay.attendanceDayId
              this.employeeAttendance.attendanceID=-1
              this.employeeAttendance.checkInTime=null      
              this.employeeAttendance.checkOutTime=null
              this.employeeAttendance.status="none"
              this.employeeAttendance.deptID=this.deptId
              for(let i=0;i<this.employeeDataLength;i++){ 
                  this.employeeAttendance.employeeId=this.empData[i].employeeId
                  this.attendService.insertEmployeeAttendance(this.employeeAttendance)
              }
           }
}

  
   


    //Show the attendance box
    showAttendBox(){
      this.showattend=true
    }

    //Hide the attendance box
    hideAttendBox(){
      this.showattend=false
    }
    //Clear Data
    clearData(){
      this.empData=[]
    }
}

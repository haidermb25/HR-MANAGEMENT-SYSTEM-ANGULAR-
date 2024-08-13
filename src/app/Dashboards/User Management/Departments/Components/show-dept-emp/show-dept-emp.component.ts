import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DepartmentServiceService } from '../../Services/department-service.service';
import { userModel } from '../../../Employees/Models/user-model';
@Component({
  selector: 'app-show-dept-emp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-dept-emp.component.html',
  styleUrl: './show-dept-emp.component.css'
})
export class ShowDeptEmpComponent {
    deptId:number=-1
    empData:userModel[]=[]
    tablePaginatorCount:number=0
    deptName:string|null=""
    
    //This is the constructor 
    constructor(private route:ActivatedRoute,private deptService:DepartmentServiceService){}

    //On initializing of the component
    ngOnInit(): void {
      this.getId()
      this.getDeptEmployee()
    }

    //Here we get the deptId
    getId(){
      this.route.paramMap.subscribe(param=>{
        this.deptId=Number(param.get('id')),
        this.deptName=param.get('deptName')
      })
    }

    //Get the employee Data by the employee Id
    getDeptEmployee(){
      this.deptService.getDeptEmployee(this.deptId)
                      .then((data:userModel[])=>{
                                      this.empData=data
                                    },
                            (error)=>{
                                       console.error("There is some error")
                                     })
    }

    //Paginator counter changer function
  paginatorCountChanger(value:string){
    if(value==="Increment")
    {
      if(this.empData.length!==0)
        this.tablePaginatorCount+=1
        this.getDeptEmployee()
    }
    else
    {
      this.tablePaginatorCount = this.tablePaginatorCount > 0 ? this.tablePaginatorCount - 1 : this.tablePaginatorCount;
      this.getDeptEmployee()
    }
  }
}

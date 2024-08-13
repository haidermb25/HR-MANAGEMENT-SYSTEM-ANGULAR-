;import { UserInfoComponent } from '../user-info/user-info.component';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
import { UserServiceService } from '../../Services/user-service.service';
import { userModel } from '../../Models/user-model';
import { parentData } from '../../Models/parentData';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
              AddEditUserComponent,
              CommonModule,
              UserInfoComponent,
              FormsModule
           ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  /********Declare Variables and Objects********/
    
    showDialog:boolean=false
    showDetail:boolean=false
    userData!:userModel[]
    insertionVerification:boolean|undefined
    employeeId:number=-1
    searchTerm:string=''
    tablePaginatorCount:number=0;
    skip:number=0
    take:number=5
  /********End Declaration********/

  
  //This is the Constructor
  
   constructor(private userService:UserServiceService,private cdr:ChangeDetectorRef){}



  //On Initialize the Compponent
    
   ngOnInit(): void {
      this.showData()
    }

  
  
  //ShowData in Table by Change Object Value
   
   showData(){
        this.skip=this.tablePaginatorCount*this.take
        this.userService.getData(this.skip,this.take)
                        .then((data)=>{
                                        this.userData=data
                                      })
        this.cdr.detectChanges()   
    }

  //Paginator counter changer function
  paginatorCountChanger(value:string){
    if(value==="Increment")
    {
      if(this.userData.length!==0)
        this.tablePaginatorCount+=1
        this.showData()
    }
    else
    {
      this.tablePaginatorCount = this.tablePaginatorCount > 0 ? this.tablePaginatorCount - 1 : this.tablePaginatorCount;
      this.showData()
    }
  }

  //Here we search the employee
  searchEmployee() {
    this.userService.searchEmployee(this.searchTerm)
      .then((data:userModel[]) => {
            this.userData = data.slice(0, 5);
      });
  }
  

  //Show the DialogBox to Input the Employee Data by Change css Class 


    showDialogBoxForm(){
      this.showDialog=true
    }



  //Hide the DialogBox Where We Input the Employee Data by Change css Class 
    hideDialogBoxForm(value:string){
      this.showDialog=false;
      this.cdr.detectChanges()
      this.showData()
    }


  //Show the showUserDetailForm WHere We show the Employee Data by Change css Class

  
    showUserDetailForm(){
      this.showDetail=true    
    }


  //Hide the showUserDetailForm WHere We show the Employee Data by Change css Class
  
    hideUserDetailForm(value:boolean){
      this.showDetail=value
    }  


    
  //Show DialogBox to Edit the Employee Data by Passing the Employee Id Through Which We Can Access User Data
     
    editEmployee(employeeId:number){
      this.employeeId=employeeId
      this.showDialogBoxForm()
    }



    
    
  //Here We Show the PopUp after Successfully Inserted and Updated the Data in the Database
    // 1: Check if showDialog is false then 
    // 2: Check if insertion verification is correct then show successfull message,Otherwise show the error message
    
    
  
    




  //Here we Delete the Employee Data On the Basis of the User Id 
  
  async deleteEmployeeData(employeeId: number) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      if (result.isConfirmed) {
        try {
          await this.userService.deleteData(employeeId);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          this.showData();
        } catch (err) {
          Swal.fire({
            title: "Problem!",
            text: "There is some problem in deletion.",
            icon: "error"
          });
        }
      }
    } catch (err) {
      console.error("An error occurred during the confirmation dialog", err);
    }
  }
  

    /*End of the Code*/

}

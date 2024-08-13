import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userModel } from '../../Models/user-model';
import { UserServiceService } from '../../Services/user-service.service';
import { parentData } from '../../Models/parentData';
import { countries,country } from '../../../../../../assets/Country';
import Swal from 'sweetalert2';
import { DepartmentServiceService } from '../../../Departments/Services/department-service.service';
import { deptModel } from '../../../Departments/Models/deptModel';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: 'add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']  
})
export class AddEditUserComponent {

  /********Declare Variables and Objects********/
    pictureFile!:File
    url: string = '../../../../assets/images/userPlaceholder.jfif';  // To store the URL of the selected image
    allCountry:countries[]=[]
    @Output() dataEmitter = new EventEmitter<string>();
    @Input() employeeId!:number
    editData:userModel[]=[]
    deptData:deptModel[]=[]
    personDataForm!:FormGroup
    @ViewChild('fileInput') inputFile!:ElementRef

  /********End Declaration********/



  //This is the constructor

    constructor(private _fb:FormBuilder,
                private userService:UserServiceService,
                private deptService:DepartmentServiceService){  }
  
  


  // Send Data to the Parent Component to Close the dialog Box
    /*
        Data Passed:
        1: showDialogBox:false/true
        2: insertionVerification:false/true
        3: operation: addData
    */ 

    closeDialogBox(value:string) {
        this.dataEmitter.emit('');
      }



  //This Function Calls When Our Component Initializes and it Initialize personDataForm   
    
  
    ngOnInit(): void {
        this.allCountry=country
        this.personDataForm=new FormGroup({
          firstName:new FormControl('',[Validators.required,Validators.minLength(3)]),
          lastName:new FormControl('',[Validators.required,Validators.minLength(3)]),
          email: new FormControl('', [
            Validators.required,
            Validators.email
          ])
          ,
          image:new FormControl('',[Validators.required]),
          dob:new FormControl('',[Validators.required]),
          hireDate:new FormControl('',[Validators.required]),
          deptId:new FormControl('',[]),
          phone1:new FormControl('',[Validators.required]),
          phone2:new FormControl('',[Validators.required]),
          phone3:new FormControl('',[Validators.required]),
          nationality:new FormControl('',[Validators.required]),
          gender:new FormControl('',[Validators.required]),
          maritalStatus:new FormControl('',[Validators.required]),
          jobType:new FormControl('',[Validators.required]),
          country:new FormControl('',[Validators.required]),
          state:new FormControl('',[Validators.required]),
          city:new FormControl('',[Validators.required]),
          postalCode:new FormControl('',[Validators.required]),
          streetAddress:new FormControl('',[Validators.required])
        })
        this.getDept()
      }



  //Detect Changes for the Input Decorator Which is Employee Id That It Has been changing or not

    ngOnChanges(changes: SimpleChanges): void {
          if (changes['employeeId'] && changes['employeeId'].currentValue) {
              this.employeeId=changes['employeeId'].currentValue
              this.loadData()
            }
    }



  //Here we Load Data in the Form For Update the EMployee

    loadData(){
      const result = this.userService.getDataById(this.employeeId)
                                      .then((data:userModel[]) => {
                                                                  this.editData = data;
                                                                  this.personDataForm = this._fb.group({
                                                                    firstName:  this.editData[0].firstName !== null && this.editData[0].firstName !== "undefined" ? this.editData[0].firstName : "",
                                                                    lastName: this.editData[0].lastName !== null && this.editData[0].lastName !== "undefined" ? this.editData[0].lastName : "",
                                                                    email: this.editData[0].email !== null && this.editData[0].email !== "undefined" ? this.editData[0].email : "",
                                                                    hireDate: this.editData[0].hireDate !== null && this.editData[0].hireDate !== undefined ? this.editData[0].hireDate : "",
                                                                    dob: this.editData[0].dateOfBirth !== null && this.editData[0].dateOfBirth !==undefined ? this.editData[0].dateOfBirth : "",
                                                                    deptId:this.editData[0].deptId!==null&&this.editData[0].dateOfBirth!==undefined?this.editData[0].dateOfBirth:"",
                                                                    gender: this.editData[0].gender !== null && this.editData[0].gender !== "undefined" ? this.editData[0].gender : "",
                                                                    nationality: this.editData[0].nationality !== null && this.editData[0].nationality !== "undefined" ? this.editData[0].nationality : "",
                                                                    maritalStatus: this.editData[0].maritalStatus !== null && this.editData[0].maritalStatus !== "undefined" ? this.editData[0].maritalStatus : "",
                                                                    jobType: this.editData[0].employmentStatus !== null && this.editData[0].employmentStatus !== "undefined" ? this.editData[0].employmentStatus : "",
                                                                    photo: this.editData[0].photo !== null && this.editData[0].photo !== "undefined" ? this.editData[0].photo : "",
                                                                    phone3: this.editData[0].homeContactPhone !== null && this.editData[0].homeContactPhone !== "undefined" ? this.editData[0].homeContactPhone : "",
                                                                    phone2: this.editData[0].emergencyContactPhone !== null && this.editData[0].emergencyContactPhone !== "undefined" ? this.editData[0].emergencyContactPhone : "",
                                                                    phone1: this.editData[0].personalContactPhone !== null && this.editData[0].personalContactPhone !== "undefined" ? this.editData[0].personalContactPhone : "",
                                                                    country: this.editData[0].country !== null && this.editData[0].country !== "undefined" ? this.editData[0].country : "",
                                                                    state: this.editData[0].state !== null && this.editData[0].state !== "undefined" ? this.editData[0].state : "",
                                                                    postalCode: this.editData[0].postalCode !== null && this.editData[0].postalCode !== "undefined" ? this.editData[0].postalCode : "",
                                                                    city: this.editData[0].city !== null && this.editData[0].city !== "undefined" ? this.editData[0].city : "",
                                                                    streetAddress: this.editData[0].street !== null && this.editData[0].street !== "undefined" ? this.editData[0].street : "",
                                                                  });
                                                                  }, 
                                              (err:any) => {
                                                          alert("There is some problem");
                                                      }); 
    }




//Here we Trigger the Input Type=file Tag to change the URL Dynamically

  triggerInputFile(){
      this.inputFile.nativeElement.click()
  }



  // Handle file selection and Image update
  
  selectChangeFile(event: Event) {
   const input=event.target as HTMLInputElement
      if(input.files&&input.files.length>0){
            const files=input.files[0]
            this.pictureFile=files
            const reader=new FileReader()
            reader.readAsDataURL(files)
            
            reader.onload=(event:any)=>{
                this.url=event.target.result
              }
        }
  }


  //Here We Add and Update the Data of the Employee if employee id=-1 then Add Otherwise Update
 
 
  async addAndUpdateEmployeeData(){
    const form = this.personDataForm.value
    const user = new userModel();

    //File Data
    const formData = new FormData();
    formData.append('file', this.pictureFile);
          
    // Assign values from the form to the userModel instance with checks for null or "undefined"
    user.firstName = form.firstName !== null && form.firstName !== "undefined" ? form.firstName : "";
    user.lastName = form.lastName !== null && form.lastName !== "undefined" ? form.lastName : "";
    user.email = form.email !== null && form.email !== "undefined" ? form.email : "";
    user.hireDate = form.hireDate !== null && form.hireDate !== "undefined" ? form.hireDate : "";
    user.dateOfBirth = form.dob !== null && form.dob !== "undefined" ? form.dob : "";
    user.deptId = form.deptId ? form.deptId : null;
    user.gender = form.gender !== null && form.gender !== "undefined" ? form.gender : "";
    user.nationality = form.nationality !== null && form.nationality !== "undefined" ? form.nationality : "";
    user.maritalStatus = form.maritalStatus !== null && form.maritalStatus !== "undefined" ? form.maritalStatus : "";
    user.employmentStatus = form.jobType !== null && form.jobType !== "undefined" ? form.jobType : "";
    user.photo = form.image !== null && form.image !== "undefined" ?form.image : "";
    user.homeContactPhone = form.phone1 !== null && form.phone1 !== "undefined" ? form.phone1 : "";
    user.emergencyContactPhone = form.phone2 !== null && form.phone2 !== "undefined" ? form.phone2 : "";
    user.personalContactPhone = form.phone3 !== null && form.phone3 !== "undefined" ? form.phone3 : "";
    user.country = form.country !== null && form.country !== "undefined" ? form.country : "";
    user.state = form.state !== null && form.state !== "undefined" ? form.state : "";
    user.postalCode = form.postalCode !== null && form.postalCode !== "undefined" ? form.postalCode : "";
    user.city = form.city !== null && form.city !== "undefined" ? form.city : "";
    user.street =form.streetAddress !== null && form.streetAddress !== "undefined" ? form.streetAddress : "";
    user.deptId=Number(user.deptId)
    if(this.employeeId==-1){      
            await this.userService.adddata(user,formData)
                            .then((data:userModel)=>
                                    {
                                      this.closeDialogBox('')
                                      Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your work has been saved",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                                
                                    },(err:any)=>
                                    {
                                      this.closeDialogBox('')     
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
        user.employeeId=this.editData[0].employeeId
        await this.userService.updateData(user)
                        .then((data:userModel)=>
                              {
                                this.closeDialogBox('') 
                                Swal.fire({
                                  position: "top-end",
                                  icon: "success",
                                  title: "Your work has been saved",
                                  showConfirmButton: false,
                                  timer: 1500
                              });
                               
                              },(err:any)=>
                              {  
                                this.closeDialogBox('')   
                                Swal.fire({
                                  icon: "error",
                                  title: "Oops...",
                                  text: "Something went wrong!",
                                  footer: '<a href="#">Why do I have this issue?</a>'
                                }); 
                               
                              }
                            )
      }   
      this.personDataForm.reset()
      this.url='../../../../assets/images/userPlaceholder.jfif'
    
  }




    //Getter functions to access the Control Values of the Form 
    
    
  get value(){
    return this.personDataForm.controls;
  }

  //Get data of all the departments
    getDept(){
      this.deptService.getDeptData()
                      .then((data:deptModel[])=>{
                                                  this.deptData=data
                                                },
                            (error)=>{
                                      console.error("Error Message: ",error)
                                     })
    }
    /*End of the Code*/
}

import { gql } from "apollo-angular";


//Insert Employee Data Query
export const insertEmployeeData=gql`mutation ($input: EmployeesInput!) {
  addEmployee(input:$input) {
    city
  }
}`


//Get Employee Data Query
export const getEmployeeData=gql`query($skip:Int!,$take:Int!) {
  employees(skip: $skip,take: $take) {
   employeeId
   firstName
   lastName
   email
   employmentStatus
   hireDate
  }
}`




//Delete Employee Data Query
export const deleteEmployeeData=gql`mutation($id:Int!) {
  deleteEmployee(id: $id) {
    city
  }
}`


//Delete Employee Data by Id Query
export const getEmployeeDataById=gql`query($employeeId:Int!) {
  employees(where:
                  { employeeId:
                                {
                                  eq:$employeeId
                                }
                  }
            ) 
  {
    city
    country
    dateOfBirth
    deptId
    email
    emergencyContactPhone
    employeeId
    employmentStatus
    firstName
    gender
    hireDate
    homeContactPhone
    jobId
    lastName
    maritalStatus
    nationality
    personalContactPhone
    photo
    postalCode
    salaryId
    state
    street
  }
}`;


//Update Employee Data Query
 export const updateEmployeeData=gql`mutation ($EmployeesInput: EmployeesInput!) {
  updateEmployee(input: $EmployeesInput) {
    country
  }
}`;


//Search the employee
export const searchEmployee=gql`query($name:String!) {
  employees(
            where: {
              or:[
                {
                 firstName:{
                            contains:$name
                           },
                }
                {
                  lastName:{
                            contains:$name
                           }
                }
                 ]
            }
            ){
    employeeId
    firstName
    lastName
    hireDate
    email
    employmentStatus
  }
}`
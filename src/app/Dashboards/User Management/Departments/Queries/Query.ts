import { gql } from "apollo-angular";


//Query to get Data of the Department
export const getDept=gql`query {
  departments {
    departmentHeadId
    departmentId
    deptName
  }
}`


//Query to get names of the employees which have department to make it department head

export const getEmployeeData=gql`query{
  employees(
              where: {
                      deptId:{
                               neq:null
                             }
                     }
           )
            {
              employeeId,
              firstName,
              lastName
            }
      }`

//Query to delete the department
export const deleteDept=gql`mutation($id:Int!) {
  deleteDepartment(id: $id) {
    deptName
  }
}`



//Query to add the new department
export const addDept=gql`mutation ($DepartmentInput: DepartmentInput!) {
  addDepartment(input: $DepartmentInput) {
    deptName
  }
}`


//Get Dept by Id
export const getDeptById=gql`query($id:Int!) {
  departments(
              where: {
                departmentId:{
                              eq:$id
                             }
                     }
  ) {
    departmentHeadId
    departmentId
    deptName
  }
}`

//Update department
export const updateDept=gql`mutation ($DepartmentInput: DepartmentInput!) {
  updateDepartment(input: $DepartmentInput) {
    deptName
  }
}`

//Get Employee By department id
export const getEmpByDept=gql`query($deptId:Int!) {
  employees(
            where: {
                    deptId:{
                          eq:$deptId
                        }
                }
            ) {
    employeeId
    firstName
    hireDate
    lastName
    email
    employmentStatus  
  }
}`


/*Search the department*/
export const searchDept=gql`query ($name: String!) {
  departments(
              where: {
                      deptName:{
                         contains:$name
                               }
                     }
             ) 
  {
    departmentHeadId
    departmentId
    deptName
  }
}`
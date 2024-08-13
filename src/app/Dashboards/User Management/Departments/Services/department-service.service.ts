import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { deptModel } from '../Models/deptModel';
import { userModel } from '../../Employees/Models/user-model';
import { addDept, deleteDept, getDept, getDeptById, getEmpByDept, getEmployeeData, searchDept, updateDept } from '../Queries/Query';
import { ApolloError } from '@apollo/client/errors';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

  constructor(private apollo:Apollo) { }

//Here we get department Data
  async getDeptData():Promise<deptModel[]>{
    try{
          const result=await this.apollo.query<{departments:deptModel[]}>({
                                                                            query:getDept,
                                                                            fetchPolicy:'network-only'
                                                                          }).toPromise()
          const dept=result?.data?.departments  
          if(!dept){
            throw new Error("There is no data")
          }
            return dept
       }
    catch(error){
      console.error("Error fetching department data", error);
      throw error;
    }
                                                             
  }


  
  //Here we get Employee Data
  async getEmployeeData():Promise<userModel[]>{
    try{
          const result=await this.apollo.query<{employees:userModel[]}>({
                                                                  query:getEmployeeData,
                                                                  fetchPolicy:'no-cache'
                                                                  }).toPromise()
         const employee=result?.data?.employees 
         if(!employee){
           throw new Error("There is no data")
          }
          return employee                                                        
       }
    catch(error){
      console.error("Error fetching department data", error);
      throw error;
       }
  }

  //Here we get Employee Dataaccording to department
  async getEmployeeDataByDept(id:number):Promise<userModel[]>{
    try{
          const result=await this.apollo.query<{employees:userModel[]}>({
                                                                  query:getEmpByDept,
                                                                  variables:{
                                                                      deptId:id
                                                                  },
                                                                  fetchPolicy:'no-cache'
                                                                  }).toPromise()
         const employee=result?.data?.employees 
         if(!employee){
           throw new Error("There is no data")
          }
          return employee                                                        
       }
    catch(error){
      if (error instanceof ApolloError) {
        console.error('ApolloError:', error.message);
        console.error('GraphQL Errors:', error.graphQLErrors);
        console.error('Network Error:', error.networkError);
    } else {
        console.error('Unexpected Error:', error);
    }
    throw new Error('Failed to add data');
      console.error("Error fetching department data", error);
      throw error;
       }
  }

  //Here we delete the department 
  async deleteDepartment(employeeId:number):Promise<deptModel>{
    try{
          const result=await this.apollo.mutate<{deleteDepartment:deptModel}>({
                                                                          mutation:deleteDept,
                                                                          variables:{
                                                                            id:employeeId
                                                                          },
                                                                          fetchPolicy:'no-cache'
                                                                        }).toPromise()
          const dept=result?.data?.deleteDepartment;
          if(!dept){
            throw new Error("There is no data")
           }
           return dept 
      }
    catch(error){
      console.error("Error fetching department data", error);
      throw error;
    }
  }

  //Here we add the new department
  async addDept(newDept:deptModel):Promise<deptModel>{
    try{
          newDept.departmentId=-1;
          const result=await this.apollo.mutate<{addDepartment:deptModel}>({
                                                                          mutation:addDept,
                                                                          variables:{
                                                                            DepartmentInput:newDept
                                                                          },
                                                                          fetchPolicy:'no-cache'
                                                                        }).toPromise()
          const dept=result?.data?.addDepartment;
          if(!dept){
                     throw new Error("There is no data")
                    }
          return dept                                                               
    }
    catch(error){
      if (error instanceof ApolloError) {
        console.error('ApolloError:', error.message);
        console.error('GraphQL Errors:', error.graphQLErrors);
        console.error('Network Error:', error.networkError);
    } else {
        console.error('Unexpected Error:', error);
    }
    throw new Error('Failed to add data');
      console.error("Error fetching department data", error);
      throw error;
    }
  }


  //Get department by id
  async getDeptById(deptId:number):Promise<deptModel[]>{
    try{
          const result=await this.apollo.mutate<{departments:deptModel[]}>({
                                                                      mutation:getDeptById,
                                                                      variables:{
                                                                        id:deptId
                                                                      },
                                                                      fetchPolicy:'no-cache'
                                                                   }).toPromise()
          const dept=result?.data?.departments;
          if(!dept){
                      throw new Error("There is no data")
                    }
          return dept                                                        
         }
    catch(error){
      if (error instanceof ApolloError) {
        console.error('ApolloError:', error.message);
        console.error('GraphQL Errors:', error.graphQLErrors);
        console.error('Network Error:', error.networkError);
    } else {
        console.error('Unexpected Error:', error);
    }
    throw new Error('Failed to add data');
      console.error("Error fetching department data", error);
      throw error;
    }
  }

  //Update Department
  async updateDept(newDept:deptModel):Promise<deptModel>{
        try{
          const result=await this.apollo.mutate<{updateDepartment:deptModel}>({
                                                                          mutation:updateDept,
                                                                          variables:{
                                                                            DepartmentInput:newDept
                                                                          },
                                                                          fetchPolicy:'no-cache'
                                                                        }).toPromise()
          const dept=result?.data?.updateDepartment;
          if(!dept){
                    throw new Error("There is no data")
                    }
          return dept                                                               
    }
    catch(error){
      if (error instanceof ApolloError) {
        console.error('ApolloError:', error.message);
        console.error('GraphQL Errors:', error.graphQLErrors);
        console.error('Network Error:', error.networkError);
    } else {
        console.error('Unexpected Error:', error);
    }
    throw new Error('Failed to add data');
      console.error("Error fetching department data", error);
      throw error;
    }
  }



  //Here we Get Employee By Department
  async getDeptEmployee(id:number):Promise<userModel[]>{
    const result=await this.apollo.query<{employees:userModel[]}>({
                                                              query:getEmpByDept,
                                                              variables:{
                                                                deptId:id
                                                              },
                                                              fetchPolicy:'no-cache'
                                                            }).toPromise()
    const person=result?.data?.employees
    if(!person)
    {
      throw new Error("There is no Employee")
    }
    return person
  }

  /*Search the department*/
  async searchDept(name:string):Promise<deptModel[]>{
    const result=await this.apollo.query<{departments:deptModel[]}>({
                                                                query:searchDept,
                                                                variables:{
                                                                  name:name
                                                                },
                                                                fetchPolicy:'no-cache'
                                                              }).toPromise()
    const person=result?.data?.departments
    if(!person)
    {
      throw new Error("There is no Employee")
    }
    return person
  }
}

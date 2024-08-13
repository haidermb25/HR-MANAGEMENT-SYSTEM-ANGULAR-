import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {userModel} from '../Models/user-model'
import { promises } from 'dns';
import { deleteEmployeeData, getEmployeeData, insertEmployeeData, getEmployeeDataById, updateEmployeeData, searchEmployee } from '../Queries/Query';
import { ApolloError } from '@apollo/client/errors';
import { skip, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private apollo:Apollo) { }


  //Add New Employee into the Database
  async adddata(user: userModel,formData:FormData): Promise<userModel> {
    try {
            user.employeeId = -1;        
            const result = await this.apollo.mutate<{ addEmployee: userModel }>({
                mutation: insertEmployeeData,
                variables: {
                    input: user
                },
                fetchPolicy: "no-cache"
            }).toPromise();

            const person = result?.data?.addEmployee;
            
            if (!person) {
                throw new Error('User data is not returned from the server');
            }
            console.log("Person data is: ",person)
            return person;
        } 
    catch (error){
                    if (error instanceof ApolloError) {
                        console.error('ApolloError:', error.message);
                        console.error('GraphQL Errors:', error.graphQLErrors);
                        console.error('Network Error:', error.networkError);
                    } else {
                        console.error('Unexpected Error:', error);
                    }
                    throw new Error('Failed to add data');
          }
}

  //Get Employee Data from the Database
  async getData(skip:number,take:number): Promise<userModel[]> {
    try{      
          const result = await this.apollo.query<{ employees: userModel[] }>({
            query:getEmployeeData,
            variables:{
              skip:skip,
              take:take
            },
            fetchPolicy:'no-cache'
          }).toPromise();
        
      const persons = result?.data.employees;
      console.log(persons)
      if (!persons) {
      throw new Error("Result not found");
      }
      return persons;
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

    console.error("Error in deleteData function:", error);
    throw error;
    }
}
  



//Get Employee Data by ID from the Database
async getDataById(employeeId:number):Promise<userModel[]>{
  const result= await this.apollo.query<{employees: userModel[]}>({ 
                                                                query:getEmployeeDataById,
                                                                variables:{
                                                                  employeeId:employeeId
                                                                },
                                                                fetchPolicy:'no-cache'
                                                                }).toPromise()
  const persons=result?.data?.employees
  if (!persons) {
    throw new Error("Result not found");
  }
  return persons;                                                              
}



//Delete Employee Data from the Database
async deleteData(employeeId: number): Promise<userModel> {
  try {
    const result = await this.apollo.mutate<{ deleteEmployee: userModel }>({
      mutation: deleteEmployeeData,
      variables: {
        id: employeeId
      },
      fetchPolicy: 'no-cache'
    }).toPromise();

    const person = result?.data?.deleteEmployee;
    if (!person) {
      throw new Error('Person Not Deleted');
    }
    return person;
  } catch (error) {   
      if (error instanceof ApolloError) {
          console.error('ApolloError:', error.message);
          console.error('GraphQL Errors:', error.graphQLErrors);
          console.error('Network Error:', error.networkError);
      } else {
          console.error('Unexpected Error:', error);
      }
      throw new Error('Failed to add data');

    console.error("Error in deleteData function:", error);
    throw error;
  }
}

  
  //Update Employee Data from the Database
  async updateData(user: userModel):Promise<userModel>{
    try {  
            const result = await this.apollo.mutate<{ updateEmployee: userModel }>({
                  mutation: updateEmployeeData,
                  variables: {
                      EmployeesInput: user
                  },
                  fetchPolicy: "no-cache"
              }).toPromise();
           
              const person = result?.data?.updateEmployee;
              
              if (!person) {
                  throw new Error('User data is not returned from the server');
              }
              
              return person;
        }
    catch (error) {
                    if (error instanceof ApolloError) {
                        console.error('ApolloError:', error.message);
                        console.error('GraphQL Errors:', error.graphQLErrors);
                        console.error('Network Error:', error.networkError);
                    } else {
                        console.error('Unexpected Error:', error);
                    }
                    throw new Error('Failed to add data');
        }
  }

  //Search the Employee
  async searchEmployee(name:string):Promise<userModel[]>{
    const result = await this.apollo.query<{ employees: userModel[] }>({
      query:searchEmployee,
      variables:{
        name:name
      },
      fetchPolicy:'no-cache'
    }).toPromise();
  
    const persons = result?.data.employees;
    if (!persons) {
        throw new Error("Result not found");
      }
    return persons;
  }

  /*End of the Code*/
}

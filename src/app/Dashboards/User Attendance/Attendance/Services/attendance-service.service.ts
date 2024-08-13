import { getEmployeeAttendanceInfo, insertEmployeeAttendance } from './../Query/querty';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { promises } from 'dns';
import { attendanceDay } from '../Models/attendanceDay';
import { getDayInfo, insertAttendDay } from '../Query/querty';
import { error } from 'console';
import { ApolloError } from '@apollo/client/errors';
import { attendanceRecord } from '../Models/attendanceRecord';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  constructor(private apollo:Apollo) { }



  //Get the attendance day info
  async getAttendanceDayInfo(date:Date):Promise<attendanceDay[]>{
      const result=await this.apollo.query<{attendanceDays:attendanceDay[]}>({
                                                                        query:getDayInfo,
                                                                        variables:{
                                                                          date:date                     
                                                                        },
                                                                        fetchPolicy:'network-only'
                                                                     }).toPromise()
      const attendanceDate=result?.data.attendanceDays
      if(!attendanceDate){
        throw new Error('There is no such attendanceDate Found')
      }
      return attendanceDate;
  }


    //Get the employee attendance info
    async getEmployeeAttendanceInfo(dateId:number,deptId:number):Promise<attendanceRecord[]|null>{
      const result=await this.apollo.query<{attendanceRecords:attendanceRecord[]}>({
                                                                        query:getEmployeeAttendanceInfo,
                                                                        variables:{
                                                                          deptId:deptId,
                                                                          attendanceDayId:dateId                  
                                                                        },
                                                                        fetchPolicy:'network-only'
                                                                     }).toPromise()
                                                                     
      const attendanceDate = result?.data?.attendanceRecords;
      return attendanceDate? attendanceDate : null;
  }



  //Insert the attendance
  async insertAttendanceDay(obj: attendanceDay): Promise<attendanceDay> {
    obj.attendanceDayId = -1;
    console.log(obj)
    try {
        const result = await this.apollo.mutate<{ addAttendanceDay: attendanceDay }>({
            mutation: insertAttendDay,
            variables: { obj:obj }, // Simplified object shorthand
        }).toPromise();

        const attendDay = result?.data?.addAttendanceDay;
        console.log(attendDay);

        if (!attendDay) {
            throw new Error('There is some problem');
        }

        return attendDay;
    } catch (error) {
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


//Insert the employee attendance in the table
  async insertEmployeeAttendance(obj: attendanceRecord): Promise<attendanceRecord> {
    try {
        const result = await this.apollo.mutate<{ addAttendanceRecord: attendanceRecord }>({
            mutation: insertEmployeeAttendance,
            variables: { obj:obj },
        }).toPromise();

        const attendResult = result?.data?.addAttendanceRecord;
        console.log(attendResult);

        if (!attendResult) {
            throw new Error('There is some problem');
        }
        return attendResult;
    } catch (error) {
        if (error instanceof ApolloError) {
            console.error('ApolloError:', error.message);
            console.error('GraphQL Errors:', error.graphQLErrors);
            console.error('Network Error:', error.networkError);
        } else {
            console.error('Unexpected Error:', error);
        }
        throw new Error('Failed to insert employee attendance');
    }
  }

}

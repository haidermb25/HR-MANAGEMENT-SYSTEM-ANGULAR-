import { gql } from "apollo-angular";

//get the day info
export const getDayInfo=gql`query($date:Date) {
  attendanceDays(
                    where: {
                        attendanceDayDate:{
                                            eq:$date
                                          }
                    }
                ) 
  {
    attendanceDayDate
    attendanceDayId
  }
}`



//Insert the attendance day
export const insertAttendDay=gql`mutation($obj:AttendanceDayInput!) {
  addAttendanceDay(input:$obj ) {
    attendanceDayDate
    attendanceDayId
  }
}`


//Insert the attendance of the employees
export const insertEmployeeAttendance=gql`mutation ($obj: AttendanceRecordsInput!) {
  addAttendanceRecord(input: $obj) {
    attendanceDayId
  }
}`


//Get the employee attendance info
export const getEmployeeAttendanceInfo=gql`query($deptId: Int!, $attendanceDayId: Int!) {
  attendanceRecords(
    where: {
      deptID:{
        eq:$deptId
      } 
      attendanceDayId:{
        eq:$attendanceDayId
      } 
    }
  ) {
    attendanceDayId
    attendanceID
    checkInTime
    checkOutTime
    deptID
    employeeId
    status
  }
}`
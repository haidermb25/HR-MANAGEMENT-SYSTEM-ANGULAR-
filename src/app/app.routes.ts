import { Routes } from '@angular/router';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
import { MainContainerComponent } from './Layout/main-container/main-container.component';
import { HelpComponent } from './Dashboards/help/help.component';
import { UsersComponent } from './Dashboards/User Management/Employees/Components/users/users.component';
import { ShowDepartmentComponent } from './Dashboards/User Management/Departments/Components/show-department/show-department.component';
import path from 'path';
import { Component } from '@angular/core';
import { ShowDeptEmpComponent } from './Dashboards/User Management/Departments/Components/show-dept-emp/show-dept-emp.component';
import { AttendanceBoardComponent } from './Dashboards/User Attendance/Attendance/Components/attendance-board/attendance-board.component';

export const routes: Routes = [
    {path:'',redirectTo:'/sideBar/dashboard',pathMatch:'full'},
    {
        path:'sideBar',
        component:MainContainerComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'help',
                component:HelpComponent
            },
            {
                path:'attendance',
                component:AttendanceBoardComponent
            }
            ,{
                path:'user',
                component:UsersComponent
            },
            {
                path:'department',
                component:ShowDepartmentComponent,
            },
            {
                path:'deptEmp/:id/:deptName',
                component:ShowDeptEmpComponent
            }
        ]
    }
];

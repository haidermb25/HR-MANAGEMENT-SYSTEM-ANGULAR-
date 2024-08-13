import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../Dashboards/dashboard/dashboard.component';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DashboardComponent],
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent {
  isDisplayed: boolean = true;
  active:number=0
  constructor(private routes:Router) {
    if (typeof window !== 'undefined') {
      this.updateDisplay(window.innerWidth);
    }
  }

  /* Function to show the sidebar */
  ToggleSideBar() {
    this.isDisplayed = !this.isDisplayed;
  }

  /* On resize the screen */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (typeof window !== 'undefined') {
      this.updateDisplay((event.target as Window).innerWidth);
    }
  }

  updateDisplay(width: number) {
    this.isDisplayed = width > 992;
  }


  //Show the dropdown
  showDropDown(value:number){
    this.active=this.active==value?0:value
  }

  //Show the pages according to the click
  showDashboardPages(path:string){
    this.routes.navigate([path])
  }

}

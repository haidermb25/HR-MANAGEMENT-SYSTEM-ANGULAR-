import { Component, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-attend-dialog-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attend-dialog-box.component.html',
  styleUrl: './attend-dialog-box.component.css'
})
export class AttendDialogBoxComponent {
    attendOption:string=""
    @Output() emitter=new EventEmitter<string>() 
    //contructor of the file
    constructor(){}

    //Here we show the attendance box
    showattendOptionBox(event:Event){
      const attend=(event.target as HTMLSelectElement).value
      this.attendOption=attend.toString()
    }

    //Close the dialog box
    closeDialogBox(){
      this.emitter.emit('')
    }

}

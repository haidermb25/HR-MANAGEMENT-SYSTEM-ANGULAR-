
import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  @Output() dataEmitter=new EventEmitter<boolean>()
  //CLose the userinfo box
  hideUserInfoBox(){
    this.dataEmitter.emit(false) 
   }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Output() isSelected = new EventEmitter<User>()

  users$ = this._userService.users$;
  
  constructor(private _userService: UserService) {}
  
  ngOnInit() {
    this._userService.findAll().subscribe();
  }

}

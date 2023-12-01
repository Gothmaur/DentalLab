import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/Users';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['Nombre Completo', 'email','acciones'];
  @Input()
  dataSource: User[] = [];
  @Output()
  deleteUser = new EventEmitter<User>();
  @Output()
  editUser = new EventEmitter<User>();
}

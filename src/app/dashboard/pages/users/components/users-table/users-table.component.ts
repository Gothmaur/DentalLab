import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../models/Users';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['Nombre Completo', 'email','acciones'];
  dataSourceMatTable!: MatTableDataSource<User>;

  @Input()
  dataSource: User[] = [];
  @Output()
  deleteUser = new EventEmitter<User>();
  @Output()
  editUser = new EventEmitter<User>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      this.dataSourceMatTable = new MatTableDataSource(this.dataSource);
      this.dataSourceMatTable.filterPredicate = this.customFilterPredicate.bind(this);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMatTable.filter = filterValue.trim().toLowerCase();
  }

  customFilterPredicate(data: User, filter: string): boolean {
    const transformedFilter = filter.trim().toLowerCase();
    const fullName = (data.nombre + ' ' + data.apellido1 + ' ' + data.apellido2).toLowerCase();
    const email = data.email.toLowerCase();
    return fullName.includes(transformedFilter) || email.includes(transformedFilter);
  }
}

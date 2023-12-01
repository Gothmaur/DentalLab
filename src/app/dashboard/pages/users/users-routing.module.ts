import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/users
      path:'users', 
      component: UsersComponent
    },
    {
      //dashboard/users/:id
      path:':id',
      component: UserDetailComponent
    },
  ]
    
  )],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

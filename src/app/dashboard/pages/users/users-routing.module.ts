import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserIndexComponent } from './pages/user-index/user-index.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      //dashboard/users
      path:'', 
      component: UserIndexComponent
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

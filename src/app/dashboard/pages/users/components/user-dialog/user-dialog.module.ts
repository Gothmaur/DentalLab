import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UserDialogComponent } from './user-dialog.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Pipe, 
    SharedModule,
    UserDialogComponent
  ]
})
export class UserDialogModule { }

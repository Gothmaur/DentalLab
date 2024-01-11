import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/pages/users/models/Users';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): unknown {
    const isUppercase = args[0] === 'uppercase';
    var fullname:String;
    user.apellido2 ? fullname = `${user.nombre} ${user.apellido1} ${user.apellido2}`
    :  fullname = `${user.nombre} ${user.apellido1}`
    return isUppercase ? fullname.toUpperCase() : fullname;
  }

}

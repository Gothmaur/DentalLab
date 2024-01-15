import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsEmpleado } from 'src/app/store/auth/auth.selector';

export const empleadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isEmpleado$ = inject(Store);

  return isEmpleado$.select(selectIsEmpleado).pipe(
    map((isEmpleado)=>{
      if(isEmpleado)  return router.createUrlTree(['/dashboard/home']);
      return true;
    }) 
  )
};

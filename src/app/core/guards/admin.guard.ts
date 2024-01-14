import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAdministrador } from 'src/app/store/auth/auth.selector';

//Debe retornar true si el tipo de usuario es administrador 
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAdmin$ = inject(Store);

  return isAdmin$.select(selectIsAdministrador).pipe(
    map((isAdmin)=>{
      if(!isAdmin)  return router.createUrlTree(['/dashboard/home']);
      return true;
    }) 
  )
};

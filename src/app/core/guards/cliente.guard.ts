import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsCliente } from 'src/app/store/auth/auth.selector';

export const clienteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isCliente$ = inject(Store);

  return isCliente$.select(selectIsCliente).pipe(
    map((isCliente)=>{
      if(isCliente)  return router.createUrlTree(['/dashboard/home']);
      return true;
    }) 
  )
};

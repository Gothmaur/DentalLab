import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

interface MiNotificacion{
  type: 'success' | 'error';
  message: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  private notifier$ = new Subject<MiNotificacion>();

  constructor() {
    this.notifier$.subscribe({
      next: (MiNotificacion) => {
        Swal.fire(MiNotificacion.title, MiNotificacion.message, MiNotificacion.type)
      }
    })
   }

   showSuccess(message: string, title = 'Realizado') : void {
    this.notifier$.next({
      type: 'success',
      message,
      title
    });
   }

   showError(message: string, title = 'Error') : void {
    this.notifier$.next({
      type: 'error',
      message,
      title
    });
   }

}



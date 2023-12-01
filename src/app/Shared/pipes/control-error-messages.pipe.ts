import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessages'
})
export class ControlErrorMessagesPipe implements PipeTransform {

/** crear pipe personalizado para manejar los errores de mi formulario */
  transform(error: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

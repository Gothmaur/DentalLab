import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripcioness': emptyProps(),
    
    
  }
});

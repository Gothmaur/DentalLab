import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../Models';
import { INSCRIPTION_MOCK } from '../mocks/inscription.mock';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  inscripciones: Inscripcion[]
}

export const initialState: State = {
  inscripciones: []
};

export const reducer = createReducer(
  initialState,
  //load inscripciones
  on(InscripcionesActions.loadInscripcioness, state => {
    return{
      inscripciones: INSCRIPTION_MOCK
    }
  }),

);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});


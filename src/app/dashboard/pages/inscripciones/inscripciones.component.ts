import { Component, OnInit } from '@angular/core';
import { Inscripcion } from './Models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscripcionesActions } from './store/inscripciones.actions';
import { selectInscripcionesState, selectInscriptionsArray } from './store/inscripciones.selectors';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit{
  
  inscripciones$: Observable<Inscripcion[]>;

  constructor(private store:Store){
    this.inscripciones$ = this.store.select(selectInscriptionsArray);
  }

  displayedColumns = ['curso','cont','acciones'];
  
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripcioness());
  }
}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InscripcionesComponent } from "./inscripciones.component";
import { InscripcionesDetailComponent } from "./pages/inscripciones-detail/inscripciones-detail.component";

const routes: Routes=[

    {
        path:'',
        component: InscripcionesComponent
    },
    {
        path:':id',
        component: InscripcionesDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InscripcionesRoutingModule{}
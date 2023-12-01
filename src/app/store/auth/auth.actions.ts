import { createActionGroup, props } from "@ngrx/store";
import { User } from "src/app/dashboard/pages/users/models/Users";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        //Estableer usuario autenticado
        'setAuthUser': props<{ payload : User | null}> ()
    }
})
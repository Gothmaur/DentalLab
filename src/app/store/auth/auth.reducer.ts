import { User } from "src/app/dashboard/pages/users/models/Users";
import { AuthActions } from "./auth.actions";
import { createReducer, on } from "@ngrx/store";

export const authFeatureKey = 'auth';
export interface AuthState {
    authUser: User | null;
}

const initialState: AuthState = {
    authUser:null
}

export const authReducer = createReducer(initialState, 
    on(AuthActions.setAuthUser, (currentState, action) => {
        return{
            authUser: action.payload
        }
    })
)
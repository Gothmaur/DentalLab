import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

//Devuelve todos los datos de usuario
export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);
//Devuelve solo el rol de usuario
export const selectAuthRole = createSelector(selectAuthState, (state) => state.authUser?.tipo)
//Devuelve solo el id de usuario
export const selectAuthId = createSelector(selectAuthState, (state) => state.authUser?.id)
//devuelve si el tipo de usuario es Administrador
export const selectIsAdministrador = createSelector(selectAuthState, (state) => state.authUser?.tipo === "Administrador")
//decvuelve si el tipo de usuario es Cliente
export const selectIsCliente = createSelector(selectAuthState, (state) => state.authUser?.tipo === "Cliente")
//decvuelve si el tipo de usuario es Empleado
export const selectIsEmpleado = createSelector(selectAuthState, (state) => state.authUser?.tipo === "Empleado")
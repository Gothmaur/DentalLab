import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);

export const selectAuthRole = createSelector(selectAuthState, (state) => state.authUser?.tipo)

export const selectAuthId = createSelector(selectAuthState, (state) => state.authUser?.id)

export const selectIsAdministrador = createSelector(selectAuthState, (state) => state.authUser?.tipo === "Administrador")

export const selectIsCliente = createSelector(selectAuthState, (state) => state.authUser?.tipo === "Cliente")
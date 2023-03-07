import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { authReducer } from '../auth/store/auth.reducer';
import { recipeReducer } from '../recipes/store/recipe.reducer';

export type appState = {};

export const appReducer: ActionReducerMap<appState> = {
	router: routerReducer,
	auth: authReducer,
	recipes: recipeReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
	return (state, action) => {
		// console.log('State: ', state);
		// console.log('Action: ', action);

		return reducer(state, action);
	};
}

export const metaReducers: MetaReducer<appState>[] = [logger];

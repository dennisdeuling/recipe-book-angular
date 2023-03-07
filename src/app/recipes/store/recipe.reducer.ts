import { createReducer, on } from "@ngrx/store";
import { handleFetchedRecipes, saveRecipes, startFetchRecipes } from "./recipe.actions";
import { Recipe } from "../recipe.model";

export type recipeState = {
  recipes: Recipe[];
};
const initialState: recipeState = {
  recipes: []
};

export const recipeReducer = createReducer(
  initialState,
  on(startFetchRecipes, (state, action) => {
    return { ...state };
  }),
  on(handleFetchedRecipes, (state, action) => ({
    ...state,
    recipes: action.recipes
  })),
  on(saveRecipes, (state, action) => ({
    ...state
  }))
);

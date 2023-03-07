import { createAction, props } from "@ngrx/store";

export const startFetchRecipes = createAction("[Recipes] Start Fetch Recipes");

export const handleFetchedRecipes = createAction(
  "[Recipes] Handle Fetched Recipes",
  props<{ recipes: [] }>()
);

export const saveRecipes = createAction("[Recipes] Save Recipes");

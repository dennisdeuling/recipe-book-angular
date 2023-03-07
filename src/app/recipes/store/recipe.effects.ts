import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as RecipeActions from "./recipe.actions";
import { map, switchMap } from "rxjs";
import { DataStorageService } from "../../shared/data-storage.service";

@Injectable()
export class RecipeEffects {
  private databaseUrl =
    "https://angular-recipe-book-a912b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.startFetchRecipes),
      switchMap(() => {
        return this.http.get<any>(
          this.databaseUrl
        )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            })
          );
      }),
      map(recipes => {
        return RecipeActions.handleFetchedRecipes({ recipes });
      })
    )
  );

  constructor(private http: HttpClient, private router: Router, private actions$: Actions, private dataStorageService: DataStorageService) {
  }
}

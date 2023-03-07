import { Component, OnDestroy, OnInit } from "@angular/core";
import { map, Subscription } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.appState>
  ) {
  }

  ngOnInit() {
    this.userSub = this.store
      .pipe(
        map(state => {
          return state["auth"].user;
        })
      )
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(RecipeActions.startFetchRecipes());
    // this.store
    // 	.pipe(
    // 		map(response => {
    // 			console.log(response);
    // 		})
    // 	)
    // 	.subscribe(response => {
    // 		console.log(response);
    // 	});
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    // this.authService.logout();
  }
}

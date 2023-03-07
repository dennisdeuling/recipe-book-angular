import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { appReducer, metaReducers } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		CoreModule,
		StoreModule.forRoot(appReducer, {
			metaReducers
		}),
		EffectsModule.forRoot([AuthEffects, RecipeEffects]),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router',
			routerState: RouterState.Minimal
		}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();
	private recipes: Recipe[] = [
		new Recipe(
			'A Test Recipe',
			'This is simply a test',
			'https://i.pinimg.com/222x/a3/4c/08/a34c08589834ffce5366388a89ebeb27.jpg'
		),
		new Recipe(
			'A Test Recipe',
			'This is simply a test',
			'https://cdn.donmai.us/original/c7/a8/c7a8635753999ac88f674ef2043668e1.jpg'
		)
	];

	getRecipes() {
		return this.recipes.slice();
	}
}

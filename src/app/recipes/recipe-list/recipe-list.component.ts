import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
	@Output()
	recipeWasSelected = new EventEmitter<Recipe>();
	recipes: Recipe[] = [
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

	onRecipeSelected(recipe: Recipe) {
		this.recipeWasSelected.emit(recipe);
	}
}

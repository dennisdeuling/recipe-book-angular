import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe(
			'Tasty Schnitzel',
			'A super tasty Schnitzel - just awesome!',
			'https://i.pinimg.com/222x/a3/4c/08/a34c08589834ffce5366388a89ebeb27.jpg',
			[
				new Ingredient('Meat', 1),
				new Ingredient('Panko', 1),
				new Ingredient('Eggs', 2),
				new Ingredient('Flour', 1),
				new Ingredient('French Fries', 20)
			]
		),
		new Recipe(
			'Big Fat Burger',
			'What else you need to  say?',
			'https://cdn.donmai.us/original/c7/a8/c7a8635753999ac88f674ef2043668e1.jpg',
			[
				new Ingredient('Buns', 2),
				new Ingredient('Patty', 2),
				new Ingredient('Salad', 2),
				new Ingredient('Tomato', 1),
				new Ingredient('Onion', 1),
				new Ingredient('Jalapeños', 4),
				new Ingredient('Mayo', 1)
			]
		)
	];

	constructor(private shoppingListService: ShoppingListService) {}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}
}

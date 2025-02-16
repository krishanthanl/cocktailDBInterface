import { CocktailCardMode } from "../enum/CocktailCardMode"

export interface ICocktail {
	idDrink: number,
	strDrink: string ,
	strCategory: string | null,
	strDrinkThumb: string,
	strInstructions: string | null,
	strIngredient1: string | null,
	strIngredient2: string | null,
	strIngredient3: string | null,
	strMeasure1: string | null,
	strMeasure2: string | null,
	strMeasure3: string | null
}


// Component Props
export interface ICocktailsGridProp {
	initialCocktails: ICocktail[] | null,
	laterCocktails: ICocktail[] | null,
	//isSearchingMode: boolean
	cardMode: CocktailCardMode
}

export interface ISearchBarProp {
	initialCocktails: ICocktail[],
}

export interface ICocktailCardProp {
	cocktail: ICocktail,
	//isSearchingMode: boolean,
	cardMode: CocktailCardMode
}

// Context Types
export interface IFavoriteCocktailContext {
	favoriteItems: ICocktail[],
	addToFavorites: (cocktail: ICocktail) => void
	removeFromFavorites: (cocktail: ICocktail) => void
}
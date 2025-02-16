import { ICocktail } from "../interface/ICocktail";

export const fetchRandomCocktails = async () : Promise<ICocktail[]> => {
    const cocktails: ICocktail[] = [];
    for (let i = 0; i < 5; i++){
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php?_cb=${Date.now()}-${Math.random()}`);
        const data = await response.json();
        cocktails.push(data.drinks[0]);
        // had to add this code snippet fixed receiving duplicate
        // details due to cache 
        await new Promise((resolve) => setTimeout(resolve, 200)); // 200ms delay
    }
    return cocktails;
}

export const searchCocktails = async (searchTerm: string) : Promise<ICocktail[]> => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();
    const searchResult = data.drinks as ICocktail[] || [];
    return searchResult;
}
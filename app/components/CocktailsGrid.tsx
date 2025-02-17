'use client';
// This component shows list if cocktails it got
// it may initial, by refresh or by search
// it have to tell CocktailCard to do it have to show "Add/Remove buttons"
// or do not show button (in random mode) for that it use cardMode enum



// local import
import { ICocktail, ICocktailsGridProp } from "../interface/ICocktail";
import CocktailCard from "./CocktailCard";

const CocktailsGrid = ({ cocktails }: { cocktails: ICocktailsGridProp }) => {
    const cocktailsToShow: ICocktail[] | null = cocktails.laterCocktails || cocktails.initialCocktails;

    if(!cocktailsToShow || cocktailsToShow.length === 0) return(null);
    
    return(
        <div className="flex space-x-6 px-5 h-14 items-center justify-center mb-3 flex-wrap">
            {cocktailsToShow.map((cocktail) => <CocktailCard key={cocktail.idDrink} cocktail={cocktail} cardMode={cocktails.cardMode} />)}
        </div>
    );
}
CocktailsGrid.displayName = 'CocktailsGrid';
export default CocktailsGrid;
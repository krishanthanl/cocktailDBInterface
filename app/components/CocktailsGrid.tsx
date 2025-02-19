'use client'
// This component shows list if cocktails it got
// it may initial, by refresh or by search
// it have to tell CocktailCard to do it have to show "Add/Remove buttons"
// or do not show button (in random mode) for that it use cardMode enum

// local import
import { ICocktail, ICocktailsGridProp } from '../interface/ICocktail'
import CocktailCard from './CocktailCard'
import Loader from './Loader'

const CocktailsGrid = ({ cocktailList, isLoading, cardMode }: ICocktailsGridProp) => {
    // const cocktailsToShow: ICocktail[] | null =
    //     cocktails.laterCocktails || cocktails.initialCocktails
    const cocktailsToShow: ICocktail[] | null = cocktailList

    if (!cocktailsToShow || cocktailsToShow.length === 0) return null

    if (isLoading) {
        return <Loader />
    }
    return (
        // <div className="flex space-x-6 px-5 h-14 items-center justify-center mb-3 flex-wrap">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cocktailsToShow.map((cocktail) => (
                <CocktailCard key={cocktail.idDrink} cocktail={cocktail} cardMode={cardMode} />
            ))}
        </div>
    )
}
CocktailsGrid.displayName = 'CocktailsGrid'
export default CocktailsGrid

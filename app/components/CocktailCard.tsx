'use client'

// This component use for display cocktail details
// it contains an image of the cocktail, the cocktail name and category
// further it contains "Add" button if it in used in search result to show
// it contains "Remove" button when it in favorite list
// however based on the description it does not contains any button
// when it shows initial random data and when those random data refreshed

// system import
import Image from 'next/image'
import { toast } from 'react-toastify'

// local import
import { ICocktailCardProp } from '../interface/ICocktail'
import useFavorite from '../hooks/useFavorite'
import { CocktailCardMode } from '../enum/CocktailCardMode'
import CocktailCardActionButton from './CocktailCardActionButton'

const CocktailCard = ({ cocktail, cardMode }: ICocktailCardProp) => {
    const { addToFavorites, removeFromFavorites } = useFavorite()

    const handleActionButtonClick = () => {
        if (cardMode === CocktailCardMode.SEARCHING) {
            handleAddClick()
        } else if (cardMode === CocktailCardMode.FAVORITE) {
            handleRemoveClick()
        }
    }

    const handleAddClick = () => {
        addToFavorites(cocktail)
        toast(cocktail.strDrink + ' added to favorites')
    }

    const handleRemoveClick = () => {
        // adding items to favorites
        // if it already contains we do not add it
        if (confirm('Are you sure you want to remove this cocktail from your favorites?') === false)
            return
        removeFromFavorites(cocktail)
    }

    return (
        <div className="mb-2 rounded-lg bg-white p-4 shadow-lg">
            <Image
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="h-48 w-full rounded-t-lg object-cover"
                width={500}
                height={500}
            />
            <div className="p-4 text-start">
                <h2 className="mt-2 text-xl font-bold">Name: {cocktail.strDrink}</h2>
                <p className="text-gray-700">Category: {cocktail.strCategory}</p>
            </div>
            {cardMode !== CocktailCardMode.INITIAL && (
                <CocktailCardActionButton
                    handleActionButtonClick={handleActionButtonClick}
                    cocktailCardMode={cardMode}
                />
            )}
        </div>
    )
}

CocktailCard.displayName = 'CocktailCard'
export default CocktailCard

'use client'
// System import
import { createContext, useState, ReactNode } from 'react'

// Local Import
import { IFavoriteCocktailContext, ICocktail } from '../interface/ICocktail'

export const FavoriteContext = createContext<IFavoriteCocktailContext | undefined>(undefined)

const FavoriteProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteItems, setFavoriteItems] = useState<ICocktail[]>([])

    const addItemToFavorite = (cocktail: ICocktail) => {
        if (favoriteItems.some((item) => item.idDrink === cocktail.idDrink)) return
        setFavoriteItems((prev) => [...prev, cocktail])
    }

    const removeItemFromFavorite = (cocktail: ICocktail) => {
        setFavoriteItems((prev) => prev.filter((item) => item.idDrink !== cocktail.idDrink))
    }

    return (
        <FavoriteContext.Provider
            value={{
                favoriteItems,
                addToFavorites: addItemToFavorite,
                removeFromFavorites: removeItemFromFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteProvider

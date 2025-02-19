// System Import
import { useContext } from 'react'

// Local Import
import { FavoriteContext } from '../context/FavoriteCocktailContext'

const useFavorite = () => {
    const favContext = useContext(FavoriteContext)
    if (!favContext) {
        throw new Error('useFavorite must be used within a FavoriteProvider')
    }
    return favContext
}

export default useFavorite

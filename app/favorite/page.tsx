'use client'

// local import
//import { IFavoriteCocktailContext } from '../interface/ICocktail';
import CocktailsGrid from '../components/CocktailsGrid'
import { CocktailCardMode } from '../enum/CocktailCardMode'
import useFavorite from '../hooks/useFavorite'

const FavoritePage = () => {
    const { favoriteItems } = useFavorite()

    return (
        <>
            <div className="row items-center justify-center">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3 h-14 items-center border-b px-5">
                    <h1>Your Favorite</h1>
                </div>
            </div>
            {/* <div className="mb-3 flex h-14 flex-wrap items-center justify-center space-x-6 px-5"> */}
            <div className="row mb-3 items-center justify-end border-b p-3">
                <div>
                    {favoriteItems.length > 0 ? (
                        <CocktailsGrid
                            cardMode={CocktailCardMode.FAVORITE}
                            cocktailList={favoriteItems}
                            isLoading={false}
                        />
                    ) : (
                        <p>No favorite cocktails yet.</p>
                    )}
                </div>
            </div>
        </>
        
    )
}

FavoritePage.displayName = 'FavoritePage'
export default FavoritePage

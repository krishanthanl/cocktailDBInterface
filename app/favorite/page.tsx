'use client';

// local import
//import { IFavoriteCocktailContext } from '../interface/ICocktail';
import CocktailsGrid from '../components/CocktailsGrid';
import { CocktailCardMode } from '../enum/CocktailCardMode';
import useFavorite from '../hooks/useFavorite';

const FavoritePage = () => {
    const { favoriteItems } = useFavorite();

    return(
        <div className='container'>
            <div className='row items-center justify-center'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 px-5 h-14 items-center  mb-3 border-b'>
                    <h1>Your Favorite</h1>
                </div>
            </div>
            <div className="flex space-x-6 px-5 h-14 items-center justify-center mb-3 flex-wrap">
                <div>
                    {favoriteItems.length > 0 ? 
                        (
                            <CocktailsGrid cocktails={{ initialCocktails: null, laterCocktails: favoriteItems, cardMode: CocktailCardMode.FAVORITE }} />
                        ) 
                        : 
                        (
                        <p>No favorite cocktails yet.</p>
                        )
                    }
                </div>
            </div>
        </div>
        
    );
}

FavoritePage.displayName = 'FavoritePage';
export default FavoritePage;
// system import
import Image from 'next/image';
import { toast } from 'react-toastify';

// local import
import { ICocktailCardProp } from '../interface/ICocktail';
import useFavorite from '../hooks/useFavorite';
import { CocktailCardMode } from '../enum/CocktailCardMode';

export default function CocktailCard({ cocktail, cardMode }: ICocktailCardProp) {
    const { addToFavorites, removeFromFavorites } = useFavorite();

    const handleAddClick = () => {
        addToFavorites(cocktail);
        toast(cocktail.strDrink +' added to favorites');
    }

    const handleRemoveClick = () => {
        if(confirm('Are you sure you want to remove this cocktail from your favorites?') === false) return;
        removeFromFavorites(cocktail);
    }

    return(
        <div className="border rounded-lg shadow-lg overflow-hidden mb-2 flex flex-col">
            <Image src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-48 sm:h-56 md:h-64 object-cover" width={500} height={500}  />
            <div className="p-4 text-center">
                <h2 className="text-lg font-bold">{cocktail.strDrink}</h2>
                <p className="text-gray-600">{cocktail.strCategory}</p>
                {cardMode === CocktailCardMode.SEARCHING && <button onClick={handleAddClick} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto">Add</button>}
                {cardMode === CocktailCardMode.FAVORITE && <button onClick={handleRemoveClick} className="mt-2 bg-red-500 text-white py-2 px-4 rounded w-full sm:w-auto">Remove</button>}
            </div>
        </div>
    );
}
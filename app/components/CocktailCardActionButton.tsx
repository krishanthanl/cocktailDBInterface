'use client'

import { CocktailCardMode } from "../enum/CocktailCardMode"
import { ICocktailCardActionButton } from "../interface/ICocktail"

const CocktailCardActionButton = ({ handleActionButtonClick, cocktailCardMode }: ICocktailCardActionButton) => {
    const buttonColor = cocktailCardMode === CocktailCardMode.SEARCHING ? 'bg-blue-500' : 'bg-red-500'
    return(
        <div className="p-4 text-center">
            <button
                onClick={handleActionButtonClick}
                className={`mt-2 w-full rounded ${buttonColor} px-4 py-2 text-white sm:w-auto w-100`}
            >
                {cocktailCardMode === CocktailCardMode.SEARCHING ? 'Add' : 'Remove'}
            </button>
        </div>
    );
}

CocktailCardActionButton.displayName = 'CocktailCardActionButton'
export default CocktailCardActionButton
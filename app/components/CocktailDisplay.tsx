'use client'

import { useState } from "react";
import { CocktailDisplayProp, ICocktail, ISearchResults } from "../interface/ICocktail";
import CocktailsGrid from "./CocktailsGrid";
import { CocktailCardMode } from "../enum/CocktailCardMode";
import SearchBar from "./SearchBar";

const CocktailDisplay = ({ initialCocktails }: CocktailDisplayProp) => {
    const[cocktailsDetails, setCocktailsDetails] = useState<ICocktail[]>(initialCocktails)
    const [isSearchingMode, setIsSearchingMode] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const cardMode = isSearchingMode ? CocktailCardMode.SEARCHING : CocktailCardMode.INITIAL

    const setSearchResults = (searchResults: ISearchResults) => {
        setCocktailsDetails(searchResults.searchResults)
        setIsSearchingMode(searchResults.isSearchResults)
    }
    //setIsSearchingMode(false);
    return(
        <>
            <div className="row mb-3 items-center justify-end border-b p-3">
                <SearchBar setSearchResults={setSearchResults} setLoading={setIsLoading}></SearchBar>
            </div>
            <div className="row mb-3 items-center justify-start border-b p-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    {/* <CocktailsGrid
                        cocktails={{
                            cocktailList: cocktailsDetails,
                            cardMode: cardMode,
                            isLoading: isLoading
                        }}
                    /> */}
                    <CocktailsGrid
                        cardMode={cardMode}
                        cocktailList={cocktailsDetails}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </>
    );
}

CocktailDisplay.displayName = 'CocktailDisplay'
export default CocktailDisplay
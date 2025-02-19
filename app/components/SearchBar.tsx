'use client'

// this component will do search or show random cocktails (if user press refresh button)
// it decide what is the mode (initial, searching, favorite)
// then pass that to CocktailCard

// System import
import { useState } from 'react'

// Local import
import { ISearchBarProp, ISearchResults } from '../interface/ICocktail'
import { fetchUniqueRandomCocktails, searchCocktails } from '../lib/fetchCocktails'


const SearchBar = ({ setSearchResults, setLoading }: ISearchBarProp) => {
    const [searchQuery, setSearchQuery] = useState('')
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSearch = async () => {
        if (searchQuery.trim() !== '') {
            try {
                setIsLoading(true);
                setLoading(true);
                //setIsSearchingMode(true)
                const seaRes = await searchCocktails(searchQuery)
                const searchResult: ISearchResults = { searchResults: seaRes, isSearchResults: true }
                setSearchResults(searchResult)
            } catch (error) {
                console.error('Error fetching search results:', error)
                setEmptySearchResults();
            } finally {
                setIsLoading(false)
                setLoading(false);
            }
        } else {
            setSearchQuery('')
        }
    }

    const setEmptySearchResults = () => {
        const searchResult: ISearchResults = { searchResults: [], isSearchResults: true }
        setSearchResults(searchResult)
    }

    const handleRefresh = async () => {
        try {
            setIsLoading(true)
            setLoading(true);
            
            const newRandomCocktailList = await fetchUniqueRandomCocktails()
            const searchResult: ISearchResults = { searchResults: newRandomCocktailList, isSearchResults: false }
            setSearchResults(searchResult)
        } catch (error) {
            console.error('Error fetching refresh results:', error)
            const searchResult: ISearchResults = { searchResults: [], isSearchResults: true }
            setSearchResults(searchResult)
        } finally {
            setIsLoading(false)
            setLoading(false);
        }
    }

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === '') {
            
            setSearchQuery('')
        } else {
            setSearchQuery(event.target.value)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    

    return (
        <>
            <div className="row mb-3 items-center justify-end border-b p-3">
                <div className="col-lg-8 col-md-6 col-sm-8 col-xs-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchTextChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search Cocktails"
                        className="form-control"
                    />
                </div>
                <div className="col-lg-2 col-md-3 col-sm-2 col-xs-6">
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="btn btn-primary w-100"
                    >
                        Search
                    </button>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-2 col-xs-6">
                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="btn btn-info w-100"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </>
    )
}

SearchBar.displayName = 'SearchBar'
export default SearchBar

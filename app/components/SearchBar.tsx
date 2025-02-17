'use client';

// this component will do search or show random cocktails (if user press refresh button)
// it decide what is the mode (initial, searching, favorite)
// then pass that to CocktailCard

// System import
import { useState } from 'react';

// Local import
import { ICocktail, ISearchBarProp } from '../interface/ICocktail';
import { fetchRandomCocktails, searchCocktails } from '../lib/fetchCocktails';
import CocktailsGrid from './CocktailsGrid';
import Loader from './Loader';
import { CocktailCardMode } from '../enum/CocktailCardMode';

const SearchBar = ({initialCocktails}: ISearchBarProp) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<ICocktail[]>([]);
	const [randomCocktails, setRandomCocktails] = useState<ICocktail[]>(initialCocktails);
	const [isSearchingMode, setIsSearchingMode] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSearch = async () => {
		if(searchQuery.trim()) {
			try{
				setIsLoading(true);
				setIsSearchingMode(true);
				const seaRes = await searchCocktails(searchQuery);
				setSearchResults(seaRes);
			}catch(error){
				console.error('Error fetching search results:', error);
				setSearchResults([]);
			}finally{
				setIsLoading(false);
			}
		} else {
			setIsSearchingMode(false);
			setSearchQuery('')
			setSearchResults([]);
		}
	}

	const handleRefresh = async () => {
		try{
			setIsLoading(true);
			setIsSearchingMode(false);
			const newRandomCocktailList = await fetchRandomCocktails();
			setRandomCocktails(newRandomCocktailList);
		}catch(error){
			console.error('Error fetching search results:', error);
			setRandomCocktails(initialCocktails);
		}finally{
			setIsLoading(false);
		}
	}

	const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.value === ''){
			setIsSearchingMode(false);
			setRandomCocktails(initialCocktails);
			setSearchQuery('');
		} else {
			setSearchQuery(event.target.value);
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}

	if(isLoading){
		return(<Loader/>)
	}

	return(
	<>
		<div className='container'>
			<div className='row items-center justify-end border-b mb-3 p-3'>
				<div className='col-lg-8 col-md-4 col-sm-4 col-xs-12'>
					<input 
						type='text' 
						value={searchQuery} 
						onChange={handleSearchTextChange}
						onKeyDown={handleKeyDown}
						placeholder='Search Cocktails'
						className='form-control'
					/>
				</div>
				<div className='col-lg-2 col-md-4 col-sm-4  col-xs-12'>
					<button onClick={handleSearch} disabled={isLoading} className='btn btn-primary w-100'>Search</button> 
				</div>
				<div className='col-lg-2 col-md-4 col-sm-4  col-xs-12'>
					<button onClick={handleRefresh} disabled={isLoading} className='btn btn-info w-100'>Refresh</button> 
				</div>
			</div>
			<br/>
			<div className='row items-center justify-start'>
				<div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
					<CocktailsGrid cocktails={{ 
						initialCocktails: isSearchingMode ? [] : randomCocktails, 
						laterCocktails: isSearchingMode? searchResults : null,
						cardMode: isSearchingMode ? CocktailCardMode.SEARCHING : CocktailCardMode.INITIAL
					}} />   
				</div>
			</div>
		</div>
	</>
	);
}

SearchBar.displayName = 'SearchBar';
export default SearchBar;
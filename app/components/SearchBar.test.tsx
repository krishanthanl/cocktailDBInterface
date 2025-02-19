import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { searchCocktails, fetchUniqueRandomCocktails } from '../lib/fetchCocktails';

// Mock the fetch functions
jest.mock('../lib/fetchCocktails', () => ({
    __esModule: true,
    searchCocktails: jest.fn(),
    fetchUniqueRandomCocktails: jest.fn(),
}));

describe('SearchBar Component', () => {
    let setSearchResults: jest.Mock<unknown[], unknown[], unknown>, setLoading: jest.Mock<unknown[], unknown[], unknown>;

    beforeEach(() => {
        setSearchResults = jest.fn();
        setLoading = jest.fn();
    });

    it('renders input and buttons correctly', () => {
        render(<SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />);
        expect(screen.getByPlaceholderText('Search Cocktails')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Refresh')).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        render(<SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />);
        const input = screen.getByPlaceholderText('Search Cocktails') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Margarita' } });
        expect(input.value).toBe('Margarita');
    });

    it('calls searchCocktails on search button click', async () => {
        //searchCocktails.mockResolvedValue([{ id: 1, name: 'Margarita' }]);
        (searchCocktails as jest.Mock).mockResolvedValue([{ id: 1, name: 'Margarita' }]);
        render(<SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />);
        
        const input = screen.getByPlaceholderText('Search Cocktails');
        fireEvent.change(input, { target: { value: 'Margarita' } });
        fireEvent.click(screen.getByText('Search'));
        
        await waitFor(() => expect(searchCocktails).toHaveBeenCalledWith('Margarita'));
        expect(setLoading).toHaveBeenCalledTimes(2); // true, then false
        expect(setSearchResults).toHaveBeenCalledWith({ searchResults: [{ id: 1, name: 'Margarita' }], isSearchResults: true });
    });

    it('calls fetchUniqueRandomCocktails on refresh button click', async () => {
        // fetchUniqueRandomCocktails.mockResolvedValue([{ id: 2, name: 'Mojito' }]);
        // render(<SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />);
        (fetchUniqueRandomCocktails as jest.Mock).mockReturnValue(Promise.resolve([{ id: 2, name: 'Mojito' }]));
        render(<SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />);
        
        fireEvent.click(screen.getByText('Refresh'));
        
        await waitFor(() => expect(fetchUniqueRandomCocktails).toHaveBeenCalled());
        expect(setLoading).toHaveBeenCalledTimes(2); // true, then false
        expect(setSearchResults).toHaveBeenCalledWith({ searchResults: [{ id: 2, name: 'Mojito' }], isSearchResults: false });
    });

    it('does not call searchCocktails when input is empty', async () => {
        render(<SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />);
        fireEvent.click(screen.getByText('Search'));
        await waitFor(() => expect(searchCocktails).not.toHaveBeenCalled());
    });

    it('triggers search on Enter key press', async () => {
        //searchCocktails.mockResolvedValue([{ id: 3, name: 'Old Fashioned' }]);
        render(<SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />);
        
        const input = screen.getByPlaceholderText('Search Cocktails');
        fireEvent.change(input, { target: { value: 'Old Fashioned' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        
        await waitFor(() => expect(searchCocktails).toHaveBeenCalledWith('Old Fashioned'));
    });
});

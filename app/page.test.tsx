import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page'; // Adjust the import path as necessary
//import SearchBar from './components/SearchBar'; // Import the SearchBar component
import { fetchRandomCocktails } from './lib/fetchCocktails'; // Import the fetch function

// Mock the fetchRandomCocktails function
jest.mock('./lib/fetchCocktails', () => ({
    fetchRandomCocktails: jest.fn(),
}));

// Mock the SearchBar component
jest.mock('./components/SearchBar', () => {
    return function MockSearchBar(props: { initialCocktails: unknown }) {
      return <div data-testid="mock-search-bar">{JSON.stringify(props.initialCocktails)}</div>;
    };
});

describe('Home Page', () => {
    const mockCocktails = [
        { id: 1, name: 'Cocktail 1', image: 'image1.jpg' },
        { id: 2, name: 'Cocktail 2', image: 'image2.jpg' },
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    it('renders the Home page with initial cocktails', async () => {
        (fetchRandomCocktails as jest.Mock).mockResolvedValue(mockCocktails);
        // Render the Home component
        const HomeComponent = await Home();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { container } = render(HomeComponent);

        // Check if the "Home" text is rendered
        expect(screen.getByText('Home')).toBeInTheDocument();

        // Check if the SearchBar component is rendered with the correct initialCocktails prop
        const searchBar = screen.getByTestId('mock-search-bar');
        expect(searchBar).toBeInTheDocument();
        expect(searchBar.textContent).toBe(JSON.stringify(mockCocktails));
    });

    it('renders the Home page with empty cocktails if fetch fails', async () => {
        // Mock the fetchRandomCocktails function to throw an error
        (fetchRandomCocktails as jest.Mock).mockRejectedValue(new Error('Failed to fetch cocktails'));
        // Render the Home component
        const HomeComponent = await Home();
        render(HomeComponent);

        // Check if the SearchBar component is rendered with an empty initialCocktails prop
        const searchBar = screen.getByTestId('mock-search-bar');
        expect(searchBar).toBeInTheDocument();
        expect(searchBar.textContent).toBe(JSON.stringify([]));
    });

});
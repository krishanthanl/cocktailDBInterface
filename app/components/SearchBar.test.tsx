import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar'; // Adjust the import path as necessary
//import CocktailsGrid from './CocktailsGrid'; // Import the CocktailsGrid component
//import Loader from './Loader'; // Import the Loader component
import { fetchRandomCocktails, searchCocktails } from '../lib/fetchCocktails'; // Import the fetch functions
import { CocktailCardMode } from '../enum/CocktailCardMode'; // Import the enum
import { ICocktail } from '../interface/ICocktail';

// Mock the fetch functions
jest.mock('../lib/fetchCocktails', () => ({
  fetchRandomCocktails: jest.fn(),
  searchCocktails: jest.fn(),
}));

// Mock the CocktailsGrid component
jest.mock('./CocktailsGrid', () => {
  return function MockCocktailsGrid(props: {
    cocktails: { initialCocktails: unknown; laterCocktails: unknown; cardMode: CocktailCardMode };
  }) {
    return (
      <div data-testid="mock-cocktails-grid">
        {JSON.stringify(props.cocktails)}
      </div>
    );
  };
});

// Mock the Loader component
jest.mock('./Loader', () => {
  return function MockLoader() {
    return <div data-testid="mock-loader">Loading...</div>;
  };
});

describe('SearchBar', () => {
  
    const mockInitialCocktails : ICocktail[] = [
        {
            idDrink: 1, 
            strDrink: 'Cocktail 1', 
            strDrinkThumb: 'image1.jpg',
            strCategory: null,
            strInstructions: null,
            strIngredient1: null,
            strIngredient2: null,
            strIngredient3: null,
            strMeasure1: null,
            strMeasure2: null,
            strMeasure3: null
        },
        {
            idDrink: 2, 
            strDrink: 'Cocktail 2', 
            strDrinkThumb: 'image2.jpg',
            strCategory: null,
            strInstructions: null,
            strIngredient1: null,
            strIngredient2: null,
            strIngredient3: null,
            strMeasure1: null,
            strMeasure2: null,
            strMeasure3: null
        },
    ];

    const mockSearchResults: ICocktail[] = [
        {
            idDrink: 1, 
            strDrink: 'Cocktail 1', 
            strDrinkThumb: 'image1.jpg',
            strCategory: null,
            strInstructions: null,
            strIngredient1: null,
            strIngredient2: null,
            strIngredient3: null,
            strMeasure1: null,
            strMeasure2: null,
            strMeasure3: null
        }
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    it('renders the SearchBar component with initial cocktails', () => {
        // Render the SearchBar component with initialCocktails
        render(<SearchBar initialCocktails={mockInitialCocktails} />);

        // Check if the search input is rendered
        expect(screen.getByPlaceholderText('Search Cocktails')).toBeInTheDocument();

        // Check if the Search and Refresh buttons are rendered
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Refresh')).toBeInTheDocument();

        // Check if the CocktailsGrid component is rendered with initialCocktails
        const cocktailsGrid = screen.getByTestId('mock-cocktails-grid');
        expect(cocktailsGrid).toBeInTheDocument();
        expect(cocktailsGrid.textContent).toBe(
        JSON.stringify({
            initialCocktails: mockInitialCocktails,
            laterCocktails: null,
            cardMode: CocktailCardMode.INITIAL,
        }),
        );
    });

    it('displays the Loader when isLoading is true', () => {
        // Render the SearchBar component
        render(<SearchBar initialCocktails={mockInitialCocktails} />);

        // Mock the fetchRandomCocktails function to delay resolving
        (fetchRandomCocktails as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockInitialCocktails), 1000)),
        );

        // Click the Refresh button to trigger loading
        fireEvent.click(screen.getByText('Refresh'));

        // Check if the Loader is displayed
        expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
    });

    it('searches for cocktails when the Search button is clicked', async () => {
        // Mock the searchCocktails function to return mockSearchResults
        (searchCocktails as jest.Mock).mockResolvedValue(mockSearchResults);

        // Render the SearchBar component
        render(<SearchBar initialCocktails={mockInitialCocktails} />);

        // Type a search query into the input
        const searchInput = screen.getByPlaceholderText('Search Cocktails');
        fireEvent.change(searchInput, { target: { value: 'Cocktail' } });

        // Click the Search button
        fireEvent.click(screen.getByText('Search'));

        // Wait for the search results to be displayed
        await waitFor(() => {
        const cocktailsGrid = screen.getByTestId('mock-cocktails-grid');
        expect(cocktailsGrid.textContent).toBe(
            JSON.stringify({
            initialCocktails: [],
            laterCocktails: mockSearchResults,
            cardMode: CocktailCardMode.SEARCHING,
            }),
        );
        });
    });

    it('refreshes the cocktails when the Refresh button is clicked', async () => {
        // Mock the fetchRandomCocktails function to return new random cocktails
        (fetchRandomCocktails as jest.Mock).mockResolvedValue(mockInitialCocktails);

        // Render the SearchBar component
        render(<SearchBar initialCocktails={mockInitialCocktails} />);

        // Click the Refresh button
        fireEvent.click(screen.getByText('Refresh'));

        // Wait for the random cocktails to be displayed
        await waitFor(() => {
        const cocktailsGrid = screen.getByTestId('mock-cocktails-grid');
        expect(cocktailsGrid.textContent).toBe(
            JSON.stringify({
            initialCocktails: mockInitialCocktails,
            laterCocktails: null,
            cardMode: CocktailCardMode.INITIAL,
            }),
        );
        });
    });

    it('handles API errors gracefully', async () => {
        // Mock the searchCocktails function to throw an error
        (searchCocktails as jest.Mock).mockRejectedValue(new Error('Failed to fetch cocktails'));

        // Render the SearchBar component
        render(<SearchBar initialCocktails={mockInitialCocktails} />);

        // Type a search query into the input
        const searchInput = screen.getByPlaceholderText('Search Cocktails');
        fireEvent.change(searchInput, { target: { value: 'Cocktail' } });

        // Click the Search button
        fireEvent.click(screen.getByText('Search'));

        // Wait for the error to be handled
        await waitFor(() => {
            const cocktailsGrid = screen.getByTestId('mock-cocktails-grid');
            expect(cocktailsGrid.textContent).toBe(
                JSON.stringify({
                initialCocktails: [],
                laterCocktails: [],
                cardMode: CocktailCardMode.SEARCHING,
                }),
            );
        });
    });
});
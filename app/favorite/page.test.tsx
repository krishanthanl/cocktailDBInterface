import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePage from '../favorite/page';
//import CocktailsGrid from '../components/CocktailsGrid'; // Import the CocktailsGrid component
import { CocktailCardMode } from '../enum/CocktailCardMode'; // Import the enum
import useFavorite from '../hooks/useFavorite'; // Import the useFavorite hook

// Mock the useFavorite hook
jest.mock('../hooks/useFavorite', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the CocktailsGrid component
jest.mock('../components/CocktailsGrid', () => {
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

describe('FavoritePage', () => {
  const mockFavoriteItems = [
    { id: 1, name: 'Cocktail 1', image: 'image1.jpg' },
    { id: 2, name: 'Cocktail 2', image: 'image2.jpg' },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the FavoritePage with favorite cocktails', () => {
    // Mock the useFavorite hook to return favorite items
    (useFavorite as jest.Mock).mockReturnValue({
      favoriteItems: mockFavoriteItems,
    });

    // Render the FavoritePage component
    render(<FavoritePage />);

    // Check if the "Your Favorite" heading is rendered
    expect(screen.getByText('Your Favorite')).toBeInTheDocument();

    // Check if the CocktailsGrid component is rendered with the correct props
    const cocktailsGrid = screen.getByTestId('mock-cocktails-grid');
    expect(cocktailsGrid).toBeInTheDocument();
    expect(cocktailsGrid.textContent).toBe(
      JSON.stringify({
        initialCocktails: null,
        laterCocktails: mockFavoriteItems,
        cardMode: CocktailCardMode.FAVORITE,
      }),
    );
  });

  it('renders the FavoritePage with no favorite cocktails', () => {
    // Mock the useFavorite hook to return an empty array
    (useFavorite as jest.Mock).mockReturnValue({
      favoriteItems: [],
    });

    // Render the FavoritePage component
    render(<FavoritePage />);

    // Check if the "Your Favorite" heading is rendered
    expect(screen.getByText('Your Favorite')).toBeInTheDocument();

    // Check if the "No favorite cocktails yet." message is rendered
    expect(screen.getByText('No favorite cocktails yet.')).toBeInTheDocument();

    // Check that the CocktailsGrid component is not rendered
    expect(screen.queryByTestId('mock-cocktails-grid')).not.toBeInTheDocument();
  });
});
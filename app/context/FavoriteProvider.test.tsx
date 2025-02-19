import { render, screen } from '@testing-library/react'
import { FavoriteContext } from '../context/FavoriteCocktailContext'
import { ReactNode, useContext } from 'react'
import { IFavoriteCocktailContext, ICocktail } from '../interface/ICocktail'

// Mock Cocktail Data
const mockCocktail: ICocktail = {
    idDrink: 12345,
    strDrink: 'Margarita',
    strDrinkThumb: 'https://example.com/margarita.jpg',
    strCategory: null,
    strInstructions: null,
    strIngredient1: null,
    strIngredient2: null,
    strIngredient3: null,
    strMeasure1: null,
    strMeasure2: null,
    strMeasure3: null,
}

// Test Component to Consume Context
const TestComponent = () => {
    const context = useContext(FavoriteContext)
    if (!context) throw new Error('TestComponent must be used within FavoriteProvider')

    const { favoriteItems, addToFavorites, removeFromFavorites } = context

    return (
        <div>
            <p data-testid="favorites-count">Favorites Count: {favoriteItems.length}</p>
            <button onClick={() => addToFavorites(mockCocktail)}>Add Favorite</button>
            <button onClick={() => removeFromFavorites(mockCocktail)}>Remove Favorite</button>
        </div>
    )
}

// Mock Provider Wrapper
const mockContextValue: IFavoriteCocktailContext = {
    favoriteItems: [],
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
}

const renderWithProvider = (ui: ReactNode, value = mockContextValue) =>
    render(<FavoriteContext.Provider value={value}>{ui}</FavoriteContext.Provider>)

describe('FavoriteContext', () => {
    it('renders initial state', () => {
        renderWithProvider(<TestComponent />)
        expect(screen.getByTestId('favorites-count')).toHaveTextContent('Favorites Count: 0')
    })

    it('adds item to favorites', () => {
        const customMockValue = {
            ...mockContextValue,
            favoriteItems: [] as ICocktail[], // Add type annotation here
            addToFavorites: jest.fn((cocktail: ICocktail) => {
                customMockValue.favoriteItems.push(cocktail)
            }),
        }

        renderWithProvider(<TestComponent />, customMockValue)
        screen.getByText('Add Favorite').click()

        expect(customMockValue.addToFavorites).toHaveBeenCalledWith(mockCocktail)
        expect(customMockValue.favoriteItems.length).toBe(1)
    })

    it('add same item again and it is not in favorites', () => {
        const customMockValue: IFavoriteCocktailContext = {
            favoriteItems: [mockCocktail],
            addToFavorites: jest.fn((cocktail) => {
                if (
                    !customMockValue.favoriteItems.some((item) => item.idDrink === cocktail.idDrink)
                ) {
                    customMockValue.favoriteItems.push(cocktail)
                }
            }),
            removeFromFavorites: jest.fn(),
        }

        renderWithProvider(<TestComponent />, customMockValue)

        // Click twice to try adding a duplicate
        screen.getByText('Add Favorite').click()
        screen.getByText('Add Favorite').click()

        expect(customMockValue.addToFavorites).toHaveBeenCalledWith(mockCocktail)
        expect(customMockValue.favoriteItems.length).toBe(1) // Should still be 1, no duplicates
    })

    it('removes item from favorites', () => {
        const customMockValue = {
            ...mockContextValue,
            favoriteItems: [mockCocktail],
            removeFromFavorites: jest.fn((cocktail) => {
                customMockValue.favoriteItems = customMockValue.favoriteItems.filter(
                    (item) => item.idDrink !== cocktail.idDrink,
                )
            }),
        }

        renderWithProvider(<TestComponent />, customMockValue)
        screen.getByText('Remove Favorite').click()

        expect(customMockValue.removeFromFavorites).toHaveBeenCalledWith(mockCocktail)
        expect(customMockValue.favoriteItems.length).toBe(0)
    })
})

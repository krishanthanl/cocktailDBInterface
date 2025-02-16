import React from 'react';
import { renderHook } from '@testing-library/react';
import useFavorite from './useFavorite'; // Adjust the import path as necessary
import { FavoriteContext } from '../context/FavoriteCocktailContext'; // Import the context
import { ICocktail } from '../interface/ICocktail';

describe('useFavorite', () => {

    const mockFavoriteItems : ICocktail[] = [
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

    // Mock context values
    const mockContextValue = {
        favoriteItems: mockFavoriteItems,
        addToFavorites: jest.fn(),
        removeFromFavorites: jest.fn(),
    };

    it('should return the context value when used within a FavoriteProvider', () => {
        // Create a wrapper component to provide the context
        const wrapper = ({ children }: { children: React.ReactNode }) => (
        <FavoriteContext.Provider value={mockContextValue}>
            {children}
        </FavoriteContext.Provider>
        );

        // Render the hook within the wrapper
        const { result } = renderHook(() => useFavorite(), { wrapper });

        // Check if the hook returns the correct context value
        expect(result.current).toEqual(mockContextValue);
    });

    it('should throw an error when used outside of a FavoriteProvider', () => {

        try{
            renderHook(() => useFavorite());
        }catch(error: unknown){
            if (error instanceof Error) {
                expect(error.message).toEqual('useFavorite must be used within a FavoriteProvider');
            }
        }
    });
});
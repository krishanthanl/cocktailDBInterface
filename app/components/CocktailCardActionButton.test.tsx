import { render, screen, fireEvent } from '@testing-library/react'
import CocktailCardActionButton from '../components/CocktailCardActionButton'
import { CocktailCardMode } from '../enum/CocktailCardMode'

describe('CocktailCardActionButton Component', () => {
    const mockHandleClick = jest.fn()

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders Add button in SEARCHING mode', () => {
        render(
            <CocktailCardActionButton
                handleActionButtonClick={mockHandleClick}
                cocktailCardMode={CocktailCardMode.SEARCHING}
            />,
        )

        const addButton = screen.getByRole('button', { name: /Add/i })
        expect(addButton).toBeInTheDocument()
        expect(addButton).toHaveClass('bg-blue-500')

        fireEvent.click(addButton)
        expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })

    it('renders Remove button in FAVORITE mode', () => {
        render(
            <CocktailCardActionButton
                handleActionButtonClick={mockHandleClick}
                cocktailCardMode={CocktailCardMode.FAVORITE}
            />,
        )

        const removeButton = screen.getByRole('button', { name: /Remove/i })
        expect(removeButton).toBeInTheDocument()
        expect(removeButton).toHaveClass('bg-red-500')

        fireEvent.click(removeButton)
        expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })

    it('handles click events properly', () => {
        render(
            <CocktailCardActionButton
                handleActionButtonClick={mockHandleClick}
                cocktailCardMode={CocktailCardMode.SEARCHING}
            />,
        )

        const button = screen.getByRole('button', { name: /Add/i })
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandleClick).toHaveBeenCalledTimes(2)
    })
})

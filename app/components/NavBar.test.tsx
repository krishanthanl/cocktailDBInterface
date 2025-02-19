import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import NavBar from './NavBar'

describe('Testing NavBar Component', () => {
    it('Render Navbar component', () => {
        render(<NavBar />)
        const navElement = screen.getByRole('navigation')
        expect(navElement).toBeInTheDocument()
    })

    it('Renders the Home link with the correct href', () => {
        render(<NavBar />)
        const homeLink = screen.getByText('Home')
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute('href', '/')
    })

    it('Home link should render correct styles', () => {
        render(<NavBar />)
        const homeLink = screen.getByText('Home')
        expect(homeLink).toHaveClass('text-zinc-500')
        expect(homeLink).toHaveClass('hover:text-zinc-800')
        expect(homeLink).toHaveClass('transition-colors')
    })

    it('Renders the Favorite link with the correct href', () => {
        render(<NavBar />)
        const homeLink = screen.getByText('Favorite')
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute('href', '/favorite')
    })

    it('Home link should render correct styles', () => {
        render(<NavBar />)
        const homeLink = screen.getByText('Favorite')
        expect(homeLink).toHaveClass('text-zinc-500')
        expect(homeLink).toHaveClass('hover:text-zinc-800')
        expect(homeLink).toHaveClass('transition-colors')
    })
})

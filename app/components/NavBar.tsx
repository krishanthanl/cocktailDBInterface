'use client'

// Navigation bar to show home and favorite link
// in here I tried to use  refreshHomepage function to revalidate
import Link from 'next/link'

const NavBar = () => {
    return (
        <nav className="mb-3 flex h-14 items-center justify-end space-x-6 border-b px-5">
            <Link href="/" className="text-zinc-500 transition-colors hover:text-zinc-800">
                Home
            </Link>
            <Link href="/favorite" className="text-zinc-500 transition-colors hover:text-zinc-800">
                Favorite
            </Link>
        </nav>
    )
}

NavBar.displayName = 'NavBar'
export default NavBar

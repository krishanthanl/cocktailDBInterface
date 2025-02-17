"use client";

// Navigation bar to show home and favorite link
// in here I tried to use  refreshHomepage function to revalidate
import Link from "next/link";

const NavBar = () => {
    return (
        <nav className="flex space-x-6 border-b px-5 h-14 items-center justify-end mb-3">
            <Link 
                href="/" 
                className="text-zinc-500 hover:text-zinc-800 transition-colors">Home</Link>
            <Link 
                href="/favorite" 
                className="text-zinc-500 hover:text-zinc-800 transition-colors">Favorite</Link>
        </nav>
    );
}

NavBar.displayName = 'NavBar';
export default NavBar;
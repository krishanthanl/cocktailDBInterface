'use client'

// spinner when loading data
const Loader = () => {
    return (
        <div className="flex h-16 items-center justify-center" role="status" aria-label="Loading">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
    )
}

Loader.displayName = 'Loader'
export default Loader

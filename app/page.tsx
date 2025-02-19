// local import
import CocktailDisplay from './components/CocktailDisplay'
import { fetchUniqueRandomCocktails } from './lib/fetchCocktails'

const getRandomImages = async () => {
    try {
        return await fetchUniqueRandomCocktails()
    } catch (error) {
        console.error('Failed to fetch cocktails:', error)
        return []
    }
}

export default async function Home() {
    const initialCocktails = await getRandomImages()
    return (
        <div className="container">
            <h3>Home</h3>
            <CocktailDisplay initialCocktails={initialCocktails}></CocktailDisplay>
        </div>
    )
}

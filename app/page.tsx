// local import
import SearchBar from "./components/SearchBar";
import { fetchRandomCocktails } from "./lib/fetchCocktails";

const getRandomImages = async () => {
    try{
        return await fetchRandomCocktails();
    } catch (error) {
        console.error("Failed to fetch cocktails:", error);
		return [];
    }
    
}

export default async function Home() {
    const initialCocktails = await getRandomImages();
    return (
      <div>
        <h3>Home</h3>
        <SearchBar initialCocktails={initialCocktails}></SearchBar>
      </div>
    );
}
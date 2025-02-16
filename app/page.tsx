// local import
import SearchBar from "./components/SearchBar";
import { fetchRandomCocktails } from "./lib/fetchCocktails";

const getRandomImages = async () => {
    return await fetchRandomCocktails();
}

export default async function Home() {
    const initialCocktails = await getRandomImages();
    return (
      <div>
        <SearchBar initialCocktails={initialCocktails}></SearchBar>
      </div>
    );
}
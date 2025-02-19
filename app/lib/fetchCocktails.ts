import { ICocktail } from '../interface/ICocktail'

export const fetchUniqueRandomCocktails = async (): Promise<ICocktail[]> => {
    // fetchRandomCocktails does not gurantee always return 5 items
    // So we use this wrapper function to make sure we get 5 items

    let runContinue = true
    let result = await fetchRandomCocktails(5)
    let numOfCocktails = result.length

    while (runContinue) {
        if (numOfCocktails === 5) {
            runContinue = false
        } else {
            numOfCocktails = 5 - numOfCocktails
            if (numOfCocktails > 0) {
                const newCocktails = await fetchRandomCocktails(numOfCocktails)
                result = [...result, ...newCocktails]
                result = makeCocktailsListUniq(result)
                numOfCocktails = result.length
            }
        }
    }

    return result
}

export const fetchRandomCocktails = async (numberOfCocktails: number): Promise<ICocktail[]> => {
    // we are going to fetch 5 random cocktails
    // there high proverbiality to cache the result in backend
    // so using cache buster to make the request unique
    // Array.from to generate an array where each element is an asynchronous function call to fetch
    const fetchPromises = Array.from({ length: numberOfCocktails }, async () => {
        try {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/random.php?_cb=${Date.now()}-${Math.random()}`,
            )
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            return data.drinks[0]
        } catch (error) {
            console.error('Error fetching random cocktail:', error)
            return null // Return null for failed requests
        }
    })

    // call this 5 url at once
    const cocktails = await Promise.all(fetchPromises)
    // make unique list
    const uniqCocktailList = makeCocktailsListUniq(cocktails)
    // Filter out null values (failed requests)
    return uniqCocktailList.filter((cocktail) => cocktail !== null) as ICocktail[]
}

export const searchCocktails = async (searchTerm: string): Promise<ICocktail[]> => {
    // This will fetch cocktails based on the search term

    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`,
    )
    const data = await response.json()
    const searchResult = (data.drinks as ICocktail[]) || []
    return searchResult
}

const makeCocktailsListUniq = (cocktails: ICocktail[]): ICocktail[] => {
    // make ICocktail object array to unique list
    const seen = new Set()
    return cocktails.filter((c) => !seen.has(c.idDrink) && seen.add(c.idDrink))
}

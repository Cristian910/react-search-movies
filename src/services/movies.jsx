const apikey = '4287ad07'

export const searchMovies = async({search,type}) => {
    if(search === "") return null
    try {  
        const response = await fetch(`https://omdbapi.com/?apikey=${apikey}&s=${search}&type=${type}`)
        const json = await response.json()

        const listMovies = json.Search
  
        return listMovies?.map(movie => ({
            id: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title,
            year: movie.Year
        }))
    }
    catch(e){
        throw new Error("error searching movies")
    }
  }
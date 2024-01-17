import { useCallback, useState } from "react";
import { Movies } from "./components/listMovies";
import {useMovies} from "./hooks/useMovies"
import {useSearch} from "./hooks/useSearch"
import debounce from 'just-debounce-it' 

function App() {
  const [sort,setSort] = useState(false)
  const {search,updateSearch,error,type,updateType,isFirstRender} = useSearch()
  const {movies,getMovies,loading} = useMovies({search,type,sort})

  const debounceGetMovies = useCallback(
    debounce((search,type) => {
      //console.log('search',search,'type',type)
      getMovies({search,type})
    },300)
    ,[])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search,type})
  }
  const handleChange = (event) => {
    const valueInput = event.target.value
    if(valueInput.startsWith(" ")) return
    updateSearch(valueInput)
    debounceGetMovies(valueInput,type)
  }
  const typeChange = (event) => {
    const valueType = event.target.value
    updateType(valueType)
    getMovies({search,type:valueType})
  }

  const handleCheck = () => {
    setSort(!sort)
  }
  return (
    <>
    <h1>Busca tu pelicula</h1>
    <form className="formSearch" onSubmit={handleSubmit}>

      <input style={{border: '1px solid transparent',
       borderColor:error?'red':'transparent'}} type="text" onChange={handleChange} value={search} name='searchMovie'/>
       <label htmlFor="">ordenar:</label>
      <input type="checkbox" onChange={handleCheck} checked={sort}/>
      <select name="chooseType" onChange={typeChange}>
        <option value="series">series</option>
        <option value="movie">peliculas</option>
        <option value="episode">episodios</option>
      </select>

      <button type='submit'>Search Movie</button>
    </form>
    {error && <h3 style={{color:'red'}}>{error}</h3>}
    {loading?<p>Cargando...</p>:<Movies className="movies" listMovies={movies} firstRender={isFirstRender} error={error}/>}
    </>
  );
}

export default App;

import { useState,useRef,useMemo, useCallback} from "react"
import { searchMovies } from "../services/movies"

export function useMovies({search,type,sort}) {
    const [movies,setMovies] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const previousSearch = useRef(search)
    const previousType = useRef(type)

    const getMovies = useCallback(async({search,type}) => {
            if(search === previousSearch.current && type === previousType.current) return
            try{
                setLoading(true)
                setError(false)
                previousSearch.current = search
                previousType.current = type
                const newMovies = await searchMovies({search,type})
                setMovies(newMovies)
            }catch(e){
                setError(e.message)
            }finally{
                setLoading(false)
            }      
        }
    ,[])
    //useMemo: se actualiza el cambio solo si cambian las dependencias indicadas
    //si no se usara el useMemo,se ejecutaria la funcion cada vez que se escriba una letra en el input ya que se vuelve a ejecutar el cuerpo de la funcion
    //tambien puede retornar una funcion
    const sortedMovies = useMemo(() => {
        return sort?[...movies].sort((a,b) => a.title.localeCompare(b.title)):movies
        },[movies,sort]
        )
    
    return {movies:sortedMovies,getMovies,loading}
}
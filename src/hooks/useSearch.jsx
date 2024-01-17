import {useState,useEffect,useRef} from "react"

export function useSearch(){
    const [error,setError] = useState(null)
    const [search,updateSearch] = useState('')
    const [type,updateType] = useState('series')
    const isFirstRender = useRef(true)
    useEffect(()=> {
      if(isFirstRender.current) {
        isFirstRender.current = search == ""
        return
      }
      if(search == "") {
        setError("No puedes buscar un resultado vacio")
        return
      }
      if(search.length < 3) {
        setError("la busqueda debe tener minimo 3 caracteres")
        return
      }
      setError(null)
    },[search])
    return {search,updateSearch,error,type,updateType,isFirstRender}
  }
function ListOfMovies ({listMovies}) {
    
    
    return (
        <>
        <ul className="listMovies">
          {
          listMovies.map(movie => {
            if (!movie.poster || movie.poster === "N/A") return
            return (
              <li key={movie.id} className="itemMovie">
                <img src={movie.poster} alt={`Image of movie: ${movie.title}`} />
                <h2>{movie.title}</h2>
                <p>{movie.year}</p>
              </li>
            );
          })
        }
          </ul>
          </>
    )}
function WithoutResults ({firstRender,error}){
  const showSentence = firstRender.current || error
  return (
    
    showSentence?null:
    <p>No se encontraron resultados.</p>
  )

}

export function Movies ({listMovies,firstRender,error}) {
  const hasMovies = listMovies?.length > 0;
  return (
    hasMovies?
    <ListOfMovies listMovies={listMovies}/>:
    <WithoutResults firstRender={firstRender} error={error}/>
  )
}
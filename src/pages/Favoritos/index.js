import './favoritos.css'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

function Favoritos(){

  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    const filmesFavoritos = localStorage.getItem('@primeFlix')
    setFilmes(JSON.parse(filmesFavoritos) || [])
  }, [])

  function removeFav(id){
    const filtroFilmes = filmes.filter((f) => {
      return (f.id !== id)
    })
    
    setFilmes(filtroFilmes)
    localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes))
  }

  return(
    <div class='fav-area'>
      <div class='fav-container'>
        {filmes.map((filme) => {
          return(
            <div class='fav-cards'>
              <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt='imagem filme'/>
              <div class='fav-actions'>
                <span class='fav-title'>{filme.title}</span>
                <Link to={`/filme/${filme.id}`}>Detalhes</Link>
                <button onClick={() => removeFav(filme.id)}>Excluir</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Favoritos
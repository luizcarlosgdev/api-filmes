import './favoritos.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

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
    toast.success('Filme removido com sucesso!')
  }

  return(
    <div class='fav-container'>
      <h1>Filmes Favoritos</h1>
      {filmes.map((filme) => {
        return(
          <div class='fav-cards'>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt='imagem filme'/>
            <span class='fav-title'>{filme.title}</span>
            <div class='fav-actions'>
              <Link to={`/filme/${filme.id}`}>Detalhes</Link>
              <button onClick={() => removeFav(filme.id)}>Excluir</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Favoritos
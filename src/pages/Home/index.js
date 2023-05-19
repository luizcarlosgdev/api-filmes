import './home.css'
import { useState, useEffect } from 'react'

import api from '../../services/api'
import { Link } from 'react-router-dom'
import { CgMoreO } from 'react-icons/cg' 
import Loading from '../../components/Loading'

function Home(){

  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilmes(){
      await api.get('movie/now_playing', {
        params:{
          api_key: '8c88f1e6c8055fb2d07f17e93dbd19d5',
          language: 'pt-br',
          page: 1
        }
      })
      .then((response) => {
        setFilmes(response.data.results.slice(0, 10))
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    loadFilmes()
  }, [])

  if(loading){
    return(
      <div class='render-loading'>
        <Loading/>
      </div>
    )
  }

  return(
    <div class='container'>
      <div class='container-cards'>
        {filmes.map((filme) => {
          return(
            <article 
              key={filme.id}
              class='card'
            >
              <div class='container-image'>
                <img
                  class='front-image' 
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt='imagem-filme'
                />
                <Link to={`/filme/${filme.id}`} class='more-info'><CgMoreO size={25}/></Link>
              </div>
              <span class='filme-title'>{filme.title}</span>
            </article>
          )
        })}
      </div>
    </div>
  )
}
export default Home
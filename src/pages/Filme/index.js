import './filme.css'
import {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import { CgMoreO } from 'react-icons/cg'

function Filme(){

  const { id } = useParams()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadFilme(){
      await api.get(`movie/${id}`, {
        params: {
          api_key: '8c88f1e6c8055fb2d07f17e93dbd19d5',
          language: 'pt-br',
          page: 1
        }
      })
      .then((response) => {
        setFilme(response.data)
        setLoading(false)
       
      })
      .catch((error) => {
        alert('Filme não encontrado!')
        navigate('/', {replace: true})
        return
      })
    }
    loadFilme()

    return() => {
      console.log('desmontado')
    }
  }, [id, navigate])

  function salvarFilme(){
    const minhaLista = localStorage.getItem('@primeFlix')
    const filmesSalvos = JSON.parse(minhaLista) || [] 
    const searchFilm = filmesSalvos.some((oldFilm) => oldFilm.id === filme.id)

    if(searchFilm){
      alert('ta louco meo, filme já adicionado!')
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos))
    alert('Filme adicionado!')
  }

  if(loading){
    return(
      <div class='render-loading'>
        <Loading/>
      </div>
    )
  }

  return(
    <div class='filme-container'>
      <div class='filme-detalhes'>
        <img
          class='filme-image' 
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt='imagem-filme'
        />
        <span class='filme-nome'>{filme.title}</span>
        <span class='filme-sinopse'>{filme.overview}</span>
        <span class='filme-classificação'>{filme.vote_average}/10</span>
        <div class='filme-button-container'>
          <button>
            <a target='blank' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
              Trailer
            </a>
          </button>
          <button
            onClick={salvarFilme}
          >
            Favoritar
          </button>
        </div>
      </div>
    </div>
  )
}
export default Filme
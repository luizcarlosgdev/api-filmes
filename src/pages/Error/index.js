import { Link } from "react-router-dom"
import './error.css'

function Erro(){
  return(
    <div class='container-error'>
      <div class='background-error'>
        <h1>Algo está errado</h1>
        <span>Nós desculpe por isso, volte a página inicial clicando no botão abaixo</span>
        <Link class='button-home' to='/'>HOME</Link>
      </div>
    </div>
  )
}
export default Erro
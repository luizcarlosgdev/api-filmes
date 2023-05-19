import './header.css'
import { Link } from 'react-router-dom'

function Header(){
  return(
    <header>
      <Link class='logo' to='/'>Prime Flix</Link>
      <Link class='favoritos' to='/favoritos'>Meus favoritos</Link>
    </header>
  )
}
export default Header
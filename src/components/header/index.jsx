import { Link } from "react-router-dom";
import "./header.css"

const Header = () => {
    return(
        <header>
            <ul className="nav_header">
                <Link to={"/"} className="logo">PokaArena</Link>
                <Link to={"/batalha"}>Sala de Batalha</Link>
                <Link to={"/colecao"} className="colecao">Minha Coleção</Link>
            </ul>

             <ul className="nav_mobile">
                <Link to={"/"} className="logo">PokaArena</Link>
               <div className="link">
                 <Link className="batalha" to={"/batalha"}>Sala de Batalha</Link>
                <Link to={"/colecao"} className="colecao">Minha Coleção</Link>
               </div>
            </ul>
        </header>
    )
}

export default Header
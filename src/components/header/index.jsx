import { Link } from "react-router-dom";
import "./header.css"

const Header = () => {
    return(
        <header>
            <ul>
                <Link to={"/"} className="logo">PokaArena</Link>
                <Link to={"/batalha"}>Sala de Batalha</Link>
                <Link to={"/colecao"} className="colecao">Minha Coleção</Link>
            </ul>
        </header>
    )
}

export default Header
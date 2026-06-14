import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <Link to={"/"} className="footer-logo">PokaArena</Link>
            <p className="direitos">&copy; {new Date().getFullYear()} PokaArena. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;

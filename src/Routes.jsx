import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Detalhes from "./pages/detalhes"
import Colecao from "./pages/colecao"
import Header from "./components/header"
import Footer from "./components/footer"
import Batalha from "./pages/batalhar"

const RoutApp = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/detalhes/:id" element={<Detalhes/>}/>
                <Route path="/colecao" element={ <Colecao/>}/>
                <Route path="/batalha" element={ <Batalha/>}/>
                
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default RoutApp
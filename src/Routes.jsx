import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Detalhes from "./pages/detalhes"
import Colecao from "./pages/colecao"

const RoutApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/detalhes/:id" element={<Detalhes/>}/>
                <Route path="/colecao" element={ <Colecao/>}/>
                
            </Routes>
        </BrowserRouter>
    )
}

export default RoutApp
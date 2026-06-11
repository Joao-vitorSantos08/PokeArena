import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"

const RoutApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutApp
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./colecao.css"

const Colecao = () => {

    const [colecao, setColecao] = useState([])

    useEffect(() => {
        const dados = () => {
            const minhaColecao = localStorage.getItem("@pokemon")

            setColecao(JSON.parse(minhaColecao) || [])
            console.log(JSON.parse(minhaColecao) || [])
        }
        dados()
    }, [])

    const remover = (pokemon) => {
       const lista =  colecao.filter((item) => item.id != pokemon.id)
       
        setColecao(lista)
        localStorage.setItem("@pokemon", JSON.stringify(lista))

    }

    return (
        <main className="main_colecao">
            {colecao.map((pokemon) => (
                <article className="card" key={pokemon.id}>
                    <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default} title={pokemon.name} />
                    <div className="info">
                        <h1>{pokemon.name}</h1>
                        <Link to={`/detalhes/${pokemon.id}`}>Detalhes</Link>
                        <button onClick={() => remover(pokemon)}>Remove da coleção</button>
                    </div>
                </article>
            ))}
        </main>
    )
}

export default Colecao
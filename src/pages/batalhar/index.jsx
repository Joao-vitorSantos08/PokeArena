import { useState, useEffect } from "react"
import "./batalhar.css"

const Batalha = () => {

    const [timeAzul, setTimeAzul] = useState([])
    const [timeVermelho, setTimeVermelho] = useState([])

    const [pokemonAzulSelecionado, setPokemonAzulSelecionado] = useState(null)
    const [pokemonVermelhoSelecionado, setPokemonVermelhoSelecionado] = useState(null)

    useEffect(() => {
        const dados = async () => {

            let url = `https://pokeapi.co/api/v2/pokemon?limit=20`
            const resposta = await fetch(url)
            const dados = await resposta.json()

            const results = dados.results.map(async (results) => {
                const resResults = await fetch(results.url)
                return await resResults.json()
            })

            const resultados = await Promise.all(results)

            setTimeAzul(resultados)
            console.log(resultados)
            setTimeVermelho(resultados)
        }

        dados()

    }, [])

    const batalhar = () => {
        if(pokemonAzulSelecionado === null || pokemonVermelhoSelecionado === null){
            alert("selecione os pokemon para batalhar")
        }

        if (pokemonAzulSelecionado.
            base_experience
            > pokemonVermelhoSelecionado.
                base_experience
        ) {
            alert(`${pokemonAzulSelecionado.name} ganhou`)
        } else if (pokemonAzulSelecionado.
            base_experience
            === pokemonVermelhoSelecionado.
                base_experience) {
            alert("Empate")
        } else {
            alert(`${pokemonVermelhoSelecionado.name} ganhou`)
        }

    }

    return (
        <section className="section_batalhar">
            <div className="timeAzul">
                {timeAzul.map((pokemon) => (
                    <article key={pokemon.id} onClick={() => setPokemonAzulSelecionado(pokemon)}>
                        <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default} alt="" />
                        <p>{pokemon.name}</p>
                    </article>
                ))}
            </div>

            <main className="campo_de_batalha">

                <div className="arena-combate">
                    {pokemonAzulSelecionado && (
                        <div className="card card-azul">
                            <img src={pokemonAzulSelecionado.sprites.front_default} alt="" />
                            <h2>{pokemonAzulSelecionado.name}</h2>
                        </div>
                    )}

                    <h1>VS</h1>

                    {pokemonVermelhoSelecionado && (
                        <div className="card card-vermelho">
                            <img src={pokemonVermelhoSelecionado.sprites.front_default} alt="" />
                            <h2>{pokemonVermelhoSelecionado.name}</h2>
                        </div>
                    )}
                </div>

                <button onClick={batalhar}>batalhar</button>

            </main>

            <div className="timeVermelho">
                {timeVermelho.map((pokemon) => (
                    <article key={pokemon.id} onClick={() => setPokemonVermelhoSelecionado(pokemon)}>
                        <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default} alt="" />
                        <p>{pokemon.name}</p>
                    </article>
                ))}
            </div>

        </section>
    )
}

export default Batalha 
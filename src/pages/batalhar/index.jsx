import { useState, useEffect } from "react"
import "./batalhar.css"
import Swal from "sweetalert2"

const Batalha = () => {

    const [timeAzul, setTimeAzul] = useState([])
    const [timeVermelho, setTimeVermelho] = useState([])

    const [pokemonAzulSelecionado, setPokemonAzulSelecionado] = useState(null)
    const [pokemonVermelhoSelecionado, setPokemonVermelhoSelecionado] = useState(null)

    useEffect(() => {
        const dados = async () => {

            let url = `https://pokeapi.co/api/v2/pokemon?limit=60`
            const resposta = await fetch(url)
            const dados = await resposta.json()

            const results = dados.results.map(async (results) => {
                const resResults = await fetch(results.url)
                return await resResults.json()
            })

            const resultados = await Promise.all(results)

            setTimeAzul(resultados.slice(0, 30))
            console.log(resultados)
            setTimeVermelho(resultados.slice(30, 60))
        }

        dados()

    }, [])

    const batalhar = () => {
        if (pokemonAzulSelecionado === null || pokemonVermelhoSelecionado === null) {

            Swal.fire({
                title: "Atenção",
                text: "Selecione os dois Pokémon para batalhar.",
                icon: "warning"
            })

            return
        }

        if (pokemonAzulSelecionado.
            base_experience
            > pokemonVermelhoSelecionado.
                base_experience
        ) {
            Swal.fire({
                title: `🏆 ${pokemonAzulSelecionado.name} venceu!`,
                imageUrl: `${pokemonAzulSelecionado.sprites.front_default}`,
                imageAlt: pokemonAzulSelecionado.name,
                text: `Experiência: ${pokemonAzulSelecionado.base_experience}`,
                confirmButtonText: "Continuar"
            })

        } else if (pokemonAzulSelecionado.base_experience === pokemonVermelhoSelecionado.base_experience) {
            Swal.fire({
                title: "🤝 Empate",
                text: "Os dois Pokémon possuem a mesma experiência.",
                icon: "info"
            })

        } else {
            Swal.fire({
                title: `🏆 ${pokemonVermelhoSelecionado.name} venceu!`,
                imageUrl: `${pokemonVermelhoSelecionado.sprites.front_default}`,
                imageAlt: pokemonVermelhoSelecionado.name,
                text: `Experiência: ${pokemonVermelhoSelecionado.base_experience}`,
                confirmButtonText: "Continuar"
            })

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
                    <div>
                        <p>{pokemonAzulSelecionado === null ? " Selecione um pokemon " : ""}</p>
                        {pokemonAzulSelecionado && (
                            <div className="card card-azul">
                                <img src={pokemonAzulSelecionado.sprites.front_default} alt="" />
                                <h2>{pokemonAzulSelecionado.name}</h2>
                            </div>
                        )}
                    </div>

                    <h1>VS</h1>

                    <div>
                        <p>{pokemonVermelhoSelecionado === null ? " Selecione um pokemon " : ""}</p>
                        {pokemonVermelhoSelecionado && (
                            <div className="card card-vermelho">
                                <img src={pokemonVermelhoSelecionado.sprites.front_default} alt="" />
                                <h2>{pokemonVermelhoSelecionado.name}</h2>
                            </div>
                        )}
                    </div>
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
import { useState, useEffect } from "react"
import "./home.css"
import { Link } from "react-router-dom"

const Home = () => {


    const [pokemons, setPokemons] = useState([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const data = async () => {
            const url = (`https://pokeapi.co/api/v2/pokemon?limit=200`)

            const resposta = await fetch(url)

            const dados = await resposta.json()

            const detalhes = dados.results.map(async (detalhe) => {
                const resDetalhes = await fetch(detalhe.url)
                return await resDetalhes.json()
            })

            const pokemonsDetalhes = await Promise.all(detalhes)

            setPokemons(pokemonsDetalhes)
            console.log(pokemonsDetalhes)
            setLoading(false)
        }

        data()
    }, [])


    if (loading || !pokemons) {
        return <p className="loading">Carregando dados do Pokémon...</p>;
    }


    return (
        <main>
            {pokemons.map((pokemon) => (
                <Link key={pokemon.id} to={`/detalhes/${pokemon.id}`}>
                    <article>
                        <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default || pokemon.sprites.front_default} title={pokemon.name} />
                        <p>Nome: {pokemon.name}</p>
                        <p>Experiência: <strong>{pokemon.base_experience}</strong></p>
                        <p>vida: <strong>{pokemon.stats[0].base_stat}</strong></p>
                        <p>Ataque: <strong>{pokemon.stats[1].base_stat}</strong></p>
                        <p>Defesa: <strong>{pokemon.stats[2].base_stat}</strong></p>
                    </article>
                </Link>
            ))}
        </main>
    )
}

export default Home
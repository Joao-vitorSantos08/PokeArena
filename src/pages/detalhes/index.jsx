import { useState, useEffect, } from "react"
import { useParams } from "react-router-dom"
import "./detalhs.css"
import Swal from "sweetalert2"

const Detalhes = () => {

    const { id } = useParams()
    const [pokemon, setPokemon] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const detalhesPokemon = async () => {

            const url = `https://pokeapi.co/api/v2/pokemon/${id}`

            const resposta = await fetch(url)

            const dados = await resposta.json()

            console.log(dados)
            setPokemon(dados)
            setLoading(false)
        }

        detalhesPokemon()

    }, [id])

    if (loading || !pokemon) {
        return <p className="loading">Carregando dados do Pokémon...</p>;
    }

    const salvar = () => {
        const lista = localStorage.getItem("@pokemon")
        const novalista = JSON.parse(lista) || []

        const verificar = novalista.some((item) => item.name === pokemon.name || item.id === pokemon.id)

        if (verificar) {
            Swal.fire({
                title: "Pokémon já salvo",
                text: `${pokemon.name} já está na sua coleção.`,
                icon: "info"
            })
            return
        }

        novalista.push(pokemon)
        localStorage.setItem("@pokemon", JSON.stringify(novalista))
        Swal.fire({
            title: "Pokémon salvo!",
            text: `${pokemon.name} foi adicionado à sua coleção.`,
            icon: "success"
        })
    }

    return (
        <main className="main_detalhes">

            <div className="container">

                <div className="infor_basic">
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites.front_default} alt={pokemon?.name} />
                    <p>Altura: {pokemon.height / 10} m</p>
                    <p>peso: {pokemon.weight / 10} kg</p>
                </div>

                <ul className="habilidades">Habilidades: {pokemon.abilities.map((habilidade, index) => (
                    <li key={index}>
                        {habilidade.ability.name}
                    </li>
                ))}
                </ul>

                <div className="pokemon_info">
                    <p>Vida (HP): {pokemon.stats[0]?.base_stat}</p>
                    <p>Ataque: {pokemon.stats[1]?.base_stat}</p>
                    <p>Defesa: {pokemon.stats[2]?.base_stat}</p>
                    <p>Ataque Especial: {pokemon.stats[3]?.base_stat}</p>
                    <p>Defesa Especial: {pokemon.stats[4]?.base_stat}</p>
                    <p>Velocidade: {pokemon.stats[5]?.base_stat}</p>
                    <p>Recompensa de Exp.: {pokemon.base_experience}</p>
                    <p>Especie: {pokemon.species.name}</p>

                </div>

                <ul className="golpes">
                    Lista de golpes: {pokemon.moves.slice(0, 30).map((golpes, index) =>
                    (
                        <li key={index}>{golpes.move.name}</li>
                    ))}
                </ul>

                <div className="gritoPokemon">
                    <h3>Grito do Pokémon:</h3>
                    <audio controls src={pokemon.cries?.legacy}> </audio>
                </div>

                <button className="btn" onClick={salvar}>Salvar na Coleção</button>

            </div>

        </main>
    )
}


export default Detalhes
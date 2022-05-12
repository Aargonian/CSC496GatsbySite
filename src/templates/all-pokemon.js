import React from "react"
import { Link } from 'gatsby'
import './all-pokemon.css'

export default function AllPokemon({ pageContext: { allPokemon } }) {
  return (
    <div>
        <h1 class="heading">Pokedex</h1>
        {allPokemon.map(pokemon => (
            <Link to={`/pokemon/${pokemon.name}`}>
                <div key={pokemon.id} class="card">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} class="card_image"/>
                    <h4 class="card_heading"><strong>{pokemon.name}</strong></h4>
                </div>
            </Link>
        ))}
    </div>
  )
}
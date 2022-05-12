import React from "react";
import "./pokemon.css";

export default function Pokemon({ pageContext: { pokemon } }) {
    const max_width = 25;
    const hp_width = pokemon.stats[0].base_stat / 10;

    const stat_name = (stat) => {
        const words = stat.stat.name.replace("-", " ").split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
        }
        return words.join(" ");
    };

    return (
        <div>
            <h1 class="heading">{pokemon.name}</h1>
            <div class="pokemon_container">
                <div class="pokemon_flex">
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        class="poke_image"
                    />
                    <div class="poke_stats_outer">
                        <h2 class="heading">Stats</h2>
                        <div class="poke_stats">
                            <div class="stat_name_container">
                                {pokemon.stats.map((stat) => (
                                    <span class="stat_name">{stat_name(stat)}</span>
                                ))}
                            </div>
                            <div class="stat_value_container">
                                {pokemon.stats.map((stat) => (
                                    <span class="stat_name">{stat.base_stat}</span>
                                ))}
                            </div>
                            <div class="stat_meter_container">
                                {pokemon.stats.map((stat) => (
                                    <meter min={0} max={255} low={80} optimum={100} high={120} value={stat.base_stat} class="stat_meter" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

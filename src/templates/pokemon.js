import React from "react";
import Pie from "../components/pie";
import "./pokemon.css";

export default function Pokemon({ pageContext: { pokemon } }) {
    let stat_total = 0;
    pokemon.stats.forEach((stat) => {
        stat_total += stat.base_stat;
    });

    const hpSlice = pokemon.stats[0].base_stat / stat_total;
    const attackSlice = pokemon.stats[1].base_stat / stat_total;
    const defenseSlice = pokemon.stats[2].base_stat / stat_total;
    const spAttackSlice = pokemon.stats[3].base_stat / stat_total;
    const spDefenseSlice = pokemon.stats[4].base_stat / stat_total;
    const speedSlice = pokemon.stats[5].base_stat / stat_total;

    const pieData = [
        { label: "HP", value: hpSlice },
        { label: "Attack", value: attackSlice },
        { label: "Defense", value: defenseSlice },
        { label: "Special Attack", value: spAttackSlice },
        { label: "Special Defense", value: spDefenseSlice },
        { label: "Speed", value: speedSlice },
    ];

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
                                    <span class="stat_name">
                                        {stat_name(stat)}
                                    </span>
                                ))}
                            </div>
                            <div class="stat_value_container">
                                {pokemon.stats.map((stat) => (
                                    <span class="stat_name">
                                        {stat.base_stat}
                                    </span>
                                ))}
                            </div>
                            <div class="stat_meter_container">
                                {pokemon.stats.map((stat) => (
                                    <meter
                                        min={0}
                                        max={255}
                                        low={80}
                                        optimum={100}
                                        high={120}
                                        value={stat.base_stat}
                                        class="stat_meter"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pieChartContainer">
                <Pie
                    class="pieChart"
                    data={pieData}
                    width={400}
                    height={400}
                    innerRadius={100}
                    outerRadius={200}
                    cornerRadius={0}
                />
            </div>
        </div>
    );
}

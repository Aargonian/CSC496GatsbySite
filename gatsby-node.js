const axios = require("axios")
const axiosRetry = require('axios-retry')

axiosRetry(axios, { retries: 5 })

const get = endpoint => axios.get(`https://pokeapi.co/api/v2${endpoint}`)

const getPokemonNames = async (limit) =>
{
  data = await get(`/pokemon?limit=${limit}`)
  names = []
  data.data.results.forEach((entry) => {
    names.push(entry.name)
  })
  return names
}

const getPokemonData = names =>
  Promise.all(
    names.map(async name => {
      const { data: pokemon } = await get(`/pokemon/${name}`)
      return { ...pokemon }
    })
  )

exports.createPages = async ({ actions: { createPage } }) => {
  const allPokemon = []
  /* For some reason, fetching more than 100 pokemon at once has an inconsistent chance
     to cause disconnection issues or makes the process take impossibly long*/
  for(i = 100; i <= 900; i+= 100)
  {
    if (i = 900) {
      i = 898
    }
    const names = await getPokemonNames(i)
    tempPokemon = await getPokemonData(names)
    tempPokemon.forEach((pokemon) => {
      allPokemon.push(pokemon)
    })
  }

  // Create the main pokemon page
  createPage({
    path: `/pokemon`,
    component: require.resolve("./src/templates/all-pokemon.js"),
    context: { allPokemon },
  })

  // Create the individual pages
  for (let i = 0; i < allPokemon.length; i++)
  {
    pokemon = allPokemon[i]
    previousPokemon = i-1 < 0 ? null : allPokemon[i-1]
    nextPokemon = i+1 == allPokemon.length ? null : allPokemon[i+1]
    pokemon.previous = previousPokemon == null ? null : previousPokemon.name
    pokemon.next = nextPokemon == null ? null : nextPokemon.name
    createPage(
      {
        path: `/pokemon/${pokemon.name}`,
        component: require.resolve("./src/templates/pokemon.js"),
        context: { pokemon },
      }
    )
  }
}

const axios = require("axios")

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

  createPage({
    path: `/pokemon`,
    component: require.resolve("./src/templates/all-pokemon.js"),
    context: { allPokemon },
  })
}
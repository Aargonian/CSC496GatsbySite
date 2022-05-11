import Layout from '../components/layout'
import { graphql } from 'gatsby'
import * as React from 'react'

const PokemonPage = ({data}) => {
    return (
        <Layout pageTitle="Super Cool Blog Posts">
            <p>This is a page about {data.pokemon.name}</p>
        </Layout>
    )
}

export const query = graphql`
    query ($name: String) {
        pokemon(name: {eq: $name}) {
            id
            name
            type
        }
    }
`

export default PokemonPage

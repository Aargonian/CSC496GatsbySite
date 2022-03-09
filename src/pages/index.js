import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
    return (
        <Layout pageTitle="Home Page">
            <p>I'm making this by following the Gatsby Tutorial.</p>
            <StaticImage
                alt="A stupid meme about picking your nose to gain insight"
                src="../images/stupid_meme.png"
            />
        </Layout>
    )
}

export default IndexPage

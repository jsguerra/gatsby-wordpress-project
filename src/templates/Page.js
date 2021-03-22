import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wpPage.title}
    />
    <h1>{ data.wpPage.title }</h1>
    <div
      style={{marginTop: 40}}
      dangerouslySetInnerHTML={{ __html: data.wpPage.content }}
    />
  </Layout>
)

export default PageTemplate

export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
    }
  }
`
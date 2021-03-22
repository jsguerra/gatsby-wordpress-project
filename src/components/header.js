import { Link, graphql, StaticQuery } from "gatsby"
import React from "react"

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        wp {
          generalSettings {
            title
          }
        }
        allWpMenu(filter: {name: {eq: "main"}}) {
          edges {
            node {
              name
              menuItems {
                nodes {
                  url
                  label
                }
              }
            }
          }
        }
      }
    `}

    render={data => (
      <header
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {data.wp.generalSettings.title}
            </Link>
          </h1>
          <ul style={{ listStyle: `none`, display: `flex`, margin: 0 }}>
            {data.allWpMenu.edges[0].node.menuItems.nodes.map(item => (
              <li key={item.url} style={{ margin: `0 10px` }}>
                <Link
                  to={`${item.url}`}
                  style={{
                    color: `white`,
                    textDecoration: `none`,
                    fontFamily: `sans-serif`,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    )}
  />
)

export default Header

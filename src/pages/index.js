import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES, MARKS, BLOCKS } from "@contentful/rich-text-types"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}

const HomeTemplate = ({ data: { lessons } }) => (
  <>
    <h1>Recent Lessons</h1>
    {lessons.nodes.map(lesson => (
      <div key={lesson.id}>
        <h2>
          <Link to={`/${lesson.slug}`}>
            {lesson.title} with {lesson.author.name}
          </Link>
        </h2>
        {lesson.body && renderRichText(lesson.body, options)}
      </div>
    ))}
  </>
)

export default HomeTemplate
export const query = graphql`
  {
    lessons: allContentfulLesson {
      nodes {
        id
        slug
        title
        author {
          name
        }
        body {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              fixed(width: 1600) {
                width
                height
                src
                srcSet
              }
            }
          }
        }
      }
    }
  }
`

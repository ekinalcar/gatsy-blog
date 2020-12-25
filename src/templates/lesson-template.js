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
      console.log(node)
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
    [INLINES.ENTRY_HYPERLINK]: ({
      data: {
        target: { slug, title },
      },
    }) => <Link to={slug}>{title}</Link>,
  },
}

const LessonTemplate = ({ data: { lesson } }) => (
  <div>
    <h1>{lesson.title}</h1>

    <p>
      Quest: {lesson.author.name} -
      <a target="_blank" rel="noreferrer" href={lesson.author.twitter}>
        Twitter
      </a>
    </p>
    {lesson.body && renderRichText(lesson.body, options)}
  </div>
)

export default LessonTemplate
export const query = graphql`
  query($slug: String!) {
    lesson: contentfulLesson(slug: { eq: $slug }) {
      title
      video
      body {
        raw
        references {
          ... on Node {
            ... on ContentfulAsset {
              contentful_id
              fixed(width: 1600) {
                width
                height
                src
                srcSet
              }
            }
            ... on ContentfulLesson {
              contentful_id
              title
              slug
            }
          }
        }
      }
      author {
        name
        twitter
      }
      seo {
        title
        description {
          description
        }
      }
    }
  }
`

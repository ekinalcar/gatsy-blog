import React from "react"
import { graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES } from "@contentful/rich-text-types"

const options = {
  renderNode: {
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
    <img src={lesson.body.references[0].file.url} />
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
          contentful_id
          file {
            fileName
            url
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

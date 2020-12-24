import React from "react"
import { graphql, Link } from "gatsby"

export const query = graphql`
  {
    lessons: allContentfulLesson {
      nodes {
        id
        title
        slug
        author {
          name
        }
      }
    }
  }
`

export default ({ data }) => {
  return (
    <>
      <h1>Recent Lessons</h1>
      {data.lessons.nodes.map(lesson => (
        <div key={lesson.id}>
          <h2>
            <Link to={`/${lesson.slug}`}>
              {lesson.title} with {lesson.author.name}
            </Link>
          </h2>
        </div>
      ))}
    </>
  )
}

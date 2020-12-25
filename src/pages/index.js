import React from "react"
import { graphql, Link } from "gatsby"

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
      }
    }
  }
`

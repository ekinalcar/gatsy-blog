exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allContentfulLesson(limit: 1000) {
          nodes {
            slug
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panic("Error Loading Lessons", JSON.stringify(result.errors))
  }

  result.data.allContentfulLesson.nodes.forEach(lesson => {
    createPage({
      path: `/${lesson.slug}`,
      component: require.resolve("./src/templates/lesson-template.js"),
      context: {
        slug: lesson.slug,
      },
    })
  })
}

require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        forceFullSync: true,
        spaceId: `olljxk6hu2kb`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}

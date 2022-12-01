---
title: Hypertext Jockey now running on WP, React, and GraphQL
description: After a couple of false starts, I finally got around to spinning up a React-based front to my WordPress-based website. Read along for a bit of discussion on the technology choices that I made, and other bits & pieces about the development.
isPublished: true
publishDate: 2021/02/12
tags:
  - react
  - wordpress
  - graphql
  - development
category:
  - technology
featuredImage: {
  url: /images/static/hypertext-jockey-now-running-on-wp-react-and-graphql/new-theme-thumb.png,
  alt: 'An image representing React, GraphQL, and WordPress'
}
---
After a couple of false starts, I finally got around to spinning up a React-based front to [my WordPress-based website](http://robmaurizi.com). Read along for a bit of discussion on the technology choices that I made, and other bits & pieces about the development.

To start, I’d tried to learn [React](https://react.org) for a few years now, but it wasn’t until the last year or so that it really finally clicked. I first re-built [MedBase (my defunct iOS app) using React on top of Firebase](https://medbase-2c01c.web.app/), and am working on a React Native version of the same app so there could be both distinct web and mobile versions that both reference the same cloud-based source of truth. That’s a good amount of practice at writing React components, and things were really beginning to gel.

As I was working on an early iteration of this website, I was dismayed by the amount of HTTP requests that would have been required to fetch even basic information about a blog post using the WP Rest API. Annoyed, I put things off for a bit and went on my merry way. Then I happened upon [GraphQL](https://graphql.org) for another project and realized that could help reduce all of those extra HTTP requests. A quick search for WordPress + GraphQL returned the [WPGraphQL plugin](https://wpgraphql.com), a solid plugin that generates a GraphQL endpoint based on your WordPress database schema. Add to that the [WPGraphQL ACF extension](https://www.wpgraphql.com/acf/) that exposes [Advanced Custom Fields](https://www.advancedcustomfields.com/) data, and you’ve got a pretty solid way to access WordPress content without the need for a standard PHP-based theme!

With WPGraphQL hooked up in the backend, fetching things like the title, featured image, excerpt, category names, tag names, and author name for a given post became trivial affairs. Playing with miscellaneous queries in [Postman](https://postman.com) was super fun to see the kinds of joins one could perform with ease.

Now to wire it up with React, I opted to use the [Apollo GrahpQL React library](https://www.apollographql.com/apollo-client). This is a fantastic library that can also double as your state management library (in place of something like Redux). The library contains a Provider component that can wrap your entire app to easily facilitate GraphQL queries from anyplace within the app, as well as robust state & cache management.

With all of the pieces in place, it was fairly simple to start putting together pages that query the information required for a given layout, and then components to display the results. So on the homepage, I can fetch page content along with a single posts URL, title, photo & excerpt, but on the blog, I can pull back paginated results of posts given various criteria (all posts, category & tag archives, date queries, search results, etc) each with a single GraphQL query.

This workflow is super fun, and for the first time in a long time, I’m really enjoying tinkering with my site. As I work through refinements and other tweaks, I’m planning to post more about some of the details in here.
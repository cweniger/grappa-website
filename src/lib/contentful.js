import request, { gql } from "graphql-request";

const spaceId = process.env.CONTENTFUL_SPACE;
const environmentId = process.env.CONTENTFUL_ENV;
const deliveryToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;

// async function fetchGraphQL(query, preview = false) {
//   return fetch(
//     `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${
//           preview
//             ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
//             : process.env.CONTENTFUL_ACCESS_TOKEN
//         }`,
//       },
//       body: JSON.stringify({ query }),
//     }
//   ).then((response) => response.json());
// }

export function contentfulApi(query, variables = {}) {
  const accessToken = variables.preview ? previewToken : deliveryToken;
  const url = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}?access_token=${accessToken}`;
  return request(url, query, variables);
}

export async function getAllResearchSlugs() {
  const researchData = await contentfulApi(
    gql`
      query researchCollectionQuery {
        researchCollection(limit: 40) {
          items {
            slug
          }
        }
      }
    `
  );
  return researchData;
}

export async function getAllMembersSlugs() {
  const personData = await contentfulApi(
    gql`
      query personQuery {
        personCollection(limit: 200) {
          items {
            slug
          }
        }
      }
    `
  );
  return personData;
}
export async function getAllNewsSlugs() {
  const newsData = await contentfulApi(
    gql`
      query newsCollectionQuery {
        newsCollection(limit: 200) {
          items {
            slug
          }
        }
      }
    `
  );
  return newsData;
}

export async function fetchNews() {
  const query = gql`
    query newsCollectionQuery {
      newsCollection(order: date_DESC) {
        items {
          sys {
            id
          }
          headline
          bodyCopy
          hideFromList
          slug
          summary
          date
          image {
            title
            description
            url
          }
        }
      }
    }
  `;

  const data = await contentfulApi(query);

  return data;
}

export async function fetchArticle({ params }) {
  const query = gql`
    query newsCollectionQuery($slug: String!) {
      newsCollection(limit: 1, where: { slug: $slug }) {
        items {
          date
          headline
          bodyCopy
          slug
          summary
          date
          image {
            title
            description
            url
          }
          caption
        }
      }
    }
  `;

  const data = await contentfulApi(query, {
    slug: params.slug,
  });

  const finalData = data.newsCollection.items[0];

  return finalData;
}

export async function getArticleData({ params }) {
  const peopleData = await contentfulApi(
    gql`
      query newsCollectionQuery($slug: String!) {
        newsCollection(limit: 1, where: { slug: $slug }) {
          items {
            headline
            bodyCopy
            slug
            summary
            date
            image {
              title
              description
              url
            }
          }
        }
      }
    `,
    {
      slug: params.slug,
      preview,
    }
  );
}

export async function fetchNewsEntry() {
  const newsQuery = gql`
    query newsPageEntryQuery {
      newsPage(id: "3KdcDIWELV45lOUp4IYusR") {
        sys {
          id
        }
        title
        featuredArticle {
          sys {
            id
          }
          headline
          date
          slug
          summary
          image {
            title
            description
            url
          }
        }
        highlights: highlightArticlesCollection(limit: 3) {
          items {
            sys {
              id
            }
            headline
            date
            slug
            summary
            image {
              title
              description
              url
            }
          }
        }
      }
    }
  `;

  const newsData = await contentfulApi(newsQuery);

  return newsData;
}

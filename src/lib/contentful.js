import request, { gql } from "graphql-request";

const spaceId = process.env.CONTENTFUL_SPACE;
const environmentId = process.env.CONTENTFUL_ENV;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

export function contentfulApi(query, variables = {}) {
  // const accessToken = variables.preview ? previewToken : deliveryToken;
  const url = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}?access_token=${accessToken}`;
  return request(url, query, variables);
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
  return personData?.personCollection?.items;
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
  return newsData?.newsCollection?.items;
}

export async function fetchNews() {
  const query = gql`
    query newsCollectionQuery {
      newsCollection(order: date_DESC) {
        items {
          headline
          bodyCopy
          slug
          summary
          date
          image {
            url
          }
        }
      }
    }
  `;

  const data = await contentfulApi(query);

  return data?.newsCollection?.items ?? [];
}

export async function fetchArticle() {
  const query = gql`
    query newsCollectionQuery($slug: String!) {
      newsCollection(limit: 1, where: { slug: $slug }) {
        items {
          headline
          bodyCopy
          slug
          summary
          date
          image {
            url
          }
        }
      }
    }
  `;

  const data = await contentfulApi(query, {
    slug: params.slug,
  });

  return data?.newsCollection?.items ?? [];
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

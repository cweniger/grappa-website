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

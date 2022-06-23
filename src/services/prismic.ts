import * as prismic from '@prismicio/client';
import sm from '../../sm.json';

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

export function getPrismicClient() {
  const client = prismic.createClient(
    repositoryName,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  return client;
}
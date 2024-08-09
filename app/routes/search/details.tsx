import DetailedCard from '../../src/components/detailed-card/detailed-card';
import { LoaderFunctionArgs } from '@remix-run/node';
import { REPO_URL } from '../../src/consts';
import { Result } from '../../src/interfaces';
import { useLoaderData } from '@remix-run/react';
import React from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const name = params.get('name');
  const owner = params.get('owner');
  if (owner && name) {
    const response = await fetch(`${REPO_URL}/${owner}/${name}`, {});
    const data: Result = await response.json();
    return data;
  }
  return null;
}

export default function Details(): React.ReactNode {
  return <DetailedCard item={useLoaderData<typeof loader>()} />;
}

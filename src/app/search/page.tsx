import React from 'react';

import SearchPage from './search-page.tsx';
import { ApiResponse } from '../../interfaces.ts';
import { BASE_URL, PER_PAGE } from '../../consts.tsx';

export async function getRepositories(
  q: string | string[] | undefined,
  page: string | string[],
) {
  if (!q) {
    return { total_count: 0, items: [] };
  }
  const response = await fetch(
    `${BASE_URL}?q=${q}&page=${page}&per_page=${PER_PAGE}`,
  );
  const res: ApiResponse = await response.json();
  return res;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = searchParams.q;
  const page = searchParams.page || '1';
  const res = await getRepositories(q, page);

  return <SearchPage res={res} />;
}

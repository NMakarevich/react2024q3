import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PER_PAGE } from '../../consts.tsx';
import { Response, Result } from '../../App.tsx';

export interface CardsQuery {
  searchTerm: string;
  page: number;
}

export interface CardQuery {
  owner: string;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  tagTypes: ['Cards'],
  endpoints: (builder) => ({
    getCards: builder.query<Response, CardsQuery>({
      query: ({ searchTerm, page }) => {
        if (!searchTerm)
          return `search/repositories?q=a&order=asc&page=${page}&per_page=${PER_PAGE}`;
        return `search/repositories?q=${searchTerm}&page=${page}&per_page=${PER_PAGE}`;
      },
      providesTags: ['Cards'],
    }),
    getCard: builder.query<Result, CardQuery>({
      query: ({ owner, name }) => {
        return `repos/${owner}/${name}`;
      },
    }),
  }),
});

export const { useGetCardsQuery, useGetCardQuery } = apiSlice;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store.ts';
import DetailedCard from '../../../components/detailed-card/detailed-card.tsx';
import { REPO_URL } from '../../../consts.tsx';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  addDetailedCard,
  selectResponse,
} from '../../../redux/slices/cards.slice.ts';
import ResultsList from '../../../components/results-list/results-list.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Result } from '../../../interfaces.ts';

export const getServerSideProps = (async (context) => {
  const { owner, name } = context.query;
  const res = await fetch(`${REPO_URL}/${owner}/${name}`);
  const data: Result = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: Result }>;

export default function DetailsPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactNode {
  const dispatch = useDispatch<AppDispatch>();
  const response = useSelector(selectResponse);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (response.items.length === 0 && pathname.includes('details')) {
      const params = new URLSearchParams(searchParams);
      params.delete('owner');
      params.delete('name');
      router.push(`/search?${params.toString()}`);
    }
  }, [response]);

  useEffect(() => {
    if (data) dispatch(addDetailedCard(data));
  }, [data]);

  return (
    <>
      <ResultsList />
      <DetailedCard />
    </>
  );
}

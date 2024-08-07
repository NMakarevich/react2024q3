'use client';

import React, { useEffect } from 'react';
import DetailedCard from '../../../components/detailed-card/detailed-card.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ApiResponse, Result } from '../../../interfaces.ts';
import SearchPage from '../search-page.tsx';

export default function DetailsPage({
  data,
  res,
}: {
  data: Result | undefined;
  res: ApiResponse;
}): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (res.items.length === 0 && pathname.includes('details')) {
      const params = new URLSearchParams(searchParams);
      params.delete('owner');
      params.delete('name');
      router.push(`/search?${params.toString()}`);
    }
  }, [res]);

  return (
    <SearchPage res={res}>
      <DetailedCard item={data} />
    </SearchPage>
  );
}

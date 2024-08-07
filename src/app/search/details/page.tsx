import DetailsPage from './details-page.tsx';
import { REPO_URL } from '../../../consts.tsx';
import { Result } from '../../../interfaces.ts';
import { getRepositories } from '../page.tsx';

async function getDetailedCard(
  owner: string | string[] | undefined,
  name: string | string[] | undefined,
) {
  if (owner && name) {
    const response = await fetch(`${REPO_URL}/${owner}/${name}`, {});
    const data: Result = await response.json();
    return data;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const owner = searchParams.owner;
  const name = searchParams.name;
  const q = searchParams.q;
  const page = searchParams.page || '1';

  const card = await getDetailedCard(owner, name);
  const cards = await getRepositories(q, page);

  return <DetailsPage data={card} res={cards}></DetailsPage>;
}

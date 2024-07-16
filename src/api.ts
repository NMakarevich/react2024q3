import { Result, Response } from './App.tsx';
import { BASE_URL, PER_PAGE, REPO_URL, SECOND_URL } from './consts.tsx';

export async function getCards(
  searchTerm: string,
  page: number,
): Promise<Response> {
  const url = searchTerm
    ? `${BASE_URL}?q=${encodeURIComponent(searchTerm)}`
    : `${SECOND_URL}`;
  return await fetch(`${url}&per_page=${PER_PAGE}&page=${page}`)
    .then((res) => res.json())
    .then((data: Response) => data);
}

export async function getDetailedCard(
  owner: string,
  name: string,
): Promise<Result> {
  return await fetch(`${REPO_URL}/${owner}/${name}`)
    .then((res) => res.json())
    .then((data: Result) => data);
}

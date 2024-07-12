import { Response } from '../../App.tsx';
import { ResultsItem } from '../results-item/results-item.tsx';
import './results-list.scss';
import Pagination from '../pagination/pagination.tsx';

interface Props {
  response: Response;
  loading: boolean;
}

export default function ResultsList(props: Props) {
  const { response, loading } = props;

  return (
    <>
      <div className={loading ? 'loading' : 'hidden'}>Loading...</div>
      <div className={loading ? 'hidden' : 'container'}>
        {response?.items?.length ? (
          <Pagination totalCount={response.total_count} />
        ) : (
          ''
        )}
        <div className={'results-container'}>
          {response.items.map((item) => (
            <ResultsItem result={item} key={item.id}></ResultsItem>
          ))}
        </div>
      </div>
    </>
  );
}

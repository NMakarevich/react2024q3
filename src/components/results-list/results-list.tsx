import { Results } from '../../App.tsx';
import { ResultsItem } from '../results-item/results-item.tsx';
import './results-list.scss';

interface Props {
  results: Results[];
  loading: boolean;
}

export default function ResultsList(props: Props) {
  const { results, loading } = props;

  return (
    <>
      <div className={loading ? 'loading' : 'hidden'}>Loading...</div>
      <div className={'container'}>
        {results.map((item) => (
          <ResultsItem key={item.id} result={item}></ResultsItem>
        ))}
      </div>
    </>
  );
}

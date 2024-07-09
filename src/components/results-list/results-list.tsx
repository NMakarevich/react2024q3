import { Response } from '../../App.tsx';
import { ResultsItem } from '../results-item/results-item.tsx';
import './results-list.scss';

interface Props {
  response: Response;
  loading: boolean;
}

export default function ResultsList(props: Props) {
  const { response, loading } = props;

  return (
    <>
      <div className={loading ? 'loading' : 'hidden'}>Loading...</div>
      <div className={'container'}>
        {response.items.map((item) => (
          <ResultsItem key={item.id} result={item}></ResultsItem>
        ))}
      </div>
    </>
  );
}

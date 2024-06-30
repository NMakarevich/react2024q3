import { Component } from 'react';
import { Results } from '../../App.tsx';
import { ResultsItem } from '../results-item/results-item.tsx';
import './results-list.scss';

interface State {
  results: Results[];
}

interface Props {
  results: Results[];
  loading: boolean;
}

export default class ResultsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={this.props.loading ? 'loading' : 'hidden'}>
          Loading...
        </div>
        <div className={'container'}>
          {this.props.results.map((item) => (
            <ResultsItem key={item.id} result={item}></ResultsItem>
          ))}
        </div>
      </>
    );
  }
}

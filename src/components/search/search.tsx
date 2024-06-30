import { ChangeEvent, Component } from 'react';
import { Results } from '../../App.tsx';
import { BASE_URL } from '../../consts.tsx';
import './search.scss';

interface State {
  searchTerm: string;
}

interface Props {
  setLoading: () => void;
  sendResults: (results: Results[]) => void;
}

const SEARCH_TERM = 'search-term';

export default class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem(SEARCH_TERM) || '',
    };
  }

  render() {
    return (
      <>
        <div className="search">
          <input
            className={'search-input'}
            type="text"
            name="search"
            defaultValue={this.state.searchTerm}
            onChange={this.handleInput}
          />
          <button
            className={'search-button'}
            type="button"
            onClick={this.search}
          >
            Search
          </button>
        </div>
      </>
    );
  }

  handleInput = (e: ChangeEvent) => {
    let inputValue = '';
    if (e.target instanceof HTMLInputElement) inputValue = e.target.value;
    this.setState({ searchTerm: inputValue });
  };

  search = () => {
    const { searchTerm } = this.state;
    localStorage.setItem(SEARCH_TERM, searchTerm);
    this.props.setLoading();
    fetch(`${BASE_URL}?q=${searchTerm}&per_page=24&page=1`)
      .then((res) => res.json())
      .then((res) => res.items)
      .then((items: Results[]) => {
        this.props.setLoading();
        this.props.sendResults(items);
      });
  };
}

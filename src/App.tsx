import { Component } from 'react';
import './App.scss';
import Search from './components/search/search.tsx';
import ResultsList from './components/results-list/results-list.tsx';

export interface Results {
  created_at: string;
  description: string;
  full_name: string;
  html_url: string;
  id: number;
  language: string;
  name: string;
  stargazers_count: number;
  owner: {
    avatar_url: string;
    id: number;
    login: string;
    url: string;
  };
}

interface State {
  results: Results[];
  loading: boolean;
  errorClicked: boolean;
}

export default class App extends Component {
  state: State = {
    results: [],
    loading: false,
    errorClicked: false,
  };

  handleClick = () => {
    this.setState({ errorClicked: true });
  };

  render() {
    if (this.state.errorClicked) {
      throw new Error('Error button is clicked');
    }
    return (
      <>
        <header className={'app-header'}>
          <h1>Search repository on GitHub</h1>
          <Search
            setLoading={this.setLoading}
            sendResults={this.setResults}
          ></Search>
          <button type={'button'} onClick={this.handleClick}>
            Throw error
          </button>
        </header>
        <main className={'app-main'}>
          <ResultsList
            results={this.state.results}
            loading={this.state.loading}
          ></ResultsList>
        </main>
      </>
    );
  }

  setLoading = (isLoading: boolean) => {
    this.setState({
      loading: isLoading,
    });
  };

  setResults = (results: Results[]) => {
    this.setState({
      results: [...results],
    });
  };

  throwError = () => {
    throw new Error('Error');
  };
}

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
}

export default class App extends Component {
  state: State = {
    results: [],
    loading: false,
  };

  render() {
    return (
      <>
        <header className={'app-header'}>
          <h1>Search repository on GitHub</h1>
          <Search
            setLoading={this.setLoading}
            sendResults={this.setResults}
          ></Search>
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

  setLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  setResults = (results: Results[]) => {
    this.setState({
      results: [...results],
    });
  };
}

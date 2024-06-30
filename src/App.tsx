import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Component } from 'react';
import './App.scss';
import Search from './components/search/search.tsx';

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

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
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

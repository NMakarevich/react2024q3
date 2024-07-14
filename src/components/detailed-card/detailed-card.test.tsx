import React from 'react';
import DetailedCard from './detailed-card';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { responseDetailedCard } from '../../mock/mock.ts';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';

const server = setupServer(
  http.get('https://api.github.com/repos/facebook/react', () => {
    return HttpResponse.json(responseDetailedCard);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const snapshot = ` <div
      class="card"
    >
      <button
        class="card-close"
      >
        X
      </button>
      <div
        class="card-header"
      >
        <img
          alt="facebook"
          class="card-logo"
          src="https://avatars.githubusercontent.com/u/69631?v=4"
        />
        <div
          class="card-info"
        >
          <div
            class="card-info_title"
          >
            <h2
              class="card-title"
            >
              react
            </h2>
            <div
              class="card-author"
            >
              <span
                class="card-autor_text"
              >
                Author: 
              </span>
              <h3
                class="card-autor_login"
              >
                facebook
              </h3>
            </div>
          </div>
          <div
            class="card-stars"
          >
            Stars: 
            225k
          </div>
        </div>
      </div>
      <div
        class="card-body"
      >
        <p
          class="card-description"
        >
          The library for web and native user interfaces.
        </p>
        <span
          class="card-language"
        >
          Language: 
          JavaScript
        </span>
        <div
          class="card-topics"
        >
          <div
            class="card-topic"
          >
            declarative
          </div>
          <div
            class="card-topic"
          >
            frontend
          </div>
          <div
            class="card-topic"
          >
            javascript
          </div>
          <div
            class="card-topic"
          >
            library
          </div>
          <div
            class="card-topic"
          >
            react
          </div>
          <div
            class="card-topic"
          >
            ui
          </div>
        </div>
      </div>
    </div>
`;

describe('DetailedCard', () => {
  it('Should be showing loader', () => {
    const { pathname } = window.location;
    const url = `${pathname}?owner=facebook&name=react`;
    window.history.pushState({}, '', url);
    render(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>,
    );
    const loading = screen.getByText('Loading...');
    expect(loading.textContent).toBe('Loading...');
  });
  it('Should render correctly', async () => {
    const { pathname } = window.location;
    const url = `${pathname}?owner=facebook&name=react`;
    window.history.pushState({}, '', url);
    render(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>,
    );

    const button = await screen.findByRole('button');
    const card = button.closest('.card');
    expect(card).toMatchSnapshot(snapshot);
  });
});

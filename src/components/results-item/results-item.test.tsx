import React from 'react';
import { ResultsItem } from './results-item';
import { response } from '../../mock/mock.ts';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';
import { transformStars } from '../../utils.ts';

describe('ResultsItem', () => {
  it('Results item should render correctly', () => {
    const item = response.items[0];
    render(
      <BrowserRouter>
        <ResultsItem result={item} />
      </BrowserRouter>,
    );
    const avatar_url = item.owner.avatar_url;
    const login = item.owner.login;
    const html_url = item.html_url;
    const name = item.name;
    const url = item.owner.url;
    const stars = item.stargazers_count;

    const screenAvatarUrl = screen.getByAltText(login);
    const screenName = screen.getByText(name);
    const screenNameURL = screenName.closest('a')?.href;
    const screenLogin = screen.getByText(login);
    const screenStars = screen.getByText(/Stars/);

    expect(screenAvatarUrl.getAttribute('src')).toBe(avatar_url);
    expect(screenName).toBeTruthy();
    expect(screenNameURL).toBe(html_url);
    expect(screenLogin.getAttribute('href')).toBe(url);
    expect(screenStars.textContent?.split('Stars: ')[1]).toBe(
      transformStars(stars),
    );
  });
});

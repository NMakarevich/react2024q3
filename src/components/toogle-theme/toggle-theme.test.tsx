import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.ts';
import ThemeProvider from '../../providers/theme-provider.tsx';
import { ToggleTheme } from './toggle-theme.tsx';

describe('ToggleTheme', () => {
  it('Should change theme to dark by click on toggle', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Provider store={store}>
            <ToggleTheme />
          </Provider>
        </MemoryRouter>
      </ThemeProvider>,
    );
    const toggle = screen.getByText('Dark');
    fireEvent.click(toggle);
    expect(toggle.className).toBe('toggle-theme_label theme-dark');
  });
  it('Should change theme to light by click on toggle', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Provider store={store}>
            <ToggleTheme />
          </Provider>
        </MemoryRouter>
      </ThemeProvider>,
    );
    const toggle = screen.getByText('Light');
    fireEvent.click(toggle);
    expect(toggle.className).toBe('toggle-theme_label theme-light');
  });
});

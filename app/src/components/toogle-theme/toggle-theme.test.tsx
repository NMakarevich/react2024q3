import { fireEvent, render, screen } from '@testing-library/react';
import App, { ThemeContext } from '../../App.tsx';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.ts';

describe('ToggleTheme', () => {
  it('Should change theme to dark by click on toggle', () => {
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: 'light', setTheme }}>
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </ThemeContext.Provider>,
    );
    const toggle = screen.getByText('Dark');
    fireEvent.click(toggle);
    expect(toggle.className).toBe('toggle-theme_label theme-dark');
  });
  it('Should change theme to light by click on toggle', () => {
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme }}>
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </ThemeContext.Provider>,
    );
    const toggle = screen.getByText('Light');
    fireEvent.click(toggle);
    expect(toggle.className).toBe('toggle-theme_label theme-light');
  });
});

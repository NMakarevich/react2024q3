import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '../../providers/theme.provider';
import { ToggleTheme } from './toggle-theme';

describe('ToggleTheme', () => {
  it('Should change theme to dark by click on toggle', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <ToggleTheme />
        </BrowserRouter>
      </ThemeProvider>,
    );
    const toggle = screen.getByText('Dark');
    fireEvent.click(toggle);
    expect(toggle.className).toBe('toggle-theme_label theme-dark');
  });
  it('Should change theme to light by click on toggle', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <ToggleTheme />
        </BrowserRouter>
      </ThemeProvider>,
    );
    const toggle = screen.getByText('Light');
    fireEvent.click(toggle);
    expect(toggle.className).toBe('toggle-theme_label theme-light');
  });
});

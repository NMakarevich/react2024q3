import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Loader', () => {
  it('show loader if isLoading is true', () => {
    render(<Loader isLoading={true} />);
    const loading = screen.getByText('Loading...');
    expect(loading.textContent).toMatch(/Loading.../);
  });
  it('hide loader if isLoading is false', () => {
    render(<Loader isLoading={false} />);
    const loading = screen.queryByText('Loading...');
    expect(loading).toBeFalsy();
  });
});

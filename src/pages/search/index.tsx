import { store } from '../../redux/store.ts';
import { Provider } from 'react-redux';
import App from '../../App.tsx';
import { ReactNode } from 'react';

export default function SearchPage({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  );
}

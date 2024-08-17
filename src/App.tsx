import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

export default function App() {
  return (
    <>
      <header className="header">
        <nav className="nav header-nav">
          <NavLink className="nav-link" to={'/'}>
            Home
          </NavLink>
          <NavLink className="nav-link" to={'/uncontrolled'}>
            Uncontrolled form
          </NavLink>
          <NavLink className="nav-link" to={'/controlled'}>
            Controlled form
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <div className="container">
          <Provider store={store}>
            <Outlet />
          </Provider>
        </div>
      </main>
    </>
  );
}

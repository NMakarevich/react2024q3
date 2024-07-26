import { Link } from 'react-router-dom';
import './not-found.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Page not found</h2>
      <Link to={'/'}>Back to main page</Link>
    </div>
  );
}

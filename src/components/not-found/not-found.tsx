import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Page not found</h2>
      <Link href={'/'}>Back to main page</Link>
    </div>
  );
}

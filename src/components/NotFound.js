import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="pt-4 pb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">404 - Page Not Found</h1>
      <p className="mb-4"> The page you are looking for doesn't exist.</p>
      <Link
        to="/"
        className="text-white max-w-fit bg-blue-700 hover:bg-blue-800 disabled:opacity-30 disabled:pointer-events-none
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        data-testid="submit-btn"
      >
        Go home
      </Link>
    </div>
  );
}
export default NotFound;

import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FaExclamationTriangle className="mb-4 text-6xl text-red-500" />
      <h1 className="mb-2 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-4 text-lg">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="text-blue-500 hover:underline">Go back to the homepage</a>
    </div>
  );
}

export default NotFoundPage;

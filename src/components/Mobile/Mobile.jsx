

const Mobile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 dark:text-white duration-200">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 text-center">
        It might have been moved, deleted, or the URL might be incorrect.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Mobile;

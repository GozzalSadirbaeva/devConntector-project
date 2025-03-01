function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;

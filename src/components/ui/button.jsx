export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Button({ children, ...props }) {
  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}

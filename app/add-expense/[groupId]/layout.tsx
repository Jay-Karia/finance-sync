export default function AddExpenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl flex items-center justify-center sm:mx-auto mx-4 my-4 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow">
      {children}
    </div>
  );
}

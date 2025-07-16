export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl border flex items-center justify-center mx-auto my-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {children}
    </div>
  );
}

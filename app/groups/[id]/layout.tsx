export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-7xl px-4 pb-12 flex justify-center items-center flex-col border">
      {children}
    </div>
  );
}

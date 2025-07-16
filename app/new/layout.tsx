import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance Sync | New Group",
};

export default function NewGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center mx-4">{children}</div>
  );
}

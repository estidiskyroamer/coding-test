import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      {/* <Navbar /> */}
      <main className="container mx-auto w-7xl px-6">{children}</main>
    </div>
  );
}

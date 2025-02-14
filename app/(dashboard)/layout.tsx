export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={``}>
    <h1 className={`text-3xl`}>Dashboard Layout</h1>
    {children}</div>;
}

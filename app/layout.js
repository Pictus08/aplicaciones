export const metadata = {
  title: "Aplicaciones & Utilidades",
  description: "Aplicaciones y utilidades varias",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

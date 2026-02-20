export const metadata = {
  title: "TradeX Academy",
  description: "Plataforma profesional para traders"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#0a0f1c", color: "white" }}>
        {children}
      </body>
    </html>
  );
}

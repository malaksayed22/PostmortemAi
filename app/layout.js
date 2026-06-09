import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "PostMortem AI — Incident Analysis Studio",
  description:
    "AI-powered DevOps incident postmortem generator. Turn raw incident data into structured, professional postmortem reports.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%236366f1'/><path d='M8 10h16M8 16h10M8 22h12' stroke='white' stroke-width='2.5' stroke-linecap='round'/></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#0f172a] antialiased">{children}</body>
    </html>
  );
}

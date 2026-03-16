import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "../index.css";

const manrope = localFont({
  src: [
    {
      path: "../assets/fonts/Manrope-Variable.woff2",
      style: "normal",
      weight: "200 800",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmartCard | Carte de reductions",
  description:
    "Une carte de reductions (QR + sans contact) pour economiser chez des commerces partenaires.",
  openGraph: {
    title: "SmartCard | Carte de reductions",
    description:
      "Precommandez votre carte SmartCard et profitez de reductions chez des commerces partenaires.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartCard | Carte de reductions",
    description:
      "Precommandez votre carte SmartCard et profitez de reductions chez des commerces partenaires.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const themeScript = `(function(){try{var k='theme';var p=localStorage.getItem(k)||'system';var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(p==='system'?(d?'dark':'light'):p);document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.documentElement.dataset.themePref=p;}catch(e){}})();`;

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={manrope.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

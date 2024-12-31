import '@/app/ui/global.css'
import { inter } from './ui/fonts';
import { Metadata } from 'next';
import SessionProvider from './core/ui/components/SessionProvider';
export const metadata: Metadata = {
  title: {
    template: '%s |Dashboard',
    default: '',
  },
    description: 'The official Next.js Course Dashboard, built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link href="/css/app.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className}antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

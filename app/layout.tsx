import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { SimulationProvider } from '@/components/simulation-context';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Zomato KPT Optimizer',
  description: 'Prototype for optimizing Kitchen Prep Time prediction',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        <SimulationProvider>
          {children}
        </SimulationProvider>
      </body>
    </html>
  );
}

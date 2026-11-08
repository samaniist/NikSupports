import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Nik Supports — At your pace.', description: 'Thoughtful behaviour support, coordination and psychosocial recovery. We take the time to understand you.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }

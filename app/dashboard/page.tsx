
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};
 
export default async function Page() {
  // Remove `const latestInvoices = await fetchLatestInvoices()`
 
  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}
// inkconnect-next-v2/pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>InkConnect Dashboard</h1>
      <nav>
        <Link href="/users">Users</Link> | 
        <Link href="/portfolio">Portfolios</Link> | 
        <Link href="/request/1">Sample Request</Link>
      </nav>
    </div>
  );
}

import { useRouter } from 'next/router';

export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <h1>Artist Profile</h1>
      <p>Showing details for artist ID: {id}</p>
    </main>
  );
}

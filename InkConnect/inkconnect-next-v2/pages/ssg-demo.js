export async function getStaticProps() {
  // Example static data
  const artists = [
    { id: 1, name: 'Ayla Nomura' },
    { id: 2, name: 'Altolane Jackson III' }
  ];

  return {
    props: {
      artists
    }
  };
}

export default function SSGDemo({ artists }) {
  return (
    <main>
      <h1>Static Site Generation Demo</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/hello');
  const data = await res.json();

  return {
    props: { message: data.message }
  };
}

export default function ApiDemo({ message }) {
  return (
    <main>
      <h1>API Integration Demo</h1>
      <p>Message from API: {message}</p>
    </main>
  );
}

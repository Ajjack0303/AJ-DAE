// app/api-test/page.tsx
export default async function ApiTest() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
      cache: "no-store", // ensures SSR fetch
    });

    const data = await res.text();

    return (
      <main className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          API Connection Test
        </h1>
        <pre className="w-full max-w-2xl bg-white text-gray-900 p-6 rounded-lg shadow-lg overflow-x-auto">
          {data}
        </pre>
      </main>
    );
  } catch (err) {
    return (
      <main className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          API Connection Test
        </h1>
        <p className="text-red-500 text-lg">Connection failed</p>
      </main>
    );
  }
}

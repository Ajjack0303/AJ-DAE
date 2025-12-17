// inkconnect-next-v2/pages/request/[id].js
import React from 'react';
import Link from 'next/link';

// Example component to display a single request
const RequestPage = ({ request }) => {
  if (!request) {
    return <div>Request not found.</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Request Details</h1>
      <p><strong>Title:</strong> {request.title}</p>
      <p><strong>Description:</strong> {request.description}</p>
      <p><strong>Artist:</strong> {request.artist_name}</p>
      <p><strong>Client:</strong> {request.client_name}</p>
      <p><strong>Status:</strong> {request.status}</p>
      <Link href="/"><a style={{ color: 'blue' }}>← Back to Home</a></Link>
    </div>
  );
};

// For SSG: define static paths (replace with real data fetch if available)
export async function getStaticPaths() {
  // Example: fetch request IDs from your backend API
  const res = await fetch('http://localhost:5000/api/requests'); // adjust URL
  const requests = await res.json();

  const paths = requests.map(req => ({
    params: { id: req.request_id.toString() },
  }));

  return { paths, fallback: true };
}

// Fetch request data for a given ID
export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:5000/api/requests/${params.id}`);
  const request = await res.json();

  return { props: { request } };
}

export default RequestPage;

// inkconnect-frontend/app/bookings/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  id: number;
  clientName: string;
  date: string;
  status?: string;
  artist?: {
    id: number;
    name: string;
  };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data: Booking[] = await res.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message || "Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="p-8">Loading bookings...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Bookings</h1>
      <ul className="text-gray-700 text-lg">
        {bookings.map((b) => (
          <li key={b.id} className="mb-3">
            <Link
              href={`/bookings/${b.id}`}
              className="text-blue-600 hover:underline"
            >
              {b.clientName} — {new Date(b.date).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

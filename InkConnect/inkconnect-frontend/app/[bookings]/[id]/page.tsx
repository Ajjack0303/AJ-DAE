// inkconnect-frontend/app/bookings/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`);
        if (!res.ok) throw new Error("Booking not found");
        const data: Booking = await res.json();
        setBooking(data);
      } catch (err: any) {
        setError(err.message || "Error fetching booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <p className="p-8">Loading booking...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!booking) return <p className="p-8 text-gray-600">Booking not found</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{booking.clientName}</h1>
      <p className="text-gray-700 text-lg mb-2">Date: {new Date(booking.date).toLocaleDateString()}</p>
      {booking.status && <p className="text-gray-700 text-lg mb-2">Status: {booking.status}</p>}
      {booking.artist && <p className="text-gray-700 text-lg">Artist: {booking.artist.name}</p>}
    </main>
  );
}

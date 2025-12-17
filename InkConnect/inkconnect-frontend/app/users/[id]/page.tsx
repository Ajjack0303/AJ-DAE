// inkconnect-frontend/app/users/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const data: User = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="p-8">Loading user...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!user) return <p className="p-8 text-gray-600">User not found</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{user.name}</h1>
      <p className="text-gray-700 text-lg mb-2">Email: {user.email}</p>
      <p className="text-gray-700 text-lg">Role: {user.role}</p>
    </main>
  );
}

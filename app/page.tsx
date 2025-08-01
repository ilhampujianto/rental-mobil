// app/page.tsx
"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">
        Halo, {session?.user?.name || "Guest"}!
      </h1>

      {session ? (
        <>
          <Link
            href="/dashboard"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Register
          </Link>
        </>
      )}
    </main>
  )
}

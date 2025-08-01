"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const [totalCars, setTotalCars] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      const [carsRes, customersRes] = await Promise.all([
        axios.get("/api/cars/count"),
        axios.get("/api/customers/count"),
      ])
      setTotalCars(carsRes.data.count)
      setTotalCustomers(customersRes.data.count)
    }

    fetchCounts()
  }, [])

  return (
    <div className="p-6">
      {/* Header dan Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-gray-600">Total Mobil</p>
          <p className="text-3xl font-bold">{totalCars}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-gray-600">Total Pelanggan</p>
          <p className="text-3xl font-bold">{totalCustomers}</p>
        </div>
      </div>

      {/* Navigasi */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/cars/create"
          className="bg-blue-500 text-white px-4 py-3 rounded text-center hover:bg-blue-600"
        >
          Tambah Mobil
        </Link>
        <Link
          href="/cars"
          className="bg-blue-700 text-white px-4 py-3 rounded text-center hover:bg-blue-800"
        >
          Daftar Mobil
        </Link>
        <Link
          href="/customers/create"
          className="bg-green-500 text-white px-4 py-3 rounded text-center hover:bg-green-600"
        >
          Tambah Pelanggan
        </Link>
        <Link
          href="/customers"
          className="bg-green-700 text-white px-4 py-3 rounded text-center hover:bg-green-800"
        >
          Daftar Pelanggan
        </Link>
      </div>
    </div>
  )
}

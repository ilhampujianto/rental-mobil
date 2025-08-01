"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<Customer[]>([])

  const fetchCustomers = async () => {
    const res = await axios.get("/api/customers")
    setCustomers(res.data)
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/customers/${id}`)
    fetchCustomers()
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/dashboard"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          ← Kembali ke Dashboard
        </Link>
        <Link
          href="/customers/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah Pelanggan
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center">Daftar Pelanggan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((cust) => (
          <div key={cust.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{cust.name}</h2>
            <p className="text-gray-700 text-sm">📧 {cust.email}</p>
            <p className="text-gray-700 text-sm">📞 {cust.phone}</p>
            <p className="text-gray-600 text-sm mb-2">📍 {cust.address}</p>
            <div className="flex gap-2 mt-2">
              <Link
                href={`/customers/edit/${cust.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(cust.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

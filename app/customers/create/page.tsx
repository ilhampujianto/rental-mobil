"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

export default function CreateCustomerPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post("/api/customers", form)
    router.push("/customers")
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Link
          href="/dashboard"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center">Tambah Pelanggan Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Pelanggan"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Nomor Telepon"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Alamat"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
        >
          Simpan Pelanggan
        </button>
      </form>
    </div>
  )
}

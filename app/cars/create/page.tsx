"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

export default function CreateCarPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: 0,
    imageUrl: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post("/api/cars", {
      ...form,
      price: Number(form.price),
    })
    router.push("/cars")
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

      <h1 className="text-3xl font-bold text-center">Tambah Mobil Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Mobil"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Merek Mobil"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Harga Sewa"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="URL Gambar"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="w-full border px-4 py-2 rounded shadow-sm"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
        >
          Simpan Mobil
        </button>
      </form>
    </div>
  )
}

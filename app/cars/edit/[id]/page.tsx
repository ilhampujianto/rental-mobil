// app/cars/edit/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import axios from "axios"
import type { Car } from "@/types/car"

export default function EditCarPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: 0,
    imageUrl: "",
    description: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/cars")
      const car = (res.data as Car[]).find((c) => c.id === id)
      if (car) setForm(car)
    }

    if (status === "authenticated") {
      fetchData()
    }
  }, [id, status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.put(`/api/cars/${id}`, {
      ...form,
      price: Number(form.price),
    })
    router.push("/cars")
  }

  if (status === "loading") {
    return <div className="p-6">Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Mobil</h1>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" className="mb-2 block w-full" />
      <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="mb-2 block w-full" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Harga" className="mb-2 block w-full" />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="URL Gambar" className="mb-2 block w-full" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" className="mb-4 block w-full" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  )
}

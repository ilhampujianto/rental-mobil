"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import axios from "axios"

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export default function EditCustomerPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [form, setForm] = useState<Customer>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  // Redirect jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await axios.get("/api/customers")
      const customer = res.data.find((c: Customer) => c.id === id)
      if (customer) setForm(customer)
    }

    if (status === "authenticated") {
      fetchCustomer()
    }
  }, [id, status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.put(`/api/customers/${id}`, form)
    router.push("/customers")
  }

  if (status === "loading") return <p>Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Pelanggan</h1>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nama"
        className="mb-2 block w-full border px-3 py-2 rounded"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-2 block w-full border px-3 py-2 rounded"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Nomor Telepon"
        className="mb-2 block w-full border px-3 py-2 rounded"
      />
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Alamat"
        className="mb-4 block w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  )
}

"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

type Car = {
  id: string
  name: string
  brand: string
  price: number
  imageUrl: string
  description: string
}

export default function CarListPage() {
  const [cars, setCars] = useState<Car[]>([])

  const fetchCars = async () => {
    const res = await axios.get("/api/cars")
    setCars(res.data)
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/cars/${id}`)
    fetchCars()
  }

  useEffect(() => {
    fetchCars()
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
          href="/cars/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah Mobil
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center">Daftar Mobil</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="border rounded-lg p-4 shadow">
            <img
              src={car.imageUrl}
              alt={car.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{car.name}</h2>
            <p className="text-gray-600">{car.brand}</p>
            <p className="text-green-600 font-bold mb-2">Rp {car.price.toLocaleString()}</p>
            <p className="text-sm text-gray-700 mb-3">{car.description}</p>
            <div className="flex gap-2">
              <Link
                href={`/cars/edit/${car.id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(car.id)}
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

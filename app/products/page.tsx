"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { fetchProducts } from "@/lib/products";
import { IProduct } from "../interfaces/IProduct";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { Spinner } from "@/components/Spinner";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const total = 45;
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProducts(offset, limit)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
  }, [offset, limit]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Lista de Productos</h1>

        {loading && <Spinner />}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && products.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}
        <div className="flex justify-start p-2">
          <Pagination
            total={total}
            limit={limit}
            offset={offset}
            onPageChange={setOffset}
            currentLength={products.length}
          />
        </div>

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <div key={product.id} className="card h-full shadow-lg rounded">
                <div className="relative">
                  <Link href={`/products/${product.id}`} className="block">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t"
                      width={800}
                      height={500}
                      priority={true}
                      unoptimized
                    />
                  </Link>
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                    onClick={() => alert(`Eliminar ${product.title}`)}
                  >
                    <FaTrash color="red" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h5 className="font-semibold text-lg mb-1">
                    {product.title}
                  </h5>
                  <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    {product.category?.name && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        {product.category.name}
                      </span>
                    )}
                    <span className="text-lg font-bold">{product.price} $</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

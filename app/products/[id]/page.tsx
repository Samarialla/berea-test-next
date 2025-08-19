// app/products/[id]/page.tsx
import { fetchProductById, fetchRelatedProducts } from "@/lib/products";
import ProductCarousel from "@/components/ProductCarousel";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params; 
  if (!id) return <p>Producto no encontrado</p>;

  const [product, relatedProducts] = await Promise.all([
    fetchProductById(+id),
    fetchRelatedProducts(+id),
  ]);

  if (!product)
    return <p className="text-center mt-10">Producto no encontrado</p>;

  return (
    <div className="container mx-auto mt-4 mb-3 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 flex justify-center">
          <ProductCarousel images={product.images} />
        </div>

        <div className="md:w-1/2 flex flex-col gap-3">
          <Link
            href="/products"
            className="flex items-center gap-1 px-3 py-1 border border-gray-400 rounded hover:bg-gray-100 w-max"
          >
           <IoIosArrowBack/>
            Volver
          </Link>

          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p>{product.description}</p>
          <h4 className="mt-2 font-semibold">{product.price}$</h4>
          <div>
            {product.category?.name && (
              <span className="inline-block bg-green-500 text-white rounded-full px-3 py-1 mt-3">
                {product.category.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <h5 className="mt-10 text-lg font-semibold">
            Productos Relacionados
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-3">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="flex flex-col text-dark no-underline"
              >
                <div className="card h-full shadow rounded overflow-hidden">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover"
                    priority={true}
                  />
                  <div className="p-2">
                    <span className="font-medium text-sm">{p.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

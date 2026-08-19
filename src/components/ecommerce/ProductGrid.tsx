import { PackageSearch } from "lucide-react"

import { ProductCard } from "@/components/ecommerce/ProductCard"
import type { Product } from "@/data/products"

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
        <PackageSearch className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">No products found</p>
        <p className="text-xs text-muted-foreground">
          Try clearing a filter or searching for something else.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

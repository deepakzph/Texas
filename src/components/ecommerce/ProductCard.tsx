import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Product } from "@/data/products"

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm leading-tight font-medium text-card-foreground">
            {product.name}
          </h3>
          <Badge variant="muted" className="shrink-0">
            {product.category}
          </Badge>
        </div>

        <p className="line-clamp-2 text-xs text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-current text-chart-4" />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  )
}

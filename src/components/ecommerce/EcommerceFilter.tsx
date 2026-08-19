import { Search, X } from "lucide-react"
import { useMemo, useState } from "react"

import { CategoryFilter } from "@/components/ecommerce/CategoryFilter"
import { ProductGrid } from "@/components/ecommerce/ProductGrid"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"

export function EcommerceFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [query, setQuery] = useState("")

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const product of products) {
      counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
    }
    return Array.from(counts, ([name, count]) => ({ name, count })).sort(
      (a, b) => a.name.localeCompare(b.name)
    )
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategories])

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category]
    )
  }

  function clearFilters() {
    setSelectedCategories([])
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">Shop Products</h1>
        <p className="text-sm text-muted-foreground">
          Browse and filter {products.length} products by category.
        </p>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products..."
          className="h-9 w-full rounded-lg border border-input bg-background pr-9 pl-9 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <aside className="w-full shrink-0 md:w-52">
          <CategoryFilter
            categories={categories}
            selected={selectedCategories}
            onToggle={toggleCategory}
            onClear={clearFilters}
          />
        </aside>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} of {products.length} products
            </p>
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    <X className="size-3" />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-1.5 text-xs text-muted-foreground"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </section>
  )
}

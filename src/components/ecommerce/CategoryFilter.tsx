import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  categories: { name: string; count: number }[]
  selected: string[]
  onToggle: (category: string) => void
  onClear: () => void
}

export function CategoryFilter({
  categories,
  selected,
  onToggle,
  onClear,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Categories</h2>
        {selected.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-1.5 text-xs text-muted-foreground"
            onClick={onClear}
          >
            <X />
            Clear
          </Button>
        )}
      </div>

      <ul className="flex flex-col gap-1">
        {categories.map((category) => {
          const isActive = selected.includes(category.name)
          return (
            <li key={category.name}>
              <button
                type="button"
                onClick={() => onToggle(category.name)}
                aria-pressed={isActive}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg border border-transparent px-2.5 py-1.5 text-left text-sm transition-colors",
                  isActive
                    ? "border-border bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-3.5 rounded-[4px] border",
                      isActive
                        ? "border-primary bg-primary"
                        : "border-input bg-transparent"
                    )}
                    aria-hidden="true"
                  />
                  {category.name}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {category.count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

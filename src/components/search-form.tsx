import { useState, type FormEvent } from "react"
import { Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  onSearch: (username: string) => void
  loading: boolean
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [value, setValue] = useState("")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search GitHub username…"
          aria-label="GitHub username"
          autoFocus
          className="h-10 pl-8"
        />
      </div>
      <Button type="submit" size="lg" disabled={loading || !value.trim()}>
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
        Search
      </Button>
    </form>
  )
}

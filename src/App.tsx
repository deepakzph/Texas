import { UserX } from "lucide-react"
import { SearchForm } from "@/components/search-form"
import { UserProfileCard } from "@/components/user-profile-card"
import { UserProfileSkeleton } from "@/components/user-profile-skeleton"
import { useGitHubUser } from "@/hooks/use-github-user"

function App() {
  const { user, loading, error, search } = useGitHubUser()

  return (
    <div className="flex min-h-svh flex-col items-center px-4 py-16">
      <div className="flex w-full max-w-xl flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg className="size-5" role="presentation" aria-hidden="true">
            <use href="/icons.svg#github-icon" />
          </svg>
          <span className="text-sm font-medium">GitHub User Search</span>
        </div>
        <h1 className="font-heading text-2xl font-semibold text-balance sm:text-3xl">
          Find a GitHub profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Look up any GitHub username to see their public profile.
        </p>
      </div>

      <div className="mt-8 w-full max-w-xl">
        <SearchForm onSearch={search} loading={loading} />
      </div>

      <div className="mt-8 flex w-full max-w-xl flex-1 justify-center">
        {loading && <UserProfileSkeleton />}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 pt-10 text-center text-muted-foreground">
            <UserX className="size-8" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && user && <UserProfileCard user={user} />}
      </div>
    </div>
  )
}

export default App

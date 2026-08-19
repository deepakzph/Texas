import { useCallback, useRef, useState } from "react"
import { fetchGitHubUser, type GitHubUser } from "@/lib/github"

interface UseGitHubUserState {
  user: GitHubUser | null
  loading: boolean
  error: string | null
}

export function useGitHubUser() {
  const [state, setState] = useState<UseGitHubUserState>({
    user: null,
    loading: false,
    error: null,
  })
  const abortRef = useRef<AbortController | null>(null)

  const search = useCallback(async (username: string) => {
    const trimmed = username.trim()
    if (!trimmed) {
      setState({ user: null, loading: false, error: null })
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const user = await fetchGitHubUser(trimmed, controller.signal)
      setState({ user, loading: false, error: null })
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      const message =
        err instanceof Error ? err.message : "Something went wrong."
      setState({ user: null, loading: false, error: message })
    }
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState({ user: null, loading: false, error: null })
  }, [])

  return { ...state, search, reset }
}

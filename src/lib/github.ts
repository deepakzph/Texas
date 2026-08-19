export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
}

export class GitHubUserNotFoundError extends Error {
  constructor(username: string) {
    super(`No GitHub user found for "${username}"`)
    this.name = "GitHubUserNotFoundError"
  }
}

export class GitHubRateLimitError extends Error {
  constructor() {
    super("GitHub API rate limit exceeded. Please try again in a few minutes.")
    this.name = "GitHubRateLimitError"
  }
}

export async function fetchGitHubUser(
  username: string,
  signal?: AbortSignal
): Promise<GitHubUser> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    {
      signal,
      headers: { Accept: "application/vnd.github+json" },
    }
  )

  if (res.status === 404) {
    throw new GitHubUserNotFoundError(username)
  }

  if (
    res.status === 403 &&
    res.headers.get("x-ratelimit-remaining") === "0"
  ) {
    throw new GitHubRateLimitError()
  }

  if (!res.ok) {
    throw new Error(`GitHub API request failed (${res.status})`)
  }

  return (await res.json()) as GitHubUser
}

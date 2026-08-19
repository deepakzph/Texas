import {
  Building2,
  CalendarDays,
  Link as LinkIcon,
  MapPin,
  Users,
  BookMarked,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { GitHubUser } from "@/lib/github"

interface UserProfileCardProps {
  user: GitHubUser
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
})

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})

export function UserProfileCard({ user }: UserProfileCardProps) {
  const stats = [
    { label: "Repos", value: user.public_repos, icon: BookMarked },
    { label: "Followers", value: user.followers, icon: Users },
    { label: "Following", value: user.following, icon: Users },
  ]

  const blogHref = user.blog
    ? user.blog.startsWith("http")
      ? user.blog
      : `https://${user.blog}`
    : null

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex-row items-start gap-4 px-6">
        <Avatar size="lg" className="size-20">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-heading text-lg font-semibold">
              {user.name ?? user.login}
            </h2>
            <Badge variant="secondary" render={<a href={user.html_url} target="_blank" rel="noreferrer" />}>
              @{user.login}
              <ExternalLink data-icon="inline-end" />
            </Badge>
          </div>
          {user.bio && (
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-6">
        <div className="grid grid-cols-3 gap-2">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-lg bg-muted/60 py-3"
            >
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon className="size-3.5" />
                <span className="text-xs">{label}</span>
              </div>
              <span className="font-heading text-base font-semibold">
                {numberFormatter.format(value)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-2 text-sm">
          {user.company && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="size-4 shrink-0" />
              <span className="truncate">{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span className="truncate">{user.location}</span>
            </div>
          )}
          {blogHref && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <LinkIcon className="size-4 shrink-0" />
              <a
                href={blogHref}
                target="_blank"
                rel="noreferrer"
                className="truncate text-primary hover:underline"
              >
                {user.blog}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="size-4 shrink-0" />
            <span>Joined {dateFormatter.format(new Date(user.created_at))}</span>
          </div>
        </div>

        <Button
          render={<a href={user.html_url} target="_blank" rel="noreferrer" />}
          nativeButton={false}
          variant="outline"
          className="w-full"
        >
          View on GitHub
          <ExternalLink data-icon="inline-end" />
        </Button>
      </CardContent>
    </Card>
  )
}

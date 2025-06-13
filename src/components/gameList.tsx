'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'


export function GameList() {
  const trpc = useTRPC()
  const gamesRes = useQuery(trpc.db.getGameNames.queryOptions())
  const gameNames = gamesRes.data ?? undefined

  if (!gameNames) {
    return (
      <div>
        loading
      </div>
    )
  } else {
    return (
      <div className="flex flex-col w-32 h-9/20 ml-4 border rounded overflow-y-auto items-center">
        {gameNames.map((game) => {
          return (
            <Button key={game} variant="link" className="w-24 gap-1 m-1 border rounded hover:bg-accent" asChild>
              <Link href={`/play/${game}`}>{game}</Link>
            </Button >
          )
        })}
      </div>
    )
  }
}
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getUserChats } from '@/lib/db-access'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'


export async function ChatList() {

  const reqHeaders = await headers()
  const session = await auth.api.getSession({
    headers: reqHeaders
  })
  const userChats = session?.user.id ? await getUserChats(session.user.id) : []

  return (
    <div className="flex flex-col w-32 max-h-2/5 ml-4 border rounded overflow-y-auto items-center">
      {userChats.sort((a, b) => {
        return (b.createdAt.getTime() - a.createdAt.getTime())
      }).map((chat) => {
        return (
          <Button key={chat.id} variant="link" className="w-24 gap-1 m-1 border rounded hover:bg-accent" asChild>
            <Link href={`/chat/${chat.id}`}>{chat.gameName + chat.id.slice(0, 2)}</Link>
          </Button >
        )
      })}
    </div>
  )
}

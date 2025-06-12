export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createChat } from '@/lib/chat-store'
import Link from 'next/link'

import { gameConfigs } from '@/lib/games'

export default async function Page(props: { params: Promise<{ gameName: string }> }) {
  const { gameName } = await props.params
  const game = gameConfigs.find((config) => config.name === gameName)

  if (game === undefined) {
    return (
      <div>
        Error, invalid game
      </div>
    )
  } else {
    // If the user is not logged in, there's no additional information to attach to the makeGame request
    const id = await createChat(game)
    redirect(`/chat/${id}`)
  }

}
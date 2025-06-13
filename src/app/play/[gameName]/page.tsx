import { redirect } from 'next/navigation'
import { createChat } from '@/lib/db-access'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/auth'

export default async function Page(props: { params: Promise<{ gameName: string }> }) {
  const { gameName } = await props.params
  // Figure out if we're in an auth session right now or not.
  // In response to this, set the "chatParameters"
  //   - gameName (from prop)
  //   - userId (null OR from session)
  // pass the newGameParam
  const reqHeaders = await headers()

  const session = await auth.api.getSession({
    headers: reqHeaders
  })

  const id = session ? await createChat(gameName, session.user.id) : await createChat(gameName)
  redirect(`/chat/${id}`)
}
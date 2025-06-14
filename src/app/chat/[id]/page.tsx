import { getChatMessages } from '@/lib/db-access'
import Chat from '@/components/chat'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params // get the chat ID from the url
  const [messages] = await getChatMessages(id)
  return <Chat id={id} initialMessages={messages} />
}
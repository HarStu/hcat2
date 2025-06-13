import { loadMessages } from '@/lib/chat-store'
import Chat from '@/components/chat'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params // get the chat ID from the url
  const [messages, _] = await loadMessages(id)
  return <Chat id={id} initialMessages={messages} />
}
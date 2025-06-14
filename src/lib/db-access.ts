import { generateId } from 'ai'
import type { Message } from 'ai'
import { db } from '@/db/drizzle'
import { eq, asc } from 'drizzle-orm'

import { chats, messages, games } from '@/db/schema'
import type { Game } from '@/lib/games'
import type { ToolName } from '@/lib/model-tools'

type DbMessage = typeof messages.$inferSelect
type Chat = typeof chats.$inferSelect

// helper function
function mapDbMsgToMessage(dbMessage: DbMessage): Message {
  return {
    id: dbMessage.id,
    parts: dbMessage.parts as Message['parts'],
    role: dbMessage.role as Message['role'],
    content: dbMessage.content,
    createdAt: dbMessage.createdAt ? new Date(dbMessage.createdAt) : undefined,
    toolInvocations: dbMessage.toolInvocations as Message['toolInvocations'] ?? undefined
  }
}

export async function getGameNameDescriptionFromChatId(id: string): Promise<{ name: string, desc: string }> {
  const chat = await getChat(id)
  const game = await getGame(chat.gameName!)
  console.log(`game name is: ${game.name}, description is: ${game.description}`)
  return { name: game.name, desc: game.description }
}

export async function getUserChats(owner: string): Promise<Chat[]> {
  const chatsRes = await db.select().from(chats).where(eq(chats.owner, owner))
  return chatsRes
}

export async function getGame(gameName: string): Promise<Game> {
  const gameRes = await db.select().from(games).where(eq(games.name, gameName))
  if (!gameRes || gameRes.length !== 1) {
    throw new Error(`Could not fetch game ${gameName}`)
  } else {
    return gameRes[0] as Game
  }
}

export async function getGameNames(): Promise<string[]> {
  const gamesRes = await db.select({ name: games.name }).from(games)
  if (!gamesRes) {
    throw new Error(`Could not fetch game names`)
  } else {
    return gamesRes.map((g) => g.name)
  }
}

export async function createChat(gameName: string, owner?: string): Promise<string> {
  const newId = generateId()

  const game = await getGame(gameName)

  await db.insert(chats).values({
    id: newId,
    systemPrompt: game.systemPrompt,
    gameName: game.name,
    aiName: game.aiName,
    owner: (owner ?? null),
    requiredTools: game.requiredTools
  })

  return newId
}

export async function getChat(id: string): Promise<Chat> {
  const chatRes = await db.select().from(chats).where(eq(chats.id, id))

  if (!chatRes || chatRes.length !== 1) {
    throw new Error(`Could not fetch chat ${id}`)
  } else {
    return chatRes[0] as Chat
  }
}

export async function getChatMessages(id: string): Promise<[Message[], string, ToolName[]]> {
  const msgRes = await db.select().from(messages).where(eq(messages.chatId, id)).orderBy(asc(messages.createdAt))
  const retrievedMessages: Message[] = msgRes.map(msg => mapDbMsgToMessage(msg))

  const chatRes = await db.select({ prompt: chats.systemPrompt, tools: chats.requiredTools }).from(chats).where(eq(chats.id, id))
  if (chatRes.length !== 1) {
    throw new Error(`Could not properly fetch system prompt for chat ${id}`)
  } else {
    const { prompt, tools } = chatRes[0]!
    const toolsArr = tools as ToolName[]
    return [retrievedMessages, prompt!, toolsArr]
  }
}

export async function appendMessages({ id, newMessages }: { id: string, newMessages: Message[] }): Promise<void> {

  for (const msg of newMessages) {
    const cloneMsg = structuredClone(msg) as Message & { chatId: string }
    const insertMsg: typeof messages.$inferInsert = {
      ...cloneMsg,
      chatId: id,
      createdAt: cloneMsg.createdAt ? new Date(cloneMsg.createdAt) : new Date()
    }

    await db
      .insert(messages)
      .values(insertMsg)
      .onConflictDoUpdate({
        target: messages.id,
        set: {
          content: insertMsg.content,
          parts: insertMsg.parts,
          toolInvocations: insertMsg.toolInvocations,
          createdAt: insertMsg.createdAt
        }
      })
  }
}

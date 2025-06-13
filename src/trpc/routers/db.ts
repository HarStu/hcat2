import { createTRPCRouter, baseProcedure } from '@/trpc/init'
import { getGame, getGameNames, createChat, getChat, getChatMessages, appendMessages } from '@/lib/chat-store'
import type { Message } from 'ai'
import { z } from 'zod'

export const dbRouter = createTRPCRouter({
  ping: baseProcedure.query(async () => {
    return { ok: true }
  }),
  getGameNames: baseProcedure.query(async () => {
    const gameNames = await getGameNames()
    return gameNames
  }),
  getGame: baseProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .query(async (opts) => {
      const game = await getGame(opts.input.name)
      return game
    }),
  createChat: baseProcedure
    .input(
      z.object({
        gameName: z.string(),
        owner: z.string().optional()
      })
    )
    .mutation(async (opts) => {
      const chatId = await createChat(opts.input.gameName, opts.input.owner)
      return chatId
    }),
  getChat: baseProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async (opts) => {
      const chat = await getChat(opts.input.id)
      return chat
    }),
  getChatMessages: baseProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async (opts) => {
      const [messages, prompt, toolsArr] = await getChatMessages(opts.input.id)
      return [messages, prompt, toolsArr]
    }),
  appendMessages: baseProcedure
    .input(
      z.object({
        id: z.string(),
        newMessages: z.array(z.custom<Message>())
      })
    )
    .mutation(async (opts) => {
      const res = await appendMessages({ id: opts.input.id, newMessages: opts.input.newMessages })
      return { ok: true }
    })
})
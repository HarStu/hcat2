import { createTRPCRouter, baseProcedure } from '@/trpc/init'
import { getGame, getGameNames } from '@/lib/chat-store'

export const dbRouter = createTRPCRouter({
  ping: baseProcedure.query(async ({ ctx }) => {
    return { ok: true }
  }),
  getGameNames: baseProcedure.query(async () => {
    const gameNames = await getGameNames()
    return gameNames
  }),
})
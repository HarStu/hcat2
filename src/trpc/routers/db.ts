import { createTRPCRouter, baseProcedure } from '@/trpc/init'

export const dbRouter = createTRPCRouter({
  ping: baseProcedure.query(async ({ ctx }) => {
    return { ok: true }
  })
})